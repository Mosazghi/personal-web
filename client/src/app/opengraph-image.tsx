import { ImageResponse } from 'next/og';
import { personName } from '~/lib/site';
import { getHero } from '~/sanity/queries';

export const alt = `${personName} — Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const { name, titles } = await getHero();
  const subtitle =
    titles?.slice(0, 3).join('  ·  ') ||
    'Electrical Engineering Student & Software Developer';

  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        background: 'linear-gradient(135deg, #05070c 0%, #101a2e 100%)',
        color: '#f8fafc',
      }}
    >
      <div
        style={{
          fontSize: 26,
          letterSpacing: 8,
          textTransform: 'uppercase',
          color: '#7dd3fc',
        }}
      >
        Portfolio
      </div>
      <div
        style={{
          fontSize: 82,
          fontWeight: 700,
          marginTop: 24,
          lineHeight: 1.1,
        }}
      >
        {name || personName}
      </div>
      <div
        style={{
          fontSize: 36,
          marginTop: 28,
          color: '#94a3b8',
        }}
      >
        {subtitle}
      </div>
      <div
        style={{
          marginTop: 48,
          height: 6,
          width: 220,
          background: 'linear-gradient(90deg, #38bdf8, #818cf8)',
          borderRadius: 999,
        }}
      />
    </div>,
    size,
  );
}
