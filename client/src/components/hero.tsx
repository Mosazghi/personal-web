import { personName } from '~/lib/site';
import { getHero } from '~/sanity/queries';
import { HeroAnimation } from './hero-animation';

export async function Hero() {
  const { name, titles } = await getHero();

  return <HeroAnimation name={name || personName} titles={titles} />;
}
