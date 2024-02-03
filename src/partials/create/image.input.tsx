import { IconPhoto, IconPlus, IconTrash } from '@tabler/icons-react';
import { ChangeEvent, Dispatch, DragEvent, SetStateAction } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

type ImageInputProps = {
  file: File;
  order: number;
};

type ImageInputType = {
  images: ImageInputProps[];
  setImages: Dispatch<SetStateAction<ImageInputProps[]>>;
  errors: string[];
};

const ImageInput = ({ images, setImages }: ImageInputType) => {
  const [parent] = useAutoAnimate({
    duration: 300,
    easing: 'ease-in-out',
  });

  const addImages = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);
    const newFiles = files.filter(
      (file) =>
        !images.find(
          (image) =>
            image.file.name === file.name &&
            image.file.lastModified === file.lastModified,
        ),
    );
    const newImages = newFiles.map((file, index) => ({
      file,
      order: images.length + index + 1,
    }));
    setImages([...images, ...newImages]);
  };

  const handleDragStart = (
    e: DragEvent<HTMLDivElement>,
    draggedImage: ImageInputProps,
  ) => {
    e.dataTransfer.setData('text/plain', draggedImage.file.name);
  };

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    droppedImage: ImageInputProps,
  ) => {
    e.preventDefault();
    const draggedImageName = e.dataTransfer.getData('text/plain');
    setImages((prevState) => {
      const draggedImage = prevState.find(
        (image) => image.file.name === draggedImageName,
      );
      const droppedImageIndex = prevState.findIndex(
        (image) => image.file.name === droppedImage.file.name,
      );
      const newImages = prevState.filter(
        (image) => image.file.name !== draggedImageName,
      );

      if (draggedImage) {
        newImages.splice(droppedImageIndex, 0, draggedImage);
      }
      return newImages;
    });
  };

  return (
    <div
      className='grid grid-cols-3 gap-4 lg:grid-cols-5'
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={(e) => {
        e.preventDefault();
      }}
      ref={parent}
    >
      <div className='relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary'>
        <IconPlus size={24} />
        <input
          type='file'
          accept='image/jpeg, image/png, image/jpg, image/webp'
          multiple
          className='absolute inset-0 cursor-pointer opacity-0'
          name='images'
          onChange={addImages}
        />
      </div>
      {images && (
        <>
          {Array.from(images).map((image) => (
            <div
              key={image.file.name}
              className='relative flex aspect-square w-full cursor-move items-center justify-center rounded-lg border border-stroke bg-primary transition-colors hover:border-stroke-secondary hover:bg-stroke'
              draggable={true}
              onDragStart={(e) => handleDragStart(e, image)}
              onDrop={(e) => handleDrop(e, image)}
            >
              <img
                draggable={false}
                src={URL.createObjectURL(image.file)}
                alt={image.file.name}
                className='absolute inset-0 h-full w-full rounded-lg object-cover'
              />
              <button
                onClick={() => {
                  setImages((prevState) => {
                    // delete image and fix order
                    const newImages = prevState
                      .filter(
                        (img) =>
                          img.file.name !== image.file.name &&
                          image.file.lastModified !== img.file.lastModified,
                      )
                      .map((img, index) => ({
                        ...img,
                        order: index,
                      }));
                    return newImages;
                  });
                }}
                type={'button'}
                className='absolute bottom-1 right-1 rounded-full border border-stroke bg-primary p-1 transition-colors hover:border-stroke-secondary'
              >
                <IconTrash
                  size={16}
                  className='text-text-secondary transition-colors hover:text-blue'
                />
              </button>
            </div>
          ))}
          {/*  fill the rest if no images */}
          {images.length < 4 &&
            Array.from(Array(4 - images.length).keys()).map((index) => (
              <div
                key={index}
                className='relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary'
              >
                <IconPhoto size={24} />
                <input
                  type='file'
                  accept='image/jpeg, image/png, image/jpg, image/webp'
                  multiple
                  className='absolute inset-0 cursor-pointer opacity-0'
                  name='images'
                  onChange={addImages}
                />
              </div>
            ))}
          {images.length !== 5 && (
            <div className='relative flex aspect-square w-full cursor-pointer items-center justify-center rounded-lg border border-stroke transition-colors hover:border-stroke-secondary lg:hidden'>
              <IconPhoto size={24} />
              <input
                type='file'
                accept='image/jpeg, image/png, image/jpg, image/webp'
                multiple
                className='absolute inset-0 cursor-pointer opacity-0'
                name='images'
                onChange={addImages}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default ImageInput;
