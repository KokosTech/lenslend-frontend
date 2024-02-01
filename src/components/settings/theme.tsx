'use client';
import { useTheme } from '@/context/ThemeProvider';
import { IconMoon, IconSettingsStar, IconSun } from '@tabler/icons-react';

const themes = ['light', 'dark', 'system'];
const icons = [
  <IconSun key='light' />,
  <IconMoon key='dark' />,
  <IconSettingsStar key='system' />,
];

const ChangeTheme = ({ text }: { text: string }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className='flex w-full flex-wrap items-center justify-between rounded-xl border border-stroke bg-primary px-4 py-2'>
      <p className='m-2 break-keep font-semibold text-text'>{text}</p>
      <div className='flex flex-row items-center justify-center'>
        {themes.map((th, i) => (
          <ThemeComponent
            key={th}
            theme={th}
            selected={th === theme || (th === 'system' && theme === null)}
            changeTheme={toggleTheme}
            i={i}
          />
        ))}
      </div>
    </div>
  );
};

const ThemeComponent = ({
  theme,
  selected,
  changeTheme,
  i,
}: {
  theme: string;
  selected: boolean;
  changeTheme: (theme: string) => void;
  i: number;
}) => (
  <>
    <button
      className={`${
        selected
          ? 'border !border-stroke-secondary bg-stroke'
          : 'bg-secondary hover:border-stroke-secondary hover:bg-stroke'
      } m-2 rounded-md border border-stroke px-4 py-2 text-text transition-all duration-300 ease-in-out`}
      onClick={() => changeTheme(theme)}
    >
      {icons[i]}
    </button>
    {i !== themes.length - 1 && <div className='h-6 w-[2px] bg-stroke' />}
  </>
);

export default ChangeTheme;
