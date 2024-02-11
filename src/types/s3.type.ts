type ImageInputProps = {
  file: File;
};

interface Image {
  file: File;
}

interface SignedUrlResponse {
  url: string;
  public_url: string;
  key: string;
}

export type { ImageInputProps, Image, SignedUrlResponse };
