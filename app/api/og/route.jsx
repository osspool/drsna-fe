import { ImageResponse } from 'next/og';

// Brand colors converted from oklch to hex
const colors = {
  // Light mode
  primary: '#cda55c',        // Gold - oklch(0.7011 0.1084 90.94)
  primaryLight: '#e8d5b0',   // Light gold accent
  foreground: '#1a1f3c',     // Royal blue - oklch(0.1884 0.0815 286.82)
  background: '#fafaf8',     // Cream - oklch(0.989 0.005 85.8)
  muted: '#f5f5f3',          // Muted background
  mutedForeground: '#6b7280', // Muted text

  // Dark mode
  darkBackground: '#0d1117',  // Dark blue bg
  darkCard: '#161b22',        // Dark card
  darkForeground: '#f0f0ee',  // Light text on dark
};

// Lucide icon SVG paths - commonly used icons
const icons = {
  sparkles: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
      <path d="M5 3v4" />
      <path d="M19 17v4" />
      <path d="M3 5h4" />
      <path d="M17 19h4" />
    </svg>
  ),
  heart: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  ),
  activity: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  shield: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  ),
  stethoscope: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
      <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
      <circle cx="20" cy="10" r="2" />
    </svg>
  ),
  zap: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />
    </svg>
  ),
  award: (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
};

// Get icon by name
function getIcon(name) {
  return icons[name] || icons.sparkles;
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  // Extract parameters
  const title = searchParams.get('title') || 'Dr. SNA Clinic';
  const subtitle = searchParams.get('subtitle') || 'Premium Medical Treatments in London';
  const type = searchParams.get('type') || 'default'; // default, treatment, category, about
  const icon = searchParams.get('icon') || 'sparkles';
  const badge = searchParams.get('badge') || '';
  const price = searchParams.get('price') || '';
  const stats = searchParams.get('stats') || ''; // Format: "15+ Years|10K+ Patients|5.0 Rating"

  // Parse stats if provided
  const statsArray = stats ? stats.split('|').map(s => {
    const [value, label] = s.split(':');
    return { value, label };
  }) : [];

  // Treatment type - detailed card layout
  if (type === 'treatment') {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.background,
            padding: '60px',
          }}
        >
          {/* Header with logo area */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '40px' }}>
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                color: colors.foreground,
              }}
            >
              {getIcon(icon)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '20px', fontWeight: 700, color: colors.foreground }}>
                Dr. SNA Clinic
              </span>
              <span style={{ fontSize: '14px', color: colors.mutedForeground }}>
                Marylebone, London
              </span>
            </div>
            {badge && (
              <div
                style={{
                  marginLeft: 'auto',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  backgroundColor: colors.primary,
                  color: colors.foreground,
                  fontSize: '14px',
                  fontWeight: 600,
                }}
              >
                {badge}
              </div>
            )}
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            <h1
              style={{
                fontSize: '64px',
                fontWeight: 800,
                color: colors.foreground,
                lineHeight: 1.1,
                marginBottom: '16px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: colors.mutedForeground,
                lineHeight: 1.4,
                maxWidth: '800px',
              }}
            >
              {subtitle}
            </p>

            {price && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: '32px',
                  padding: '16px 24px',
                  backgroundColor: colors.muted,
                  borderRadius: '12px',
                  width: 'fit-content',
                }}
              >
                <span style={{ fontSize: '18px', color: colors.mutedForeground, marginRight: '8px' }}>
                  From
                </span>
                <span style={{ fontSize: '32px', fontWeight: 700, color: colors.primary }}>
                  {price}
                </span>
              </div>
            )}
          </div>

          {/* Footer with accent bar */}
          <div
            style={{
              height: '6px',
              background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight}, ${colors.primary})`,
              borderRadius: '3px',
              marginTop: '40px',
            }}
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Category type - grid style
  if (type === 'category') {
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: colors.darkBackground,
            padding: '60px',
          }}
        >
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '48px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '10px',
                backgroundColor: colors.primary,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '16px',
                color: colors.darkBackground,
              }}
            >
              {getIcon(icon)}
            </div>
            <span style={{ fontSize: '24px', fontWeight: 600, color: colors.darkForeground }}>
              Dr. SNA Clinic
            </span>
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
            {badge && (
              <span
                style={{
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.primary,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  marginBottom: '16px',
                }}
              >
                {badge}
              </span>
            )}
            <h1
              style={{
                fontSize: '72px',
                fontWeight: 800,
                color: colors.darkForeground,
                lineHeight: 1.1,
                marginBottom: '24px',
              }}
            >
              {title}
            </h1>
            <p
              style={{
                fontSize: '24px',
                color: colors.mutedForeground,
                lineHeight: 1.5,
                maxWidth: '800px',
              }}
            >
              {subtitle}
            </p>
          </div>

          {/* Stats row */}
          {statsArray.length > 0 && (
            <div style={{ display: 'flex', gap: '32px', marginTop: '48px' }}>
              {statsArray.map((stat, i) => (
                <div key={i} style={{ display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '36px', fontWeight: 700, color: colors.primary }}>
                    {stat.value}
                  </span>
                  <span style={{ fontSize: '14px', color: colors.mutedForeground }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }

  // Default/Home type - elegant centered
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.muted} 100%)`,
          padding: '60px',
        }}
      >
        {/* Logo/Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryLight})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '32px',
            color: colors.foreground,
          }}
        >
          {getIcon(icon)}
        </div>

        {/* Badge */}
        {badge && (
          <span
            style={{
              fontSize: '14px',
              fontWeight: 600,
              color: colors.primary,
              textTransform: 'uppercase',
              letterSpacing: '3px',
              marginBottom: '24px',
            }}
          >
            {badge}
          </span>
        )}

        {/* Title */}
        <h1
          style={{
            fontSize: '64px',
            fontWeight: 800,
            color: colors.foreground,
            textAlign: 'center',
            lineHeight: 1.2,
            marginBottom: '16px',
            maxWidth: '900px',
          }}
        >
          {title}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '24px',
            color: colors.mutedForeground,
            textAlign: 'center',
            lineHeight: 1.5,
            maxWidth: '700px',
          }}
        >
          {subtitle}
        </p>

        {/* Stats */}
        {statsArray.length > 0 && (
          <div style={{ display: 'flex', gap: '48px', marginTop: '48px' }}>
            {statsArray.map((stat, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <span style={{ fontSize: '32px', fontWeight: 700, color: colors.primary }}>
                  {stat.value}
                </span>
                <span style={{ fontSize: '14px', color: colors.mutedForeground }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Bottom accent */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '8px',
            background: `linear-gradient(90deg, ${colors.primary}, ${colors.primaryLight}, ${colors.primary})`,
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
