import { getSkills } from '~/sanity/queries';
import { SectionHeader } from './section-header';

export async function Skills() {
  const skills = (await getSkills()).map((s) => s.name);

  return (
    <section id="skills" className="py-32 border-t border-border px-8">
      <div className="lg:ml-80 space-y-12">
        <SectionHeader title="Skills" />
        <ul className="flex flex-wrap gap-3">
          {skills.map((skill) => (
            <li
              key={skill}
              className="bg-primary/10 text-primary px-5 py-2.5 rounded-full text-sm font-medium shadow-sm hover:bg-primary/20 transition-colors transform hover:scale-110 duration-200"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
