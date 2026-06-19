import { useState, useRef, useEffect } from 'react'
import './Contact.css'

// ─────────────────────────────────────────────
// Web3Forms — anti-spam contact form
// Para activarlo:
//   1. Registrate gratis en https://web3forms.com
//   2. Obtén tu Access Key
//   3. Reemplaza el valor de ACCESS_KEY abajo
// ─────────────────────────────────────────────
const ACCESS_KEY = 'TU_ACCESS_KEY_AQUI'

export default function Contact() {
  const formLoadTimeRef = useRef(Date.now())

  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [honeypot, setHoneypot] = useState('')  // anti-spam hidden field
  const [status, setStatus] = useState('idle')  // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const validate = () => {
    if (!formData.name.trim()) return 'Por favor ingresa tu nombre.'
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return 'Por favor ingresa un email válido.'
    if (!formData.message.trim() || formData.message.trim().length < 10)
      return 'El mensaje debe tener al menos 10 caracteres.'
    return null
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // ── Anti-spam: honeypot ──
    if (honeypot !== '') {
      // Silently ignore — it's a bot
      setStatus('success')
      return
    }

    // ── Anti-spam: time check (bots submit instantly) ──
    const elapsed = Date.now() - formLoadTimeRef.current
    if (elapsed < 3000) {
      setStatus('error')
      setErrorMsg('Envío demasiado rápido. Por favor espera un momento e intenta de nuevo.')
      return
    }

    // ── Client-side validation ──
    const validationError = validate()
    if (validationError) {
      setStatus('error')
      setErrorMsg(validationError)
      return
    }

    setStatus('sending')
    setErrorMsg('')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: `Nuevo mensaje de ${formData.name} — Portfolio`,
          from_name: 'Portfolio Contact Form',
          // Web3Forms spam protection options
          botcheck: '',
        }),
      })

      const data = await res.json()

      if (data.success) {
        setStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        throw new Error(data.message || 'Error desconocido')
      }
    } catch (err) {
      setStatus('error')
      setErrorMsg('Hubo un problema al enviar el mensaje. Intenta de nuevo o escríbeme directamente a LinkedIn.')
    }
  }

  return (
    <section
      id="hablemos"
      className="contact section-wrapper reveal-section"
      aria-label="Sección de contacto"
    >
      {/* Full-bleed background decorations */}
      <div className="contact__bg" aria-hidden="true">
        <div className="contact__bg-circle contact__bg-circle--linkedin"></div>
        <div className="contact__bg-circle contact__bg-circle--whatsapp"></div>
      </div>

      <div className="contact__inner">
        <p className="contact__eyebrow">¿Tienes un proyecto en mente?</p>
        <h2 className="contact__title">¿Hablemos?</h2>
        <p className="contact__subtitle">
          Estoy disponible para proyectos freelance, posiciones dependientes y colaboraciones creativas.
          Escríbeme y te respondo rápido 🚀
        </p>

        {/* ── Quick contact buttons ── */}
        <div className="contact__buttons">
          <a
            href="https://www.linkedin.com/in/alejandroalmonacid"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__btn contact__btn--linkedin"
            id="contact-linkedin"
            aria-label="Contactar en LinkedIn"
          >
            <svg className="contact__btn-icon" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            LinkedIn
          </a>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="contact__btn contact__btn--whatsapp"
            id="contact-whatsapp"
            aria-label="Contactar por WhatsApp"
          >
            <svg className="contact__btn-icon" xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
            </svg>
            WhatsApp
          </a>
        </div>

        {/* ── Divider ── */}
        <div className="contact__divider">
          <span>o escríbeme directamente</span>
        </div>

        {/* ── Contact Form ── */}
        <form
          className="contact__form"
          onSubmit={handleSubmit}
          noValidate
          aria-label="Formulario de contacto"
        >
          {/*
            HONEYPOT: campo oculto visualmente.
            Los bots lo llenan, los humanos no lo ven.
            Si contiene texto → descartamos el envío.
          */}
          <input
            type="text"
            name="bot-field"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            className="contact__honeypot"
            tabIndex="-1"
            autoComplete="off"
            aria-hidden="true"
          />

          <div className="contact__form-row">
            <div className="contact__field">
              <label htmlFor="contact-name" className="contact__label">Nombre</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="contact__input"
                placeholder="Tu nombre"
                autoComplete="name"
                required
                disabled={status === 'sending'}
              />
            </div>
            <div className="contact__field">
              <label htmlFor="contact-email" className="contact__label">Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="contact__input"
                placeholder="tu@email.com"
                autoComplete="email"
                required
                disabled={status === 'sending'}
              />
            </div>
          </div>

          <div className="contact__field">
            <label htmlFor="contact-message" className="contact__label">Mensaje</label>
            <textarea
              id="contact-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="contact__textarea"
              placeholder="Cuéntame sobre tu proyecto o consulta..."
              rows={5}
              required
              disabled={status === 'sending'}
            />
          </div>

          {/* Status messages */}
          {status === 'error' && (
            <div className="contact__status contact__status--error" role="alert">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {errorMsg}
            </div>
          )}

          {status === 'success' && (
            <div className="contact__status contact__status--success" role="status">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              ¡Mensaje enviado! Te respondo pronto 🎉
            </div>
          )}

          <button
            type="submit"
            className="contact__submit"
            id="contact-submit"
            disabled={status === 'sending'}
            aria-busy={status === 'sending'}
          >
            {status === 'sending' ? (
              <>
                <span className="contact__spinner" aria-hidden="true" />
                Enviando…
              </>
            ) : (
              <>
                Enviar mensaje
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <line x1="22" y1="2" x2="11" y2="13"/>
                  <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                </svg>
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  )
}
