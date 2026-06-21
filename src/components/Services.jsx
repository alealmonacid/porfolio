import { useState, useRef, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import './Services.css'

// ── Servicios ──
const SERVICES = [
  {
    id: 'vtex',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Customización VTEX IO',
    description: 'Personalización de componentes nativos de VTEX IO, creación de bloques custom con React, integración de funcionalidades específicas para tu tienda y optimización de la experiencia de compra.',
    features: ['Componentes custom React + VTEX', 'Integración con APIs externas', 'Checkout personalizado', 'Optimización de conversión'],
  },
  {
    id: 'landing',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Landing Pages',
    description: 'Diseño y desarrollo de landing pages de alto impacto con animaciones, optimización SEO y velocidad de carga. Ideales para campañas, lanzamientos de producto y generación de leads.',
    features: ['Diseño responsive premium', 'Animaciones y micro-interacciones', 'Formularios de conversión', 'Score 90+ en PageSpeed'],
  },
  {
    id: 'web',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: 'Sitios Web Corporativos',
    description: 'Desarrollo de sitios web profesionales que representan tu marca con excelencia. Diseño moderno, performance optimizada y estructura SEO pensada para posicionamiento orgánico.',
    features: ['Diseño UI/UX personalizado', 'Multi-idioma y responsive', 'Blog integrado con CMS', 'SEO técnico on-page'],
  },
  {
    id: 'performance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    title: 'Optimización de Rendimiento',
    description: 'Auditoría y mejora de Core Web Vitals, PageSpeed Insights y tiempos de carga. Reducción de bundle size, lazy loading, caché agresiva y optimización de imágenes.',
    features: ['Auditoría PageSpeed completa', 'Optimización de imágenes WebP/AVIF', 'Code splitting y lazy loading', 'Reducción de CLS, LCP, FID'],
  },
  {
    id: 'maintenance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Mantenimiento y Soporte',
    description: 'Planes mensuales de mantenimiento, actualización de contenido, monitoreo de performance, corrección de bugs y soporte técnico continuo para mantener tu sitio en óptimas condiciones.',
    features: ['Actualizaciones de contenido', 'Monitoreo de uptime y performance', 'Corrección de bugs prioritaria', 'Reportes mensuales'],
  },
]

// ── Proceso de trabajo ──
const PROCESS_STEPS = [
  { number: '01', title: 'Reunión', description: 'Conversamos sobre tu proyecto, objetivos de negocio y expectativas. Entiendo a fondo qué necesitas.' },
  { number: '02', title: 'Propuesta', description: 'Te presento una propuesta detallada con alcance, tecnologías, cronograma y presupuesto personalizado.' },
  { number: '03', title: 'Diseño', description: 'Creo el diseño visual de tu sitio. Iteramos juntos hasta que quede perfecto antes de escribir código.' },
  { number: '04', title: 'Desarrollo', description: 'Construyo tu sitio con código limpio, responsive y optimizado. Avances semanales para que veas el progreso.' },
  { number: '05', title: 'Entrega', description: 'Depliegue en tu servidor, pruebas finales, optimización de velocidad y capacitación para que puedas administrarlo.' },
  { number: '06', title: 'Soporte', description: 'Te acompaño después del lanzamiento con soporte técnico, ajustes y mantenimiento continuo.' },
]

// ── Presupuestos estimados ──
const BUDGET_OPTIONS = [
  'Menos de $500 USD',
  '$500 - $1.500 USD',
  '$1.500 - $5.000 USD',
  'Más de $5.000 USD',
  'No estoy seguro',
]

// ── FAQ ──
const FAQ_ITEMS = [
  { q: '¿Cuánto tiempo tarda un proyecto?', a: 'Depende del alcance. Una landing page puede estar lista en 1-2 semanas. Un sitio web corporativo entre 3-6 semanas. Customizaciones VTEX IO varían entre 1-4 semanas según la complejidad. Siempre te doy un cronograma detallado en la propuesta.' },
  { q: '¿Qué incluye el mantenimiento mensual?', a: 'Incluye: actualización de contenido (textos, imágenes), monitoreo de uptime y rendimiento, corrección de bugs prioritaria, actualizaciones de seguridad, y un reporte mensual del estado del sitio. Los ajustes menores están incluidos.' },
  { q: '¿Cómo es el proceso de pago?', a: 'Generalmente trabajo con un anticipo del 50% al iniciar el proyecto y el 50% restante al entregar. Para proyectos grandes, podemos dividirlo en 3 pagos según hitos del proyecto. Acepto transferencia bancaria y PayPal.' },
  { q: '¿Puedo ver avances durante el desarrollo?', a: 'Sí, te comparto avances semanales con un enlace de preview para que veas el progreso en tiempo real. Además, iteramos juntos en el diseño antes de escribir una línea de código.' },
  { q: '¿Qué pasa si necesito cambios después de la entrega?', a: 'Los primeros 15 días después de la entrega incluyen ajustes sin costo adicional. Después, cualquier cambio se cotiza por separado o entra en el plan de mantenimiento mensual.' },
  { q: '¿Trabajas con clientes fuera de mi país?', a: 'Sí, trabajo con clientes de toda Latinoamérica y España. La comunicación es por videollamada, WhatsApp y email. Todo el proceso es 100% remoto.' },
]

// ── Comparativa ──
const COMPARISON = [
  { feature: 'Comunicación directa', me: true, agency: false, cheap: true },
  { feature: 'Diseño personalizado premium', me: true, agency: true, cheap: false },
  { feature: 'Código limpio y mantenible', me: true, agency: '~', cheap: false },
  { feature: 'Soporte post-entrega', me: true, agency: true, cheap: false },
  { feature: 'Precio justo y transparente', me: true, agency: false, cheap: true },
  { feature: 'Entrega puntual', me: true, agency: '~', cheap: false },
  { feature: 'Optimización de performance', me: true, agency: '~', cheap: false },
  { feature: 'Conocimiento en VTEX IO', me: true, agency: '~', cheap: false },
]

// ── Service types for form ──
const SERVICE_TYPES = SERVICES.map((s) => s.title)

// ── Web3Forms config ──
const ACCESS_KEY = 'TU_ACCESS_KEY_AQUI'

export default function ServicesPage({ onBack }) {
  const pageRef = useRef(null)
  const formLoadTimeRef = useRef(Date.now())
  const statsRef = useRef(null)
  const countersAnimated = useRef(false)
  const [active, setActive] = useState(false)

  const [projects, setProjects] = useState([])
  const [openFaq, setOpenFaq] = useState(null)
  const [showBackTop, setShowBackTop] = useState(false)
  const [formData, setFormData] = useState({
    name: '', email: '', service: '', budget: '', description: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')

  // Fetch projects
  useEffect(() => {
    fetch('/data/projects.json')
      .then((r) => r.json())
      .then(setProjects)
      .catch(() => setProjects([]))
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setActive(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  // ── SEO: Meta tags + FAQ Schema ──
  useEffect(() => {
    // Meta tags
    const setMeta = (name, content, attr = 'name') => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    setMeta('description', 'Servicios profesionales de diseño web, customización VTEX IO, landing pages, sitios corporativos y optimización de rendimiento. Cotización personalizada.')
    setMeta('og:title', 'Servicios | Alejandro Almonacid — Diseño Web & VTEX IO', 'property')
    setMeta('og:description', 'Desarrollo web de alto impacto, tiendas e-commerce personalizadas y sitios que convierten visitantes en clientes.', 'property')
    setMeta('og:url', `${window.location.origin}/servicios`, 'property')

    // FAQ Schema (JSON-LD)
    const schema = document.createElement('script')
    schema.type = 'application/ld+json'
    schema.id = 'faq-schema'
    schema.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: FAQ_ITEMS.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })
    document.head.appendChild(schema)

    return () => {
      const el = document.getElementById('faq-schema')
      if (el) el.remove()
    }
  }, [])

  // ── Back to top visibility ──
  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ── Animated stat counters ──
  // ponytail: native requestAnimationFrame stats count instead of GSAP
  useEffect(() => {
    if (!statsRef.current || countersAnimated.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !countersAnimated.current) {
          countersAnimated.current = true
          const counters = statsRef.current.querySelectorAll('[data-target]')
          const startTime = performance.now()
          const duration = 1800
          
          const animate = (time) => {
            const elapsed = time - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeProgress = progress * (2 - progress)
            
            counters.forEach((el) => {
              const target = parseInt(el.dataset.target, 10)
              const prefix = el.dataset.prefix || ''
              const suffix = el.dataset.suffix || ''
              el.textContent = `${prefix}${Math.round(easeProgress * target)}${suffix}`
            })
            
            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(statsRef.current)
    return () => observer.disconnect()
  }, [projects])

  // Reveal animations
  // ponytail: native IntersectionObserver reveal instead of GSAP ScrollTrigger
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('srv-reveal--active')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )
    const items = document.querySelectorAll('.srv-reveal')
    items.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!formData.name.trim()) return 'Por favor ingresa tu nombre.'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'Por favor ingresa un email válido.'
    if (!formData.service) return 'Selecciona un tipo de servicio.'
    if (!formData.description.trim() || formData.description.trim().length < 20)
      return 'Describe tu proyecto con al menos 20 caracteres.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (honeypot !== '') { setStatus('success'); return }
    if (Date.now() - formLoadTimeRef.current < 3000) {
      setStatus('error'); setErrorMsg('Envío demasiado rápido. Espera un momento.'); return
    }
    const err = validate()
    if (err) { setStatus('error'); setErrorMsg(err); return }

    setStatus('sending'); setErrorMsg('')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: `Servicio: ${formData.service}\nPresupuesto: ${formData.budget || 'No especificado'}\n\n${formData.description}`,
          subject: `Cotización — ${formData.service} — ${formData.name}`,
          from_name: 'Servicios — Portfolio',
          botcheck: '',
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', service: '', budget: '', description: '' })
      } else throw new Error(data.message)
    } catch {
      setStatus('error')
      setErrorMsg('Hubo un problema. Intenta de nuevo o contáctame por LinkedIn.')
    }
  }

  return (
    <div className="services-page" ref={pageRef} style={{ opacity: active ? 1 : 0, transition: 'opacity 0.5s ease-out' }}>

      {/* ── Top bar ── */}
      <header className="srv-topbar">
        <button className="srv-topbar__back" onClick={onBack} aria-label="Volver al portfolio" id="srv-back-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
          Volver al portfolio
        </button>
        <div className="srv-topbar__brand">AA</div>
      </header>

      {/* ── Hero ── */}
      <section className="srv-hero" aria-label="Servicios de diseño web y VTEX IO">
        <div className="srv-hero__bg" aria-hidden="true">
          <div className="srv-hero__grid"></div>
          <div className="srv-hero__glow srv-hero__glow--1"></div>
          <div className="srv-hero__glow srv-hero__glow--2"></div>
        </div>
        <div className="srv-hero__content">
          <p className="srv-hero__eyebrow">Servicios profesionales</p>
          <h1 className="srv-hero__title">
            Diseño Web &<br /><span className="srv-hero__accent">VTEX IO</span>
          </h1>
          <p className="srv-hero__subtitle">
            Desarrollo de experiencias web de alto impacto, tiendas e-commerce personalizadas
            y sitios que convierten visitantes en clientes.
          </p>
          <div className="srv-hero__availability">
            <span className="srv-hero__dot" aria-hidden="true" />
            Disponible para proyectos — Junio 2026
          </div>
          <a href="#cotizar" className="srv-hero__cta" onClick={(e) => { e.preventDefault(); document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Solicitar cotización
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </section>

      {/* ── Servicios grid ── */}
      <section className="srv-services" id="servicios-lista" aria-label="Lista de servicios">
        <div className="srv-services__inner container">
          <p className="srv-section-eyebrow">¿En qué te puedo ayudar?</p>
          <h2 className="srv-section-title">Mis Servicios</h2>

          <div className="srv-services__grid">
            {SERVICES.map((service) => (
              <article key={service.id} className="srv-card srv-reveal">
                <div className="srv-card__icon">{service.icon}</div>
                <h3 className="srv-card__title">{service.title}</h3>
                <p className="srv-card__desc">{service.description}</p>
                <ul className="srv-card__features" aria-label="Incluye">
                  {service.features.map((f) => (
                    <li key={f} className="srv-card__feature">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Proceso ── */}
      <section className="srv-process" aria-label="Mi proceso de trabajo">
        <div className="srv-process__inner container">
          <p className="srv-section-eyebrow">Paso a paso</p>
          <h2 className="srv-section-title">Cómo Trabajo</h2>

          <div className="srv-process__timeline">
            {PROCESS_STEPS.map((step, i) => (
              <div key={step.number} className="srv-step srv-reveal">
                <div className="srv-step__number">{step.number}</div>
                <div className="srv-step__content">
                  <h3 className="srv-step__title">{step.title}</h3>
                  <p className="srv-step__desc">{step.description}</p>
                </div>
                {i < PROCESS_STEPS.length - 1 && <div className="srv-step__connector" aria-hidden="true" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats / social proof ── */}
      <section className="srv-stats" aria-label="Estadísticas" ref={statsRef}>
        <div className="srv-stats__inner container">
          <div className="srv-stat srv-reveal">
            <span className="srv-stat__number" data-target={projects.length || 5} data-prefix="+" data-suffix="">0</span>
            <span className="srv-stat__label">Proyectos completados</span>
          </div>
          <div className="srv-stat srv-reveal">
            <span className="srv-stat__number" data-target="3" data-prefix="+" data-suffix="">0</span>
            <span className="srv-stat__label">Años de experiencia</span>
          </div>
          <div className="srv-stat srv-reveal">
            <span className="srv-stat__number" data-target="100" data-prefix="" data-suffix="%">0</span>
            <span className="srv-stat__label">Clientes satisfechos</span>
          </div>
          <div className="srv-stat srv-reveal">
            <span className="srv-stat__number" data-target="95" data-prefix="" data-suffix="+">0</span>
            <span className="srv-stat__label">PageSpeed score</span>
          </div>
        </div>
      </section>

      {/* ── Proyectos realizados ── */}
      {projects.length > 0 && (
        <section className="srv-projects" aria-label="Proyectos realizados">
          <div className="srv-projects__inner container">
            <p className="srv-section-eyebrow">Resultados que hablan</p>
            <h2 className="srv-section-title">Proyectos Realizados</h2>

            <div className="srv-projects__slider">
              <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                loop={projects.length > 3}
                autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
                speed={600}
                navigation={{
                  nextEl: '.srv-proj__btn-next',
                  prevEl: '.srv-proj__btn-prev',
                }}
                breakpoints={{
                  0: { slidesPerView: 1 },
                  700: { slidesPerView: 2 },
                  1100: { slidesPerView: 3 },
                }}
                className="srv-projects__swiper"
              >
                {projects.map((project) => (
                  <SwiperSlide key={project.id}>
                    <article className="srv-proj-card">
                      <div className="srv-proj-card__img-wrap">
                        <img
                          src={project.image}
                          alt={`Proyecto: ${project.title}`}
                          className="srv-proj-card__img"
                          loading="lazy"
                        />
                        <div className="srv-proj-card__overlay">
                          <span className="srv-proj-card__year">{project.year}</span>
                        </div>
                      </div>
                      <div className="srv-proj-card__body">
                        <span className="srv-proj-card__company">{project.company}</span>
                        <h3 className="srv-proj-card__title">{project.title}</h3>
                        <p className="srv-proj-card__desc">{project.short_description}</p>
                        <div className="srv-proj-card__tags">
                          {project.tags.slice(0, 3).map((tag) => (
                            <span key={tag} className="srv-proj-card__tag">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </article>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button className="srv-proj__btn srv-proj__btn-prev" aria-label="Proyecto anterior">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button className="srv-proj__btn srv-proj__btn-next" aria-label="Proyecto siguiente">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>
        </section>
      )}

      {/* ── Formulario de cotización ── */}

      <section className="srv-quote" id="cotizar" aria-label="Solicitar cotización">
        <div className="srv-quote__inner container">
          <p className="srv-section-eyebrow">¿Listo para empezar?</p>
          <h2 className="srv-section-title">Solicita tu Cotización</h2>
          <p className="srv-quote__subtitle">
            Cuéntame sobre tu proyecto y te envío una propuesta personalizada en 24-48 horas.
          </p>

          <form className="srv-form" onSubmit={handleSubmit} noValidate>
            {/* Honeypot */}
            <input type="text" name="bot-field" value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
              className="srv-form__honeypot" tabIndex="-1" autoComplete="off" aria-hidden="true" />

            <div className="srv-form__row">
              <div className="srv-form__field">
                <label htmlFor="srv-name" className="srv-form__label">Nombre</label>
                <input id="srv-name" type="text" name="name" value={formData.name} onChange={handleChange}
                  className="srv-form__input" placeholder="Tu nombre" autoComplete="name" required disabled={status === 'sending'} />
              </div>
              <div className="srv-form__field">
                <label htmlFor="srv-email" className="srv-form__label">Email</label>
                <input id="srv-email" type="email" name="email" value={formData.email} onChange={handleChange}
                  className="srv-form__input" placeholder="tu@email.com" autoComplete="email" required disabled={status === 'sending'} />
              </div>
            </div>

            <div className="srv-form__row">
              <div className="srv-form__field">
                <label htmlFor="srv-service" className="srv-form__label">Tipo de servicio</label>
                <select id="srv-service" name="service" value={formData.service} onChange={handleChange}
                  className="srv-form__select" required disabled={status === 'sending'}>
                  <option value="">Selecciona un servicio</option>
                  {SERVICE_TYPES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="srv-form__field">
                <label htmlFor="srv-budget" className="srv-form__label">Presupuesto estimado <span className="srv-form__optional">(opcional)</span></label>
                <select id="srv-budget" name="budget" value={formData.budget} onChange={handleChange}
                  className="srv-form__select" disabled={status === 'sending'}>
                  <option value="">Selecciona un rango</option>
                  {BUDGET_OPTIONS.map((b) => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
            </div>

            <div className="srv-form__field">
              <label htmlFor="srv-desc" className="srv-form__label">Describe tu proyecto</label>
              <textarea id="srv-desc" name="description" value={formData.description} onChange={handleChange}
                className="srv-form__textarea" placeholder="Cuéntame los detalles: qué necesitas, plazos, funcionalidades especiales..."
                rows={6} required disabled={status === 'sending'} />
            </div>

            {status === 'error' && (
              <div className="srv-form__status srv-form__status--error" role="alert">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {errorMsg}
              </div>
            )}
            {status === 'success' && (
              <div className="srv-form__status srv-form__status--success" role="status">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ¡Solicitud enviada! Te respondo en 24-48 horas 🎉
              </div>
            )}

            <button type="submit" className="srv-form__submit" disabled={status === 'sending'}>
              {status === 'sending' ? (<><span className="srv-form__spinner" />Enviando…</>) : (
                <>Enviar solicitud
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
                </>
              )}
            </button>
          </form>
        </div>
      </section>

      {/* ── Comparativa: ¿Por qué elegirme? ── */}
      <section className="srv-compare" aria-label="Comparativa">
        <div className="srv-compare__inner container">
          <p className="srv-section-eyebrow">La diferencia</p>
          <h2 className="srv-section-title">¿Por Qué Elegirme?</h2>

          <div className="srv-compare__table-wrap">
            <table className="srv-compare__table">
              <thead>
                <tr>
                  <th className="srv-compare__th srv-compare__th--feature">Característica</th>
                  <th className="srv-compare__th srv-compare__th--me">
                    <span className="srv-compare__badge">Recomendado</span>
                    Conmigo
                  </th>
                  <th className="srv-compare__th">Agencia</th>
                  <th className="srv-compare__th">Freelancer barato</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map((row) => (
                  <tr key={row.feature}>
                    <td className="srv-compare__td srv-compare__td--feature">{row.feature}</td>
                    <td className="srv-compare__td srv-compare__td--me">
                      {row.me === true ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : '~'}
                    </td>
                    <td className="srv-compare__td">
                      {row.agency === true ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : row.agency === false ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      ) : <span className="srv-compare__maybe">~</span>}
                    </td>
                    <td className="srv-compare__td">
                      {row.cheap === true ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── CTA banner ── */}
      <div className="srv-cta-banner">
        <div className="srv-cta-banner__inner container">
          <div className="srv-cta-banner__text">
            <h3 className="srv-cta-banner__title">¿Tienes un proyecto en mente?</h3>
            <p className="srv-cta-banner__subtitle">Cuéntame tu idea y la convertimos en realidad.</p>
          </div>
          <a href="#cotizar" className="srv-cta-banner__btn" onClick={(e) => { e.preventDefault(); document.getElementById('cotizar')?.scrollIntoView({ behavior: 'smooth' }) }}>
            Solicitar cotización
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </a>
        </div>
      </div>

      {/* ── FAQ ── */}
      <section className="srv-faq" aria-label="Preguntas frecuentes">
        <div className="srv-faq__inner container">
          <p className="srv-section-eyebrow">Resolvemos dudas</p>
          <h2 className="srv-section-title">Preguntas Frecuentes</h2>

          <div className="srv-faq__list">
            {FAQ_ITEMS.map((item, i) => (
              <div
                key={i}
                className={`srv-faq__item ${openFaq === i ? 'srv-faq__item--open' : ''}`}
              >
                <button
                  className="srv-faq__question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-answer-${i}`}
                >
                  <span>{item.q}</span>
                  <svg className="srv-faq__chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </button>
                <div
                  className="srv-faq__answer"
                  id={`faq-answer-${i}`}
                  role="region"
                >
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer CTA ── */}
      <footer className="srv-footer">
        <div className="srv-footer__inner container">
          <p className="srv-footer__text">¿Prefieres conversar primero?</p>
          <div className="srv-footer__links">
            <a href="https://www.linkedin.com/in/alejandroalmonacid" target="_blank" rel="noopener noreferrer" className="srv-footer__btn srv-footer__btn--linkedin">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              LinkedIn
            </a>
            <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="srv-footer__btn srv-footer__btn--whatsapp">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              WhatsApp
            </a>
          </div>
          <button className="srv-footer__back-link" onClick={onBack}>← Volver al portfolio</button>
        </div>
      </footer>

      {/* ── Back to top ── */}
      <button
        className={`srv-back-top ${showBackTop ? 'srv-back-top--visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Volver arriba"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>
      </button>

      {/* ── Floating WhatsApp button ── */}
      <a
        href="https://wa.me/1234567890?text=Hola%20Alejandro%2C%20me%20interesa%20cotizar%20un%20proyecto"
        target="_blank"
        rel="noopener noreferrer"
        className="srv-whatsapp-float"
        aria-label="Contactar por WhatsApp"
        id="srv-whatsapp-btn"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
      </a>
    </div>
  )
}
