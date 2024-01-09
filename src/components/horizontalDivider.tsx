const HorizontalDivider = ({ size = 1 }: { size?: number }) => (
  <div
    className='w-full shrink-0 bg-stroke opacity-50'
    style={{
      height: `${size}px`,
    }}
  />
);
export default HorizontalDivider;
