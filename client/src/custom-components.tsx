import Image from 'next/image';
import type { PortableTextComponents } from 'next-sanity';
import { urlFor } from './sanity/lib/image';
import { Link } from 'lucide-react';

export const customComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlFor(value).width(1200).fit('max').auto('format').url()}
        alt={value.alt || ''}
        width={1200}
        height={675}
        sizes="(max-width: 768px) 100vw, 800px"
        className="my-6 rounded-lg w-full h-auto"
      />
    ),
    code: ({ value }) => (
      <pre className="bg-gray-900 text-white p-4 rounded">
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold my-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold my-3">{children}</h2>
    ),

    h3: ({ children }) => (
      <h3 className="text-xl font-semibold my-3">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-4">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="text-zinc-400 font-bold">{children}</strong>
    ),
    link: ({ children, value }) => (
      <a
        href={value.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-200 underline inline-flex items-center gap-1"
      >
        {children}
        <Link className="text-blue-200" size={16} />
      </a>
    ),
  },
};
