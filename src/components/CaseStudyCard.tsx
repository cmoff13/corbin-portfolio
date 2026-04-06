'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'

interface CaseStudyCardProps {
  slug: string
  title: string
  subtitle: string
  tags: string[]
  thumbnail?: string
  accentColor: string
  segmentLabel?: string
  segmentIcon?: ReactNode
  metric?: string
  isMobile: boolean
  cardIndex?: number
  cardNumber?: string
  ctaLabel?: string
  onClick: () => void
}

export default function CaseStudyCard({
  title, subtitle, thumbnail, accentColor,
  metric, isMobile, cardIndex = 0, ctaLabel, onClick,
}: CaseStudyCardProps) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), cardIndex * 80)
          observer.disconnect()
        }
      },
      { threshold: 0.08 }
    )
    if (cardRef.current) observer.observe(cardRef.current)
    return () => observer.disconnect()
  }, [cardIndex])

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        borderRadius: 14,
        overflow: 'hidden',
        border: LINE,
        background: BG,
        cursor: 'none',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-4px)' : 'translateY(0)'
          : 'translateY(24px)',
        transition: visible
          ? 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, opacity 0.1s ease'
          : `opacity 0.5s ease ${cardIndex * 80}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${cardIndex * 80}ms`,
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* Square image */}
      <div style={{
        width: '100%',
        paddingBottom: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: accentColor + '0f',
        borderBottom: LINE,
      }}>
        {thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={thumbnail}
            alt={title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 32,
              fontWeight: 300,
              color: 'rgba(0,0,0,0.10)',
              letterSpacing: '-0.05em',
              textAlign: 'center',
              padding: '0 16px',
            }}>
              {metric || title}
            </span>
          </div>
        )}
      </div>

      {/* Text */}
      <div style={{
        padding: isMobile ? '16px' : '20px 22px 22px',
      }}>
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: isMobile ? 16 : 18,
          fontWeight: 400,
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
          lineHeight: 1.25,
          marginBottom: 6,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: '#999',
          lineHeight: 1.6,
          marginBottom: 14,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical' as const,
          overflow: 'hidden',
        }}>
          {subtitle}
        </div>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12,
          color: accentColor,
          fontWeight: 500,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
        }}>
          {ctaLabel || 'View case study'}
          <span style={{
            display: 'inline-block',
            transform: hovered ? 'translateX(4px)' : 'translateX(0)',
            transition: 'transform 0.25s cubic-bezier(0.16,1,0.3,1)',
          }}>→</span>
        </span>
      </div>
    </div>
  )
}
