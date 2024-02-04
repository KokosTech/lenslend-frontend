import { useEffect, useRef, useState } from 'react';
import { IconIcons } from '@tabler/icons-react';
import EmojiPicker from '@/wrappers/emojiPicker';
import { useTheme } from '@/context/ThemeProvider';
import { Categories, Theme } from 'emoji-picker-react';

const SelectIcon = () => {
  const [show, setShow] = useState(false);
  const [icon, setIcon] = useState('');

  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement | null>(null);

  //    <EmojiPicker />

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    console.log('click');
    setShow(!show);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShow(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [show]);

  return (
    <>
      <div
        ref={ref}
        onClick={handleClick}
        className='relative flex aspect-square h-[58px] w-[58px] shrink-0 cursor-pointer items-center justify-center rounded-lg border border-stroke text-2xl hover:border-stroke-secondary'
      >
        {icon === '' ? (
          <IconIcons size={12} className='h-8 w-8 text-text' />
        ) : (
          icon
        )}
        <div
          className='!absolute !left-0 !top-16 z-50'
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log('click safe area');
          }}
        >
          <EmojiPicker
            open={show}
            skinTonesDisabled={true}
            emojiVersion={'15.0'}
            theme={
              theme === 'dark'
                ? Theme.DARK
                : theme === 'light'
                  ? Theme.LIGHT
                  : Theme.AUTO
            }
            categories={[
              {
                category: Categories.SUGGESTED,
                name: 'Suggested',
              },
              {
                category: Categories.FOOD_DRINK,
                name: 'Food & Drink',
              },
              {
                category: Categories.TRAVEL_PLACES,
                name: 'Travel & Places',
              },
              {
                category: Categories.ACTIVITIES,
                name: 'Activities',
              },
              {
                category: Categories.OBJECTS,
                name: 'Objects',
              },
              {
                category: Categories.SYMBOLS,
                name: 'Symbols',
              },
              {
                category: Categories.ANIMALS_NATURE,
                name: 'Animals & Nature',
              },
              {
                category: Categories.FLAGS,
                name: 'Flags',
              },
            ]}
            onEmojiClick={(emoji) => {
              setIcon(emoji.emoji);
              setShow(false);
            }}
          />
        </div>
      </div>
    </>
  );
};

export default SelectIcon;
