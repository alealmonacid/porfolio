import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import ProjectModal from './ProjectModal'
import './Projects.css'

// Tech icon + brand color map
const TECH_ICONS = {
  React: {
    color: '#61DAFB',
    bg: 'rgba(97, 218, 251, 0.15)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <circle cx="12" cy="12" r="2.2"/>
        <path fill="none" stroke="currentColor" strokeWidth="1.2" d="M12 6.5c3.9 0 7.1 1.1 7.1 2.5S15.9 11.5 12 11.5 4.9 10.4 4.9 9 8.1 6.5 12 6.5z" transform="rotate(0 12 12)"/>
        <path fill="none" stroke="currentColor" strokeWidth="1.2" d="M12 6.5c3.9 0 7.1 1.1 7.1 2.5S15.9 11.5 12 11.5 4.9 10.4 4.9 9 8.1 6.5 12 6.5z" transform="rotate(60 12 12)"/>
        <path fill="none" stroke="currentColor" strokeWidth="1.2" d="M12 6.5c3.9 0 7.1 1.1 7.1 2.5S15.9 11.5 12 11.5 4.9 10.4 4.9 9 8.1 6.5 12 6.5z" transform="rotate(120 12 12)"/>
      </svg>
    ),
  },
  HTML5: {
    color: '#E34F26',
    bg: 'rgba(227, 79, 38, 0.15)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M4.136 3l1.456 16.323L12 21l6.408-1.677L19.864 3H4.136zm12.318 5.2H8.68l.26 2.88h7.254l-.78 8.56L12 20.64l-3.414-1L8.28 16h2.82l.14 1.6 .76.2.76-.2.1-1.12h-1.66l-.1-1.12H15.1l-.26 2.88L12 19.4l-2.84-.74-.19-2.14h-2.82l.38 4.24L12 22l5.47-1.44L18.346 8.2H5.654l-.26-2.88h13.06v2.88z"/>
      </svg>
    ),
  },
  VTEX: {
    color: '#F71963',
    bg: 'rgba(247, 25, 99, 0.15)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M5 4l3.5 8L5 20h3l2.5-5.5L13 20h3l-3.5-8L16 4h-3l-2.5 5.5L8 4H5z"/>
      </svg>
    ),
  },
  JavaScript: {
    color: '#F7DF1E',
    bg: 'rgba(247, 223, 30, 0.15)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M3 3h18v18H3V3zm4.5 13.5c0 1.5 1 2.5 2.5 2.5s2-.5 2-1.5c0-1-.5-1.5-1.5-2l-.5-.2c-.5-.2-.7-.4-.7-.8 0-.3.3-.6.7-.6s.7.3.7.7h1.3c0-1.1-.8-1.9-2-1.9s-2 .8-2 1.8c0 1 .5 1.5 1.5 2l.5.2c.6.2.8.5.8.9 0 .4-.3.7-.8.7s-.9-.3-.9-.9H7.5zm6.5 0v-5.5h1.5V16c0 .5.3.8.8.8s.8-.3.8-.8v-4.5H18.5V16.5c0 1.2-.8 2.2-2.2 2.2S14 17.7 14 16.5z"/>
      </svg>
    ),
  },
  CSS3: {
    color: '#1572B6',
    bg: 'rgba(21, 114, 182, 0.15)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M4.136 3l1.456 16.323L12 21l6.408-1.677L19.864 3H4.136zm11.22 5.2l-.66 7.36L12 16.64l-2.696-.88L9.08 13h2l.14 1.6.78.26.78-.26.12-1.34H8.5l-.4-4.8h7.856l-.6 2.4z"/>
      </svg>
    ),
  },
  SCSS: {
    color: '#CC6699',
    bg: 'rgba(204, 102, 153, 0.15)',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.7 12.4c-.1.4-.3.7-.6 1s-.6.5-1 .7c-.4.2-.8.3-1.2.4-.5.1-1 .1-1.5.1-.7 0-1.3-.1-1.9-.3-.6-.2-1.1-.5-1.5-.9-.4-.4-.6-.9-.7-1.5h1.8c0 .3.2.6.4.8.2.2.5.3.9.3.3 0 .6-.1.8-.2.2-.2.3-.4.3-.7 0-.2-.1-.4-.2-.5-.2-.2-.4-.3-.7-.4l-1.2-.4c-.7-.2-1.2-.5-1.5-.8-.4-.4-.5-.8-.5-1.3 0-.5.1-.9.4-1.2.2-.3.6-.6 1-.8.4-.2.9-.3 1.4-.3.8 0 1.5.2 2 .6.5.4.8 1 .8 1.7h-1.8c0-.3-.1-.5-.3-.7-.2-.2-.5-.3-.8-.3-.3 0-.5.1-.7.2-.2.2-.3.4-.3.6 0 .2.1.3.2.5.2.1.4.3.7.4l1.2.4c.7.2 1.2.5 1.6.9.3.3.5.8.5 1.3z"/>
      </svg>
    ),
  },
}

const DEFAULT_TECH_ICON = {
  color: '#ffffff',
  bg: 'rgba(255,255,255,0.1)',
  icon: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
}

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  const handleOpen = (project) => {
    setSelected(project)
    document.body.style.overflow = 'hidden'
  }

  const handleClose = () => {
    setSelected(null)
    document.body.style.overflow = ''
  }

  return (
    <section
      id="proyectos"
      className="projects section-wrapper reveal-section"
      aria-label="Proyectos destacados"
    >
      <h2 className="section-title">Proyectos Destacados</h2>

      <div className="projects__slider gradient-overlay-wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          loop={projects.length > 3}
          navigation={{
            nextEl: '.projects__btn-next',
            prevEl: '.projects__btn-prev',
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="projects__swiper"
          aria-label="Slider de proyectos"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <article
                className="project-card"
                onClick={() => handleOpen(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleOpen(project)}
                aria-label={`Ver detalles de ${project.title}`}
              >
                {/* Project image */}
                <div className="project-card__image-wrap">
                  <img
                    src={project.image}
                    alt={`Captura del proyecto ${project.title}`}
                    className="project-card__image"
                    loading="lazy"
                  />
                  <div className="project-card__overlay">
                    <span className="project-card__cta">Ver detalles →</span>
                  </div>
                </div>

                {/* Language/tech icon flag */}
                {(() => {
                  const tech = TECH_ICONS[project.language_flag] || DEFAULT_TECH_ICON
                  return (
                    <span
                      className="project-card__flag"
                      style={{ '--flag-color': tech.color, '--flag-bg': tech.bg }}
                      aria-label={`Tecnología principal: ${project.language_flag}`}
                      title={project.language_flag}
                    >
                      {tech.icon}
                    </span>
                  )
                })()}

                {/* Info */}
                <div className="project-card__info">
                  <h3 className="project-card__title">{project.title}</h3>
                  <p className="project-card__short">{project.short_description}</p>

                  {/* Tags */}
                  <div className="project-card__tags" aria-label="Tecnologías usadas">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="project-card__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav buttons */}
        <button className="projects__btn projects__btn-prev" aria-label="Proyecto anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button className="projects__btn projects__btn-next" aria-label="Proyecto siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>


      {/* Modal */}
      {selected && (
        <ProjectModal project={selected} onClose={handleClose} />
      )}
    </section>
  )
}
