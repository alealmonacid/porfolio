import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './ParallaxLayers.css'

gsap.registerPlugin(ScrollTrigger)

export default function ParallaxLayers({ images }) {
  const rootRef = useRef(null)

  const defaultImages = [
    (images && images[0]) || "/images/parallax-1.svg",
    (images && images[1]) || "/images/parallax-2.svg",
    (images && images[2]) || "/images/parallax-3.svg",
  ]

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    const layers = Array.from(root.querySelectorAll('.parallax-layer'))

    const ctx = gsap.context(() => {
      // single ScrollTrigger driving all layers for synced progress
      ScrollTrigger.create({
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const progress = self.progress // 0..1
          layers.forEach((layer, i) => {
            const depthFactor = (i + 1) // 1..3

            // Move vertically: scroll down => layers move up (negative y)
            const maxY = 80 // max vertical movement per depth unit (reduced for subtler effect)
            const y = -progress * maxY * depthFactor

            layer.style.transform = `translate3d(0px, ${y}px, 0)`
          })
        },
      })
    }, root)

    return () => ctx.revert()
  }, [images])

  return (
    <div className="parallax-layers" ref={rootRef} aria-hidden="true">
      <div
        className="parallax-layer parallax-layer--3"
        style={{ backgroundImage: `url('${defaultImages[0]}')` }}
      />
      <div
        className="parallax-layer parallax-layer--2"
        style={{ backgroundImage: `url('${defaultImages[1]}')` }}
      />
      <div
        className="parallax-layer parallax-layer--1"
        style={{ backgroundImage: `url('${defaultImages[2]}')` }}
      />
    </div>
  )
}
