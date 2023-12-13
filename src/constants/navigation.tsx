import {
  IconBrandSafari,
  IconCategory,
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
  '/login',
  '/signup',
  '/forgot-password',
];

export const navigation = [
  {
    text: 'Divider 0',
    href: null,
  },
  {
    icon: <IconBrandSafari className='w-6 h-6' />,
    text: 'discover_feed',
    href: '/',
  },
  {
    icon: <IconCategory className='w-6 h-6' />,
    text: 'categories',
    href: '/categories',
  },
  {
    icon: <IconSearch className='w-6 h-6' />,
    text: 'search',
    href: '/search',
  },
  {
    icon: <IconMap className='w-6 h-6' />,
    text: 'places',
    href: '/places',
  },
  {
    text: 'Divider 1',
    href: null,
  },
  {
    icon: <IconMessage2 className='w-6 h-6' />,
    text: 'chats',
    href: '/chats',
  },
  {
    icon: <IconStar className='w-6 h-6' />,
    text: 'favorites',
    href: '/favorites',
  },
  {
    text: 'Divider 2',
    href: null,
  },
  {
    icon: <IconUserCircle className='w-6 h-6' />,
    text: 'my_profile',
    href: '/user/123',
  },
  {
    icon: <IconSettings className='w-6 h-6' />,
    text: 'settings',
    href: '/settings',
  },
  {
    icon: <IconLogout className='w-6 h-6' />,
    text: 'logout',
    href: '/logout',
  },
  {
    text: 'Divider 3',
    href: null,
  },
  {
    icon: <IconSquareRoundedPlus className='w-6 h-6' />,
    text: 'create',
    href: '/create',
  },
];
