import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    darkMode: ['class', '[data-mode="dark"]'],
    fontFamily: {
      inter: '"Inter", sans-serif',
    },
    // darkMode: 'class',
    container: {
      center: true,
      padding: '1rem',
    },
    colors: {
      transparent: 'transparent',
      current: 'current',
      background: 'var(--background)',
      primary: 'rgba(var(--primary),<alpha-value>)',
      blue: '#06A7F5',
      green: '#28EDA3',
      error: {
        primary: '#d92017',
        secondary: '#b20500',
      },
      stroke: 'var(--stroke)',
      'stroke-secondary': 'var(--stroke-secondary)',
      text: 'var(--text)',
      'text-secondary': 'var(--text-secondary)',
      'text-important': 'var(--text-important)',
    },
    extend: {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      backgroundImage: (theme) => ({
        gradient: 'linear-gradient(99deg, #28EDA3 31.45%, #06A7F5 68.87%)',
      }),
      animation: {
        'spin-slow': 'spin 1.5s linear infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      boxShadow: {
        // TODO: add box shadows according to the design in figma
      },
    },
  },

  plugins: [],
};
export default config;
