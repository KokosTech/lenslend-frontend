'use client';
import { useTheme } from '@/context/ThemeProvider';

const ChangeTheme = ({ text }: { text: string }) => {
  const { toggleTheme } = useTheme();

  return (
    <button
      className='text-white bg-indigo-600 hover:bg-indigo-500 mt-4 rounded px-4 py-2'
      onClick={toggleTheme}
    >
      {text}
    </button>
  );
};

export default ChangeTheme;
