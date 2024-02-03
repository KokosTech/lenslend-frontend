type ImageInputProps = {
  file: File;
  order: number;
};

interface Image {
  file: File;
  order: number;
}

interface SignedUrlResponse {
  url: string;
  public_url: string;
  key: string;
  order?: number;
}

export type { ImageInputProps, Image, SignedUrlResponse };
