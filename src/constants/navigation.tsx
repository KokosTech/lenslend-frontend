import {
  IconBrandSafari,
  IconCategory,
  IconLogin,
  IconLogout,
  IconMap,
  IconMessage2,
  IconSearch,
  IconSettings,
  IconSquareRoundedPlus,
  IconStar,
  IconUserCircle,
} from '@tabler/icons-react';

export const noNavigation = [
  '/_error',
  '/en/auth/login',
  '/en/auth/signup',
  '/en/auth/forgot-password',
  '/en/auth/reset-password',
  '/en/auth/verify-email',
  '/en/auth/verify-phone',
  '/bg/auth/login',
  '/bg/auth/signup',
  '/bg/auth/forgot-password',
  '/bg/auth/reset-password',
  '/bg/auth/verify-email',
  '/bg/auth/verify-phone',
];

export const navigation = [
  {
    text: 'Divider 0',
    href: null,
  },
  {
    icon: <IconBrandSafari className='h-6 w-6' />,
    text: 'discover_feed',
    href: '/',
  },
  {
    icon: <IconCategory className='h-6 w-6' />,
    text: 'categories',
    href: '/categories',
  },
  {
    icon: <IconSearch className='h-6 w-6' />,
    text: 'search',
    href: '/search',
  },
  {
    icon: <IconMap className='h-6 w-6' />,
    text: 'places',
    href: '/places',
  },
  {
    text: 'Divider 1',
    href: null,
  },
  {
    icon: <IconMessage2 className='h-6 w-6' />,
    text: 'chats',
    href: '/chats',
  },
  {
    icon: <IconStar className='h-6 w-6' />,
    text: 'favorites',
    href: '/favorites',
  },
  {
    text: 'Divider 2',
    href: null,
  },
  {
    icon: <IconLogin className='h-6 w-6' />,
    text: 'login',
    href: '/auth/login',
    auth: false,
  },
  {
    icon: <IconSquareRoundedPlus className='h-6 w-6' />,
    text: 'signup',
    href: '/auth/signup',
    auth: false,
  },
  {
    icon: <IconUserCircle className='h-6 w-6' />,
    text: 'my_profile',
    href: '/user/profile',
    auth: true,
  },
  {
    icon: <IconSettings className='h-6 w-6' />,
    text: 'settings',
    href: '/settings',
    auth: true,
  },
  {
    icon: <IconLogout className='h-6 w-6' />,
    text: 'logout',
    href: '/auth/logout',
    auth: true,
  },
  {
    text: 'Divider 3',
    href: null,
    auth: true,
  },
  {
    icon: <IconSquareRoundedPlus className='h-6 w-6' />,
    text: 'create',
    href: '/create',
    auth: true,
  },
];
