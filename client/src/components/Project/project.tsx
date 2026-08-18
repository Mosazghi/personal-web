'use client';
import { ImageOff, MoveRight } from 'lucide-react';
import { PortableText } from 'next-sanity';
import Image from 'next/image';
import { useState } from 'react';
import type { TypedObject } from 'sanity';
import { customComponents } from '~/custom-components';

/** Shape of a project document as returned by Sanity. */
export interface ProjectData {
  name: string;
  description: TypedObject;
  showcaseLinkMp4: string;
  showcaseLinkGif: string;
  repositoryLink: string;
  previewLink: string;
  hide: boolean;
  techStack: string[];
}

export type ProjectProps = ProjectData & { index: number };

const isStillImage = (src: string) => /\.(png|jpe?g|webp|avif)$/i.test(src);

export const Project = ({
  name,
  index,
  description,
  showcaseLinkMp4,
  showcaseLinkGif,
  previewLink,
  techStack,
}: ProjectProps) => {
  const [mediaErr, setMediaErr] = useState(false);

  return (
    <article className="group grid lg:grid-cols-2 gap-8 items-center">
      <div className={`${index % 2 === 1 ? 'lg:order-2' : ''}`}>
        <div className="aspect-video rounded-lg overflow-hidden bg-card border border-border">
          {mediaErr ? (
            <ImageOff className="size-12 mx-auto h-full text-muted-foreground" />
          ) : isStillImage(showcaseLinkGif) || !showcaseLinkMp4 ? (
            <Image
              width={640}
              height={360}
              className="w-full h-full group-hover:scale-105 transition-transform duration-500"
              onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
              src={showcaseLinkGif}
              alt={`Screenshot of the ${name} project`}
              loading={index === 0 ? 'eager' : 'lazy'}
              onError={() => setMediaErr(true)}
            />
          ) : (
            <video
              className="hover:opacity-50 h-full w-full group-hover:scale-105 transition-transform duration-500"
              onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
              src={showcaseLinkMp4}
              poster={showcaseLinkGif || undefined}
              aria-label={`Demo of the ${name} project`}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              disablePictureInPicture
              onError={() => setMediaErr(true)}
            />
          )}
        </div>
      </div>

      <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
        <div className="flex items-center gap-2 mb-2 justify-between flex-wrap">
          <h3 className="text-2xl font-bold mb-4">{name}</h3>
        </div>

        <div className="prose text-muted-foreground leading-relaxed mb-6 text-pretty">
          <PortableText value={description} components={customComponents} />
        </div>
        <div className="flex flex-wrap gap-2 mb-6">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={previewLink}
          className="inline-flex items-center gap-2 text-sm text-primary hover:gap-3 opacity-0 group-hover:opacity-100 transition-opacity transform duration-500 ease-out"
          target="_blank"
          rel="noopener"
        >
          View Project
          <MoveRight className="size-4" />
        </a>
      </div>
    </article>
  );
};
