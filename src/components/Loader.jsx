import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import alojoLogo from '../assets/alejo_logo.svg'
import './Loader.css'

export default function Loader({ onComplete }) {
  const overlayRef = useRef(null)
  const logoRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // 1. Logo enters with scale
    tl.fromTo(logoRef.current,
      { scale: 0.3, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.5)' }
    )

    // 2. Simulate loading (hold at 100%)
    tl.to({}, { duration: 0.8 })

    // 3. Pulsing glow effect on logo (3 times)
    for (let i = 0; i < 3; i++) {
      tl.to(logoRef.current, {
        filter: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.8))',
        duration: 0.4,
        ease: 'power1.inOut',
      })
      tl.to(logoRef.current, {
        filter: 'drop-shadow(0 0 5px rgba(255, 255, 255, 0.2))',
        duration: 0.4,
        ease: 'power1.inOut',
      })
    }

    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.in',
      onComplete,
    })

    return () => tl.kill()
  }, [onComplete])

  return (
    <div className="loader-overlay" ref={overlayRef}>
      <div className="loader-content" ref={logoRef}>
        <img 
          src={alojoLogo} 
          alt="Cargando - Alejandro Almonacid" 
          className="loader-logo"
        />
      </div>
    </div>
  )
}
