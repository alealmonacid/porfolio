import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Experience.css'

gsap.registerPlugin(ScrollTrigger)

export default function Experience() {
  const [items, setItems] = useState([])
  const sectionRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    fetch('/data/experience.json')
      .then((r) => r.json())
      .then(setItems)
      .catch(() => setItems([]))
  }, [])

  useEffect(() => {
    if (!items.length || !trackRef.current) return

    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) return

    const track = trackRef.current
    const section = sectionRef.current

    const ctx = gsap.context(() => {
      const totalScroll = track.scrollWidth - window.innerWidth
      if (totalScroll <= 0) return

      gsap.to(track, {
        x: -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalScroll + 200}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [items])

  const typeLabel = (type) => {
    if (type === 'dev') return '💻 Dev'
    if (type === 'marketing') return '📣 Marketing'
    return '🎮 Hybrid'
  }

  return (
    <section
      id="experiencia"
      className="experience reveal-section"
      ref={sectionRef}
      aria-label="Mi experiencia profesional"
    >
      <h2 className="section-title">Mi Experiencia</h2>

      {/* Desktop: horizontal pinned track */}
      <div className="experience__outer gradient-overlay-wrapper">
        <div className="experience__track" ref={trackRef}>
          {/* Timeline center line */}
          <div className="experience__line" aria-hidden="true"></div>

          {items.map((item, index) => {
            const isTop = index % 2 === 0
            return (
              <article
                key={item.id}
                className={`experience__item ${isTop ? 'experience__item--top' : 'experience__item--bottom'}`}
                aria-label={`${item.title} en ${item.company}, ${item.year}`}
              >
                {/* Card — positioned in its half */}
                <div className="experience__card">
                  <span className="experience__type-badge">
                    {typeLabel(item.type)}
                  </span>
                  <h3 className="experience__title">{item.title}</h3>
                  <p className="experience__company">{item.company}</p>
                  <p className="experience__desc">{item.description}</p>
                </div>

                {/* Dot — always at the center line */}
                <div className="experience__dot" aria-hidden="true">
                  <div className="experience__dot-inner">★</div>
                </div>

                {/* Year — just below or above the dot */}
                <span className="experience__year">{item.year}</span>
              </article>
            )
          })}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="experience__mobile">
        {items.map((item) => (
          <article
            key={item.id}
            className="experience__mobile-item"
            aria-label={`${item.title} en ${item.company}, ${item.year}`}
          >
            <div className="experience__mobile-dot">
              <div className="experience__mobile-dot-inner"></div>
            </div>
            <div className="experience__mobile-card">
              <span className="experience__year">{item.year}</span>
              <h3 className="experience__title">{item.title}</h3>
              <p className="experience__company">{item.company}</p>
              <p className="experience__desc">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
