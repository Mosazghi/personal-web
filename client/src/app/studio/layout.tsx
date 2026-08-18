import type { Metadata } from 'next';

// The authoring environment must never show up in search results.
export const metadata: Metadata = {
  robots: { index: false, follow: false, nocache: true },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
