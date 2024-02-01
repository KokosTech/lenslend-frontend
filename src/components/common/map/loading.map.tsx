type LoadingMapProps = {
  isLoading: boolean;
};

const LoadingMap = ({ isLoading }: LoadingMapProps) => (
  <>
    {isLoading && (
      <div className='absolute inset-0 z-50 flex h-full w-full items-center justify-center'>
        <div className='rounded-lg border-2 border-stroke bg-primary px-4 py-2'>
          Map Loading...
        </div>
      </div>
    )}
  </>
);

export default LoadingMap;
