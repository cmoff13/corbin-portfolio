import { useEffect, useRef, useState } from 'react'
import type React from 'react'

export function useReveal(delay = 0) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect() } },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  const style: React.CSSProperties = {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.6s ease ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
  }
  return { ref, style, visible }
}

export function useWordReveal(text: string, started: boolean, baseDelay = 0) {
  return text.split(' ').map((word, i) => ({
    word,
    wrapStyle: {
      display: 'inline-block',
      overflow: 'hidden',
      verticalAlign: 'bottom',
      marginRight: '0.22em',
    } as React.CSSProperties,
    innerStyle: {
      display: 'inline-block',
      transform: started ? 'translateY(0)' : 'translateY(110%)',
      opacity: started ? 1 : 0,
      transition: `transform 0.75s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * 65}ms, opacity 0.5s ease ${baseDelay + i * 65}ms`,
    } as React.CSSProperties,
  }))
}
