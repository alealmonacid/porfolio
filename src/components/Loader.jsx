import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import './Loader.css'

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null)
  const svgRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // 1. Fade in overlay
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    )

    // 2. Pop-in the SVG
    .fromTo(svgRef.current,
      { scale: 0.6, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.7)' }
    )

    // 3. Hold
    .to({}, { duration: 0.7 })

    // 4. Pulse glow once
    .to(svgRef.current, {
      filter: 'drop-shadow(0 0 18px rgba(0,212,255,0.9))',
      duration: 0.2,
      yoyo: true,
      repeat: 1,
    })

    // 5. Fade out overlay
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.45,
      ease: 'power2.in',
      onComplete,
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader-overlay" ref={overlayRef}>
      <div className="loader-content" ref={svgRef}>

        {/* SVG — monograma AA (reemplazable por tu logo SVG real) */}
        <svg
          className="loader-svg"
          viewBox="0 0 130 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Cargando — Alejandro Almonacid"
          role="img"
        >
          {/* Glow filter */}
          <defs>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Left A — outer stroke */}
          <path
            className="loader-path"
            d="M 5 70 L 30 5 L 55 70"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{ animationDelay: '0.2s' }}
          />
          {/* Left A — crossbar */}
          <path
            className="loader-path loader-path--cross"
            d="M 14 45 L 46 45"
            strokeLinecap="round"
            pathLength="1"
            style={{ animationDelay: '0.55s' }}
          />

          {/* Right A — outer stroke */}
          <path
            className="loader-path"
            d="M 75 70 L 100 5 L 125 70"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength="1"
            style={{ animationDelay: '0.4s' }}
          />
          {/* Right A — crossbar */}
          <path
            className="loader-path loader-path--cross"
            d="M 84 45 L 116 45"
            strokeLinecap="round"
            pathLength="1"
            style={{ animationDelay: '0.75s' }}
          />
        </svg>

        <p className="loader-label">alejandro almonacid</p>
      </div>
    </div>
  )
}
