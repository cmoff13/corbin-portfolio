'use client'

import { ABOUT_COPY } from '@/lib/segments'

export default function ContactCta({
  variant = 'compact',
  accentColor = '#1a1a1a',
  align = 'left',
}: {
  variant?: 'full' | 'compact'
  accentColor?: string
  align?: 'left' | 'center'
}) {
  return (
    <div
      style={{
        textAlign: align,
        maxWidth: variant === 'full' ? '560px' : undefined,
        marginLeft: align === 'center' ? 'auto' : undefined,
        marginRight: align === 'center' ? 'auto' : undefined,
      }}
    >
      {variant === 'full' && (
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '13px',
          color: '#767676',
          lineHeight: 1.65,
          marginBottom: '16px',
        }}>
          {ABOUT_COPY.bio}
        </p>
      )}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        color: '#4a4a4a',
        lineHeight: 1.5,
        margin: 0,
      }}>
        <span style={{ color: '#767676' }}>{ABOUT_COPY.contactCta} </span>
        <a
          href={`mailto:${ABOUT_COPY.contactEmail}`}
          style={{
            color: accentColor,
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: '1px solid rgba(0,0,0,0.12)',
          }}
        >
          {ABOUT_COPY.contactEmail}
        </a>
      </p>
    </div>
  )
}
