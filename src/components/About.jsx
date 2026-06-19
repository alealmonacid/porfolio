import './About.css'

// Reemplaza este array con tus habilidades reales
const SKILLS = [
  'VTEX IO', 'React JS', 'HTML5', 'CSS3 / SCSS',
  'JavaScript', 'GitHub', 'Photoshop', 'JIRA',
  'Community Management', 'Content Creation', 'TCG Strategy',
]

export default function About() {
  return (
    <section
      id="sobre-mi"
      className="about section-wrapper reveal-section"
      aria-label="Sobre mí"
    >
      <div className="about__container container">

        {/* ---- Imagen ---- */}
        <div className="about__image-col">
          <div className="about__image-frame">
            {/*
              Reemplaza la src con tu foto real:
              <img src="/foto-alejandro.jpg" ... />
              Coloca tu foto en la carpeta public/
            */}
            <img
              src="https://picsum.photos/480/580?random=99"
              alt="Foto de Alejandro Almonacid, Front End Developer"
              className="about__image"
              loading="lazy"
              width="480"
              height="580"
            />
            {/* Disponibilidad */}
            <div className="about__availability" aria-label="Estado de disponibilidad">
              <span className="about__availability-dot"></span>
              Disponible para proyectos
            </div>
          </div>
          {/* Decorative accent line */}
          <div className="about__image-deco" aria-hidden="true"></div>
        </div>

        {/* ---- Texto ---- */}
        <div className="about__text-col">
          <p className="about__eyebrow">Sobre mí</p>

          <h2 className="about__title">
            Hola, soy <span className="about__name-highlight">Alejandro</span> 👋
          </h2>

          <p className="about__bio">
            Soy un <strong>Front End Developer</strong> con experiencia en desarrollo de
            tiendas e-commerce con VTEX IO y React JS. Me apasiona construir interfaces
            que combinen un diseño atractivo con una experiencia de usuario fluida.
          </p>

          <p className="about__bio">
            Además del código, soy <strong>Community Manager</strong> y jugador
            competitivo de TCG. Esa combinación me da una perspectiva única: entiendo
            tanto la parte técnica como la comunicación con la comunidad y la estrategia
            de contenido para marcas digitales.
          </p>

          {/* Skills */}
          <div className="about__skills" aria-label="Habilidades y tecnologías">
            {SKILLS.map((skill) => (
              <span key={skill} className="about__skill-chip">
                {skill}
              </span>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
