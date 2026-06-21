import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import TechStack from './components/TechStack'
import Projects from './components/Projects'
import Blog from './components/Blog'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import Loader from './components/Loader'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import ParallaxLayers from './components/ParallaxLayers'
// Lazy-loaded pages
const BlogArticle = lazy(() => import('./components/BlogArticle'))
const ServicesPage = lazy(() => import('./components/Services'))
import './App.css'

gsap.registerPlugin(ScrollTrigger)

// ── Theme helpers ──────────────────────────────
function getInitialTheme() {
  const saved = localStorage.getItem('portfolio-theme')
  if (saved) return saved
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '')
  localStorage.setItem('portfolio-theme', theme)
}

// ──────────────────────────────────────────────
export default function App() {
  const [loaderDone, setLoaderDone] = useState(false)
  const [currentArticle, setCurrentArticle] = useState(null)
  const [currentPage, setCurrentPage] = useState('home') // 'home' | 'services'
  const [theme, setTheme] = useState(getInitialTheme)
  const appRef = useRef(null)

  // Apply theme on mount + change
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))

  // Open blog article
  const openArticle = (article) => {
    setCurrentArticle(article)
    window.scrollTo({ top: 0 })
    window.history.pushState({ page: 'article' }, '', `/blog/${article.slug}`)
    document.title = `${article.title} | Alejandro Almonacid`
  }

  // Back to portfolio
  const closeArticle = () => {
    setCurrentArticle(null)
    setCurrentPage('home')
    window.history.pushState({ page: 'home' }, '', '/')
    document.title = 'Alejandro Almonacid | Front End Developer & Community Manager'
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  // Open services page
  const openServices = () => {
    setCurrentArticle(null)
    setCurrentPage('services')
    window.scrollTo({ top: 0 })
    window.history.pushState({ page: 'services' }, '', '/servicios')
    document.title = 'Servicios | Alejandro Almonacid — Diseño Web & VTEX IO'
  }

  // Back to home from services
  const closeServices = () => {
    setCurrentPage('home')
    window.history.pushState({ page: 'home' }, '', '/')
    document.title = 'Alejandro Almonacid | Front End Developer & Community Manager'
    setTimeout(() => ScrollTrigger.refresh(), 100)
  }

  // Handle browser back button
  useEffect(() => {
    const handlePopState = (e) => {
      const page = e.state?.page || 'home'
      if (page === 'home') {
        setCurrentArticle(null)
        setCurrentPage('home')
        document.title = 'Alejandro Almonacid | Front End Developer & Community Manager'
      } else if (page === 'services') {
        setCurrentArticle(null)
        setCurrentPage('services')
        document.title = 'Servicios | Alejandro Almonacid — Diseño Web & VTEX IO'
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  // Detect initial URL on mount (direct access to /servicios or /blog/...)
  useEffect(() => {
    const path = window.location.pathname
    if (path === '/servicios') {
      setCurrentPage('services')
      setLoaderDone(true)
      document.title = 'Servicios | Alejandro Almonacid — Diseño Web & VTEX IO'
    }
  }, [])

  // Reveal animations (only on main portfolio, after loader)
  useEffect(() => {
    if (!loaderDone || currentArticle || currentPage !== 'home') return

    const sections = gsap.utils.toArray('.reveal-section')
    sections.forEach((section) => {
      gsap.fromTo(
        section,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      )
    })

    return () => ScrollTrigger.getAll().forEach((t) => t.kill())
  }, [loaderDone, currentArticle, currentPage])

  // ── Services page ──
  if (currentPage === 'services') {
    return (
      <>
        <CustomCursor />
        <ScrollProgress />
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            Cargando servicios…
          </div>
        }>
          <ServicesPage onBack={closeServices} />
        </Suspense>
      </>
    )
  }

  // ── Blog article view ──
  if (currentArticle) {
    return (
      <>
        <CustomCursor />
        <ScrollProgress />
        <Suspense fallback={
          <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', color: 'var(--text-muted)', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
            Cargando artículo…
          </div>
        }>
          <BlogArticle article={currentArticle} onBack={closeArticle} />
        </Suspense>
      </>
    )
  }

  return (
    <>
      {/* Loader — shown until animation completes */}
      {!loaderDone && <Loader onComplete={() => setLoaderDone(true)} />}

      {/* Global utilities */}
      <CustomCursor />
      <ScrollProgress />

      {/* Main portfolio */}
      <div ref={appRef} className="app" style={{ visibility: loaderDone ? 'visible' : 'hidden' }}>
        <Navbar theme={theme} onThemeToggle={toggleTheme} onServicesClick={openServices} />
        <ParallaxLayers />
        <main>
          <Hero />
          <About />
          <Experience />
          <TechStack />
          <Projects />
          <Blog onArticleClick={openArticle} />
          <Contact />
        </main>
        <Footer />
        <BackToTop />

        {/* WhatsApp floating — iOS glass */}
        <a
          href="https://wa.me/1234567890?text=Hola%20Alejandro%2C%20vi%20tu%20portafolio%20y%20me%20interesa%20conversar"
          target="_blank"
          rel="noopener noreferrer"
          className="wa-glass"
          aria-label="Contactar por WhatsApp"
          id="wa-glass-btn"
        >
          <span className="wa-glass__icon">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
          </span>
        </a>
      </div>
    </>
  )
}
