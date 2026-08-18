import { PortableText } from 'next-sanity';
import { customComponents } from '~/custom-components';
import { getEducations } from '~/sanity/queries';
import { SectionHeader } from './section-header';

export async function Education() {
  const education = await getEducations();

  return (
    <section id="education" className="py-32 border-t border-border px-8">
      <div className="lg:ml-80 space-y-12">
        <SectionHeader title="Education" />
        {education.map((edu) => (
          <article key={edu.title} className="group">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="md:w-48 flex-shrink-0">
                <p className="text-sm font-mono text-muted-foreground uppercase tracking-wider">
                  {edu.period}
                </p>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  {edu.title} ·{' '}
                  <span className="text-muted-foreground">{edu.company}</span>
                </h3>

                <div className="prose text-muted-foreground leading-relaxed mb-4 text-pretty max-w-[70%]">
                  <PortableText
                    value={edu.description}
                    components={customComponents}
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {edu.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium hover:bg-primary/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
