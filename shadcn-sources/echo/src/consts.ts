export const SITE_TITLE = 'Echo - Modern Astro Template';
export const SITE_DESCRIPTION =
  'A modern, fully featured Astro template built with Shadcn/UI, TailwindCSS and TypeScript, perfect for your next web application.';

export const SITE_METADATA = {
  title: {
    default: 'Echo - Modern Astro Template',
    template: '%s | Echo',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Astro',
    'React',
    'JavaScript',
    'TypeScript',
    'TailwindCSS',
    'Template',
    'Shadcn/UI',
    'Web Development',
  ],
  authors: [{ name: 'Echo - Shadcnblocks.com' }],
  creator: 'Echo - Shadcnblocks.com',
  publisher: 'Echo',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Echo',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Echo - Modern Astro Template',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@shadcnblocks',
  },
};
