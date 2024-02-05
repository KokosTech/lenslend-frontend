import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from '@tabler/icons-react';

const StarInput = ({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className='flex items-center justify-center gap-2'>
      {stars.map((star, index) => {
        const filled = value >= star;
        const halfFilled = value + 0.5 === star;

        return (
          <span
            key={index}
            onClick={() => onChange(star)}
            style={{ cursor: 'pointer' }}
          >
            {filled ? (
              <IconStarFilled />
            ) : halfFilled ? (
              <IconStarHalfFilled />
            ) : (
              <IconStar />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default StarInput;
