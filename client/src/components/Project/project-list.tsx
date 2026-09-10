import { ArrowUpRightSquare } from 'lucide-react';
import { getProjects } from '~/sanity/queries';
import { SectionHeader } from '../section-header';
import { Project, type ProjectData } from './project';

const ProjectList = async () => {
  const projects = (await getProjects()) as ProjectData[];
  const visible = projects.filter((p) => !p.hide);

  return (
    <section id="projects" className="py-32 border-t border-border px-8">
      <div className="lg:ml-80">
        <SectionHeader title="Featured Projects" />
        <div className="grid gap-20">
          {visible.length === 0 && <NoProjects />}
          {visible.map((project, index) => (
            <Project {...project} index={index} key={project.name} />
          ))}
        </div>
      </div>
    </section>
  );
};

const NoProjects = () => {
  return (
    <p className="text-center">
      No projects available. Please visit my{' '}
      <a
        href="https://github.com/Mosazghi"
        className="underline hover:no-underline"
      >
        github account
        <ArrowUpRightSquare className="inline-block mb-1 mx-1" />
      </a>{' '}
      instead
    </p>
  );
};

export default ProjectList;
