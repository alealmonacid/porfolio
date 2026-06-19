import { useState, useEffect } from 'react'
import './Navbar.css'

const navLinks = [
  { label: 'Inicio',      href: '#inicio' },
  { label: 'Sobre mí',   href: '#sobre-mi' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Stack',       href: '#stack' },
  { label: 'Proyectos',   href: '#proyectos' },
  { label: 'Blog',        href: '#blog' },
  { label: 'Hablemos',    href: '#hablemos' },
]

// Sun icon
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

// Moon icon
function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function Navbar({ theme, onThemeToggle, onServicesClick }) {
  const [visible, setVisible] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('inicio')

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.replace('#', ''))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { threshold: 0.35 }
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const handleLinkClick = (href) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) target.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`navbar ${visible ? 'navbar--visible' : ''}`}
      role="navigation"
      aria-label="Navegación principal"
    >
      <div className="navbar__inner">
        {/* Brand */}
        <a
          href="#inicio"
          className="navbar__brand"
          onClick={(e) => { e.preventDefault(); handleLinkClick('#inicio') }}
          aria-label="Ir al inicio"
        >
          <span className="navbar__brand-name">AA</span>
        </a>

        {/* Desktop links */}
        <ul className="navbar__links" role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__link ${activeSection === link.href.replace('#', '') ? 'navbar__link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Servicios — separate page */}
          <li>
            <a
              href="/servicios"
              className="navbar__link navbar__link--services"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); onServicesClick?.() }}
            >
              Servicios
            </a>
          </li>
        </ul>

        {/* Right actions */}
        <div className="navbar__actions">
          {/* Dark/Light toggle */}
          <button
            className="navbar__theme-btn"
            onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* CV Download */}
          <a
            href="/cv.pdf"
            download="CV-Alejandro-Almonacid.pdf"
            className="navbar__cv-btn"
            id="navbar-cv-btn"
            aria-label="Descargar CV de Alejandro Almonacid"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            CV
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`navbar__mobile-menu ${menuOpen ? 'navbar__mobile-menu--open' : ''}`}
        role="dialog"
        aria-modal="true"
      >
        <ul role="list">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeSection === link.href.replace('#', '') ? 'navbar__mobile-link--active' : ''}`}
                onClick={(e) => { e.preventDefault(); handleLinkClick(link.href) }}
              >
                {link.label}
              </a>
            </li>
          ))}
          {/* Servicios — separate page */}
          <li>
            <a
              href="/servicios"
              className="navbar__mobile-link navbar__mobile-link--services"
              onClick={(e) => { e.preventDefault(); setMenuOpen(false); onServicesClick?.() }}
            >
              Servicios
            </a>
          </li>
        </ul>

        {/* Mobile actions */}
        <div className="navbar__mobile-actions">
          <button className="navbar__theme-btn" onClick={onThemeToggle}
            aria-label={theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}>
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            {theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}
          </button>
          <a href="/cv.pdf" download="CV-Alejandro-Almonacid.pdf" className="navbar__cv-btn">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Descargar CV
          </a>
        </div>
      </div>
    </nav>
  )
}
