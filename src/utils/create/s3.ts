import { getSignedUrl, uploadS3 } from '@/utils/uploadS3';
import { Image, SignedUrlResponse } from '@/types/s3.type';

export async function getSignedUrls(
  imagesInput: Image[],
  status: string,
  token: string,
): Promise<SignedUrlResponse[]> {
  const acl = status === 'PRIVATE' ? 'private' : 'public-read';
  const promises = imagesInput.map(async (image) => {
    try {
      return {
        ...(await getSignedUrl(image.file, acl, token)),
      };
    } catch (error) {
      throw new Error('Failed to get signed URL');
    }
  });
  return Promise.all(promises);
}

export async function uploadImages(
  signedUrls: SignedUrlResponse[],
  imagesInput: Image[],
): Promise<boolean[]> {
  const promises = signedUrls.map(async (imageUrl, i) => {
    const imageToUpload = imagesInput[i];
    if (!imageToUpload) {
      throw new Error('Image not found');
    }
    try {
      return await uploadS3(imageToUpload.file, imageUrl.url);
    } catch (error) {
      throw new Error('Failed to upload image');
    }
  });
  return Promise.all(promises);
}
