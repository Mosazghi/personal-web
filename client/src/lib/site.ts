export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://portfolio.mostes.no'
).replace(/\/$/, '');

export const siteName = 'Mosazghi Tesfazghi Portfolio';

export const personName = 'Mosazghi Yohannes Tesfazghi';

export const siteDescription =
  'Portfolio of Mosazghi Yohannes Tesfazghi, an Electrical Engineering student at NTNU specializing in software development, web applications, and electronics. Explore my projects, skills, and experience.';

/** How long (seconds) rendered pages stay cached before Next re-fetches Sanity. */
export const revalidateSeconds = 3600;
