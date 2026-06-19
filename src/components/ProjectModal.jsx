import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import './ProjectModal.css'


export default function ProjectModal({ project, onClose }) {
  const overlayRef = useRef(null)
  const panelRef = useRef(null)

  // GSAP open animation
  useEffect(() => {
    const tl = gsap.timeline()
    tl.fromTo(
      overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    ).fromTo(
      panelRef.current,
      { opacity: 0, y: 40, scale: 0.96 },
      { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'power3.out' },
      '-=0.15'
    )

    // Keyboard: close on Escape
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [])

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose })
    tl.to(panelRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.96,
      duration: 0.25,
      ease: 'power2.in',
    }).to(overlayRef.current, { opacity: 0, duration: 0.2, ease: 'power2.in' }, '-=0.1')
  }

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) handleClose()
  }

  return createPortal(
    <div
      className="modal-overlay"
      ref={overlayRef}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles del proyecto: ${project.title}`}
    >
      <div className="modal-panel" ref={panelRef}>
        {/* Close button */}
        <button
          className="modal-close"
          onClick={handleClose}
          aria-label="Cerrar modal"
          id="modal-close-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        {/* Image */}
        <div className="modal-image-wrap">
          <img
            src={project.image}
            alt={`Vista previa del proyecto ${project.title}`}
            className="modal-image"
          />
          <div className="modal-image-overlay">
            <span className="modal-year">{project.year}</span>
          </div>
        </div>

        {/* Content */}
        <div className="modal-content">
          <div className="modal-content-inner">
            <div className="modal-header">
              <span className="modal-company">{project.company}</span>
              <h2 className="modal-title">{project.title}</h2>
            </div>

            <p className="modal-description">{project.description}</p>

            <div className="modal-section">
              <h3 className="modal-section-title">Lenguajes y frameworks</h3>
              <div className="modal-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="modal-tag modal-tag--lang">{tag}</span>
                ))}
              </div>
            </div>

            {project.tools && project.tools.length > 0 && (
              <div className="modal-section">
                <h3 className="modal-section-title">Herramientas</h3>
                <div className="modal-tags">
                  {project.tools.map((tool) => (
                    <span key={tool} className="modal-tag modal-tag--tool">{tool}</span>
                  ))}
                </div>
              </div>
            )}

            {project.link && project.link !== '#' && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="modal-cta"
                aria-label={`Ver proyecto ${project.title}`}
              >
                Ver proyecto →
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  )
}

