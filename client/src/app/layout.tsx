import type { Metadata, Viewport } from 'next';
import { personName, siteDescription, siteName, siteUrl } from '~/lib/site';
import './globals.css';

const title = `${personName} | Electrical Engineering Student & Software Developer`;

export const metadata: Metadata = {
  title: {
    default: title,
    template: '%s | Mosazghi Tesfazghi',
  },
  description: siteDescription,
  applicationName: siteName,
  keywords: [
    'Mosazghi Yohannes Tesfazghi',
    'Electrical Engineering',
    'NTNU',
    'Software Developer',
    'Web Development',
    'React',
    'TypeScript',
    'Next.js',
    'Full Stack Developer',
    'Electronics',
    'Portfolio',
    'Norway',
    'Trondheim',
  ],
  authors: [{ name: personName, url: siteUrl }],
  creator: personName,
  publisher: personName,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title,
    description: siteDescription,
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: '/profile-icon.png',
    shortcut: '/profile-icon.png',
    apple: '/profile-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  colorScheme: 'dark',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
