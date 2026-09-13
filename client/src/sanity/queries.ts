import 'server-only';
import { revalidateSeconds } from '~/lib/site';
import { client } from './lib/client';

function query<T>(groq: string, fallback: T, tag: string): Promise<T> {
  return client
    .fetch<T>(
      groq,
      {},
      { next: { revalidate: revalidateSeconds, tags: [tag] } },
    )
    .catch((error) => {
      console.error(`Sanity query "${tag}" failed:`, error);
      return fallback;
    })
    .then((data) => data ?? fallback);
}

export async function getHero() {
  const data = await query<{ titles?: string[]; name?: string } | null>(
    '*[_type == "heroSettings"][0]{titles, name}',
    null,
    'hero',
  );
  return { titles: data?.titles || [], name: data?.name || '' };
}

export async function getAbout() {
  const data = await query<{ content?: unknown } | null>(
    '*[_type == "about"][0]{content}',
    null,
    'about',
  );
  return data?.content ?? null;
}

export async function getExperiences() {
  const data = await query<any[]>(
    '*[_type == "experience"]|order(order asc){period,title,company,description,technologies}',
    [],
    'experience',
  );
  return data.map((d) => ({
    period: d.period,
    title: d.title,
    company: d.company,
    description: d.description,
    technologies: d.technologies || [],
  }));
}

export async function getEducations() {
  const data = await query<any[]>(
    '*[_type == "education"]|order(order asc){period,title,institution,description,technologies}',
    [],
    'education',
  );
  return data.map((d) => ({
    period: d.period,
    title: d.title,
    company: d.institution,
    description: d.description,
    technologies: d.technologies || [],
  }));
}

export async function getSkills() {
  const data = await query<{ items?: { name: string }[] } | null>(
    '*[_type == "skills"][0]{items}',
    null,
    'skills',
  );
  return (data?.items || []).map((s) => ({ name: s.name }));
}

export async function getProjects() {
  const data = await query<any[]>(
    '*[_type == "project"] | order(orderRank){name,slug,description,showcaseLinkGif,showcaseLinkMp4,repositoryLink,previewLink,techStack,startDate,hide}',
    [],
    'projects',
  );
  return data.map((p) => ({
    name: p.name,
    description: p.description,
    showcaseLinkGif: p.showcaseLinkGif || '',
    showcaseLinkMp4: p.showcaseLinkMp4 || '',
    repositoryLink: p.repositoryLink || '',
    previewLink: p.previewLink || '',
    techStack: p.techStack || [],
    startDate: p.startDate || '',
    hide: p.hide || false,
  }));
}
