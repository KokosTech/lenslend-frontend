import {
  CreatePlaceErrors,
  CreatePlaceForm,
} from '@/types/forms/create-place-form';
import { ImageInputProps, SignedUrlResponse } from '@/types/s3.type';
import { API_URL } from '@/configs/api';
import { getAuth } from '@/actions/auth';
import { createPlaceSchema } from '@/schemas/create-place.schema';
import { createImagesSchema } from '@/schemas/create-image.schema';
import { CreateProductErrors } from '@/types/forms/create-listing.form';
import { formatErrors } from '@/utils/formatErrors';
import { extractTranslatedErrors } from '@/utils/extractErrors';
import { getSignedUrls, uploadImages } from '@/utils/create/s3';
import { Place } from '@/types/data/place.type';

export async function createPlace(
  data: CreatePlaceForm,
  signedUrls: SignedUrlResponse[],
  token: string,
) {
  const body = {
    icon: data.icon,
    name: data.name,
    description: data.description,
    status: data.status,
    categoryUuid: data.category.uuid,
    tags: data.tags,
    services: data.services.map((service) => service.uuid),
    lat: data.location.lat,
    lng: data.location.lng,
    images: signedUrls
      .sort((a, b) => b.order - a.order)
      .map((url) => url.public_url),
  };

  return fetch(`${API_URL}/place`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
}

export const handleCreatePlace = async (
  data: CreatePlaceForm,
  images: ImageInputProps[],
  handleError: (newErrors: Partial<CreatePlaceErrors>) => void,
  t: (key: string) => string,
) => {
  const token = await getAuth();
  if (!token) {
    handleError({ global: ['You must be logged in to create a listing'] });
    return;
  }

  const result = createPlaceSchema.safeParse(data);
  const imagesResult = createImagesSchema.safeParse(images);
  let newErrors: Partial<CreateProductErrors> = {};

  if (!result.success) {
    const formatted = formatErrors(result);
    newErrors = {
      ...newErrors,
      ...extractTranslatedErrors(formatted, t),
    };
  }

  if (!imagesResult.success) {
    const formatted = formatErrors(imagesResult);
    const extracted = extractTranslatedErrors(formatted, t);

    if (
      extracted['root'] &&
      Array.isArray(extracted['root']) &&
      extracted['root'].length
    ) {
      newErrors = {
        ...newErrors,
        images: extracted['root'],
      };
    }
  }

  if (Object.keys(newErrors).length) {
    handleError(newErrors);
    return;
  }

  if (!images.length) {
    handleError({ images: ['At least one image is required'] });
    return;
  }

  if (images.length > 6) {
    handleError({ images: ['Maximum of 6 images allowed'] });
    return;
  }

  if (!data.location) {
    handleError({ global: ['Location is required'] });
    return;
  }

  const signedUrls = await getSignedUrls(images, data.status, token);
  const uploadResults = await uploadImages(signedUrls, images);
  const finalErrors = uploadResults
    .filter((res) => !res)
    .map(() => 'Error uploading image');

  if (finalErrors.length) {
    handleError({ images: finalErrors });
    return;
  }

  const response = await createPlace(data, signedUrls, token);
  if (!response.ok) {
    const listing = (await response.json()) as {
      message: string;
    };
    handleError({ global: [listing.message] });
    return;
  }

  return (await response.json()) as Place;
};
