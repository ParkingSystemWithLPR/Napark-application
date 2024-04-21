import { ImageProps } from "@/types";

export const convertImagesToImageProps = (images: string[]): ImageProps[] => {
  const httpRegex = new RegExp("^https?://");
  return images.map((image) => {
    const filename = httpRegex.test(image) ? image.split("/")[-1] : image;
    return { content: image, filename };
  });
};

export const convertImagePropsToImages = (
  imageProps: ImageProps[]
): string[] => {
  const httpRegex = new RegExp("^https?://");
  return imageProps.map((image) => {
    const base64Prefix = httpRegex.test(image.content) ? "" : "data:image/jpeg;base64,";
    return base64Prefix + image.content;
  });
};
