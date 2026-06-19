import './Footer.css'

const NAV_LINKS = [
  { label: 'Inicio', href: '#inicio' },
  { label: 'Experiencia', href: '#experiencia' },
  { label: 'Stack', href: '#stack' },
  { label: 'Proyectos', href: '#proyectos' },
  { label: 'Blog', href: '#blog' },
  { label: 'Hablemos', href: '#hablemos' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="footer" role="contentinfo" aria-label="Pie de página">
      <div className="footer__inner container">
        {/* Brand */}
        <div className="footer__brand">
          <span className="footer__logo">AA</span>
          <p className="footer__tagline">
            Front End Dev · TCG Player · Community Manager · Gamer
          </p>
        </div>

        {/* Quick Nav */}
        <nav className="footer__nav" aria-label="Navegación del footer">
          <ul role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="footer__link"
                  onClick={(e) => { e.preventDefault(); scrollTo(link.href) }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="footer__bar">
        <div className="container">
          <p className="footer__copy">
            © {year} Alejandro Almonacid. Todos los derechos reservados.
          </p>
          <p className="footer__made">
            Diseñado y desarrollado con ❤️ y mucho ☕
          </p>
        </div>
      </div>
    </footer>
  )
}
