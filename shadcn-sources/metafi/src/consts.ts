export const SITE_TITLE = "Metafi - Modern Astro Template";
export const SITE_DESCRIPTION =
  "A modern, fully featured Astro template built with Shadcn/UI, TailwindCSS and TypeScript, perfect for your next web application.";

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: "%s | Metafi",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Astro",
    "React",
    "JavaScript",
    "TypeScript",
    "TailwindCSS",
    "Template",
    "Shadcn/UI",
    "Web Development",
  ],
  authors: [{ name: "Metafi Team" }],
  creator: "Metafi Team",
  publisher: "Metafi",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon/favicon.ico", sizes: "48x48" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
    shortcut: [{ url: "/favicon/favicon.ico" }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: "Metafi",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Metafi - Modern Astro Template",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og-image.jpg"],
    creator: "@shadcnblocks",
  },
};
