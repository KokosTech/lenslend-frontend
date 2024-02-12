export const NOT_LOGGED_IN_PAGES = ['/login', '/signup', '/forgot-password'];

export const LOGGED_IN_PAGES = [
  '/user/profile',
  '/settings',
  '/favorites',
  '/create',
];

export const getPath = (url: string) => {
  const { pathname } = new URL(url);
  return pathname.replace(/^\/(bg|en)/, '');
};
