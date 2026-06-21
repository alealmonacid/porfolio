import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import './ProjectModal.css'

export default function ProjectModal({ project, onClose }) {
  const [active, setActive] = useState(false)

  // ponytail: standard CSS transitions instead of GSAP timelines
  useEffect(() => {
    const raf = requestAnimationFrame(() => setActive(true))
    
    const handleKey = (e) => {
      if (e.key === 'Escape') handleClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])

  const handleClose = () => {
    setActive(false)
    setTimeout(onClose, 300) // Wait for CSS transition
  }

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) handleClose()
  }

  return createPortal(
    <div
      className={`modal-overlay ${active ? 'active' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles del proyecto: ${project.title}`}
    >
      <div className={`modal-panel ${active ? 'active' : ''}`}>
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
