import { contactLinks } from '~/data';
import { personName, siteDescription, siteName, siteUrl } from '~/lib/site';
import Home from '~/views/home';
import { getHero, getProjects, getSkills } from '~/sanity/queries';

// Statically rendered at build time and refreshed hourly in the background, so
// crawlers and social scrapers always get a complete, pre-rendered document.
export const revalidate = 3600;

export default async function Page() {
  const [hero, skills, projects] = await Promise.all([
    getHero(),
    getSkills(),
    getProjects(),
  ]);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: hero.name || personName,
        url: siteUrl,
        image: `${siteUrl}/profile-icon.png`,
        jobTitle: hero.titles?.length
          ? hero.titles
          : 'Electrical Engineering Student & Software Developer',
        description: siteDescription,
        knowsAbout: skills.map((s) => s.name),
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Norwegian University of Science and Technology (NTNU)',
        },
        sameAs: contactLinks
          .filter((l) => l.url.startsWith('http'))
          .map((l) => l.url),
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: siteName,
        description: siteDescription,
        inLanguage: 'en',
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${siteUrl}/#profilepage`,
        url: siteUrl,
        name: siteName,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#person` },
        hasPart: projects
          .filter((p) => !p.hide)
          .map((p) => ({
            '@type': 'CreativeWork',
            name: p.name,
            url: p.previewLink || p.repositoryLink || undefined,
            author: { '@id': `${siteUrl}/#person` },
          })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: required for JSON-LD
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, '\u003c'),
        }}
      />
      <Home />
    </>
  );
}
