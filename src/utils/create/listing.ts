import {
  CreateListingForm,
  CreateProductErrors,
} from '@/types/forms/create-listing.form';
import { ImageInputProps, SignedUrlResponse } from '@/types/s3.type';
import { API_URL } from '@/configs/api';
import { getAuth } from '@/actions/auth';
import { createListingSchema } from '@/schemas/create-listing.schema';
import { createImagesSchema } from '@/schemas/create-image.schema';
import { formatErrors } from '@/utils/formatErrors';
import { extractTranslatedErrors } from '@/utils/extractErrors';
import { getSignedUrls, uploadImages } from '@/utils/create/s3';
import { FullListingResponse } from '@/types/data/listing.type';

export async function createListing(
  data: CreateListingForm,
  signedUrls: SignedUrlResponse[],
  token: string,
) {
  const body = {
    title: data.name,
    description: data.description,
    type: 'PRODUCT',
    price: data.rental ? null : data.price,
    rental: data.rental ? data.price : null,
    negotiable: data.negotiable,
    state: data.state,
    status: data.status,
    categoryId: data.category.uuid,
    tags: data.tags,
    lat: data.location?.lat,
    lng: data.location?.lng,
    images: signedUrls.map((url) => url.public_url),
  };

  return fetch(`${API_URL}/listing`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: token,
    },
    body: JSON.stringify(body),
  });
}

export const handleCreateListing = async (
  data: CreateListingForm,
  images: ImageInputProps[],
  handleError: (newErrors: Partial<CreateProductErrors>) => void,
  t: (key: string) => string,
) => {
  const token = await getAuth('client');
  if (!token) {
    handleError({ global: ['You must be logged in to create a listing'] });
    return;
  }

  const result = createListingSchema.safeParse(data);
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

  const createListingResponse = await createListing(data, signedUrls, token);
  if (!createListingResponse.ok) {
    const listing = (await createListingResponse.json()) as {
      message: string;
    };
    console.log('NONONO', listing);
    handleError({ global: [listing.message] });
    return;
  }

  return (await createListingResponse.json()) as FullListingResponse;
};
