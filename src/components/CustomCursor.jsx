import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './CustomCursor.css'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const isHoveringRef = useRef(false)

  useEffect(() => {
    // Only activate on non-touch devices
    if (window.matchMedia('(hover: none)').matches) return

    document.body.classList.add('has-custom-cursor')

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Initial off-screen position
    gsap.set([dot, ring], { x: -100, y: -100 })

    // Track mouse
    const onMove = (e) => {
      // Dot follows instantly
      gsap.to(dot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
      })
      // Ring follows with slight lag
      gsap.to(ring, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.15,
        ease: 'power2.out',
      })
    }

    // Scale up on interactive elements (event delegation)
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, label')
      if (target && !isHoveringRef.current) {
        isHoveringRef.current = true
        gsap.to(dot, { scale: 2.5, duration: 0.2, ease: 'power2.out' })
        gsap.to(ring, { scale: 1.6, opacity: 0.3, duration: 0.2, ease: 'power2.out' })
      }
    }

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"], input, textarea, select, label')
      if (target && isHoveringRef.current) {
        isHoveringRef.current = false
        gsap.to(dot, { scale: 1, duration: 0.25, ease: 'power2.out' })
        gsap.to(ring, { scale: 1, opacity: 0.6, duration: 0.25, ease: 'power2.out' })
      }
    }

    // Hide when leaving window
    const onLeave = () => gsap.to([dot, ring], { opacity: 0, duration: 0.2 })
    const onEnter = () => gsap.to([dot, ring], { opacity: 1, duration: 0.2 })

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      document.body.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [])

  return (
    <>
      {/* Outer ring — trails with lag */}
      <div className="cursor-ring" ref={ringRef} aria-hidden="true" />
      {/* Inner dot — instant follow */}
      <div className="cursor-dot" ref={dotRef} aria-hidden="true" />
    </>
  )
}
