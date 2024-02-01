/* eslint-disable indent */
'use client';

import React, { createContext, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark' | 'system';

const ThemeContext = createContext<{
  theme: Theme | undefined;
  changeTheme: (theme: Theme) => void;
}>({
  theme: 'system',
  changeTheme: (theme: Theme) => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme | undefined>(undefined);

  const changeTheme = (theme: Theme) => {
    const root = window.document.documentElement;

    switch (theme) {
      case 'light':
        root.classList.remove('dark');
        setTheme('light');
        localStorage.setItem('theme', 'light');
        break;
      case 'dark':
        setTheme('dark');
        root.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        break;
      case 'system':
        setTheme('system');
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        localStorage.setItem('theme', 'system');
        break;
      default:
        break;
    }
  };

  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs as Theme;
      }
    }

    return 'system';
  };

  useEffect(() => {
    setTheme(getInitialTheme());
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;

    switch (theme) {
      case 'light':
        root.classList.remove('dark');
        break;
      case 'dark':
        root.classList.add('dark');
        break;
      case 'system':
        if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
          root.classList.add('dark');
        } else {
          root.classList.remove('dark');
        }
        break;
      default:
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        changeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

export const useTheme = () => {
  const { theme, changeTheme } = React.useContext(ThemeContext);

  return {
    theme,
    changeTheme,
  };
};
