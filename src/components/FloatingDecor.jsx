import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import heroImage from '../assets/hero.png'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import './FloatingDecor.css'

gsap.registerPlugin(ScrollTrigger)

const decorMoves = [
  { x: 0, y: 28, rotate: 6 },
  { x: 18, y: -22, rotate: -8 },
  { x: -20, y: 20, rotate: 10 },
]

const shapes = [
  { src: heroImage, label: 'decorative hero', className: 'floating-decor__shape--1' },
  { src: reactLogo, label: 'decorative react', className: 'floating-decor__shape--2' },
  { src: viteLogo, label: 'decorative vite', className: 'floating-decor__shape--3' },
]

export default function FloatingDecor() {
  const decorRef = useRef(null)

  useEffect(() => {
    if (!decorRef.current) return

    const shapesEls = decorRef.current.querySelectorAll('.floating-decor__shape')
    const ctx = gsap.context(() => {
      shapesEls.forEach((shape, index) => {
        const move = decorMoves[index % decorMoves.length]
        gsap.to(shape, {
          x: move.x,
          y: move.y,
          rotation: move.rotate,
          ease: 'none',
          scrollTrigger: {
            trigger: decorRef.current.parentElement,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
            invalidateOnRefresh: true,
          },
        })
      })
    }, decorRef)

    return () => ctx.revert()
  }, [])

  return (
    <div className="floating-decor" ref={decorRef} aria-hidden="true">
      {shapes.map((shape) => (
        <span key={shape.className} className={`floating-decor__shape ${shape.className}`}>
          <img src={shape.src} alt={shape.label} />
        </span>
      ))}
    </div>
  )
}
