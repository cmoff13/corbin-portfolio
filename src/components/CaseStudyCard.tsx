'use client'

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

const BG = '#F0F2F5'
const LINE = '1px solid rgba(0,0,0,0.07)'
const CARD_HEIGHT = 220

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
  onClick: () => void
}

export default function CaseStudyCard({
  slug,
  title,
  subtitle,
  tags,
  thumbnail,
  accentColor,
  segmentLabel,
  segmentIcon,
  metric,
  isMobile,
  cardIndex = 0,
  cardNumber,
  onClick,
}: CaseStudyCardProps) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), cardIndex * 60)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
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
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        width: '100%',
        height: isMobile ? 'auto' : CARD_HEIGHT,
        borderRadius: 14,
        overflow: 'hidden',
        border: LINE,
        background: BG,
        cursor: 'none',
        opacity: visible ? 1 : 0,
        transform: visible
          ? hovered ? 'translateY(-3px)' : 'translateY(0)'
          : 'translateY(20px)',
        transition: visible
          ? 'transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease, opacity 0.1s ease'
          : `opacity 0.5s ease ${cardIndex * 60}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${cardIndex * 60}ms`,
        boxShadow: hovered ? '0 8px 32px rgba(0,0,0,0.08)' : 'none',
      }}
    >
      {/* Image */}
      <div style={{
        width: isMobile ? '100%' : '38%',
        height: isMobile ? 200 : '100%',
        flexShrink: 0,
        position: 'relative',
        overflow: 'hidden',
        borderRight: isMobile ? 'none' : LINE,
        borderBottom: isMobile ? LINE : 'none',
        background: BG,
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
            background: accentColor + '0f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: 36,
              fontWeight: 300,
              color: 'rgba(0,0,0,0.10)',
              letterSpacing: '-0.05em',
              textAlign: 'center',
              padding: '0 16px',
              lineHeight: 1.2,
            }}>
              {metric || title}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: isMobile ? '20px' : '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 0,
      }}>
        {cardNumber && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 9,
            fontWeight: 700,
            color: '#ccc',
            letterSpacing: '0.12em',
            marginBottom: 6,
          }}>
            {cardNumber}
          </div>
        )}
        {(segmentIcon || segmentLabel) && (
          <div style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: accentColor,
            marginBottom: 8,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}>
            {segmentIcon}
            {segmentLabel}
          </div>
        )}
        <div style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: isMobile ? 17 : 20,
          fontWeight: 400,
          color: '#1a1a1a',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
          marginBottom: 6,
        }}>
          {title}
        </div>
        <div style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          color: '#767676',
          lineHeight: 1.6,
          marginBottom: 16,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {subtitle}
        </div>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 6,
          marginBottom: 16,
        }}>
          {tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11,
              color: '#999',
              background: 'rgba(0,0,0,0.05)',
              borderRadius: 999,
              padding: '4px 12px',
            }}>
              {tag}
            </span>
          ))}
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
          View case study
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
