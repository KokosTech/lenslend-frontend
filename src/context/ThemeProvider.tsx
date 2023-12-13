/* eslint-disable indent */
'use client';

import React, { createContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

const ThemeContext = createContext<{
  theme: Theme | undefined;
  toggleTheme: () => void;
}>({
  theme: 'light',
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    (localStorage.theme as Theme) ||
      ((window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light') as Theme),
  );

  const toggleTheme = () => {
    const root = window.document.documentElement;

    if (theme === 'light') {
      setTheme('dark');
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      return;
    }

    root.classList.remove('dark');
    setTheme('light');
    localStorage.setItem('theme', 'light');
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('dark');

    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    // remove style hidden on body
    // eslint-disable-next-line prefer-destructuring
    const body = document.getElementsByTagName('body')[0];
    // remove class hidden on body
    body.classList.remove('hidden');
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export const useTheme = () => {
  const { toggleTheme } = React.useContext(ThemeContext);

  return {
    toggleTheme,
  };
};
