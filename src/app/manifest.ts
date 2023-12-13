import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LensLend: A Peer-to-Peer Camera Rental Marketplace',
    short_name: 'LensLend',
    description:
      'LensLend is a peer-to-peer camera rental marketplace that allows photographers ' +
      'to rent out their gear to other photographers and videographers.',
    start_url: '/',
    display: 'standalone',
    orientation: 'any',
    background_color: '#232429',
    theme_color: '#232429',
    icons: [
      {
        src: '/assets/icons/icon-any-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-any-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/assets/icons/icon-maskable-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/assets/icons/icon-maskable-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    screenshots: [
      {
        src: '/assets/screenshots/screenshot.png',
        sizes: '2560x1368',
        type: 'image/png',
      },
    ],
    categories: ['photography', 'lifestyle', 'shopping'],
    prefer_related_applications: false,
  };
}
