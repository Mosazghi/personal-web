import { PortableText } from 'next-sanity';
import type { TypedObject } from 'sanity';
import { customComponents } from '~/custom-components';
import { getAbout } from '~/sanity/queries';
import { SectionHeader } from './section-header';

export async function About() {
  const aboutInfo = (await getAbout()) as TypedObject | TypedObject[] | null;

  return (
    <section id="about" className="py-32 border-t border-border px-8">
      <div className="lg:ml-80">
        <SectionHeader title="About Me" />
        {aboutInfo && (
          <PortableText value={aboutInfo} components={customComponents} />
        )}
      </div>
    </section>
  );
}
