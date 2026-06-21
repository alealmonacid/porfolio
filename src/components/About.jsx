import './About.css'

// Reemplaza este array con tus habilidades reales
const SKILLS = [
  'VTEX IO', 'React JS', 'HTML5', 'CSS3 / SCSS',
  'JavaScript', 'GitHub', 'Photoshop', 'JIRA',
  'Handlebars', 'TCG Strategy',
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
            Mi misión principal en el mundo tech es rescatar a grandes marcas nacionales e internacionales del "lado oscuro" de las webs lentas. Me especializo en el ecosistema VTEX IO, construyendo e-commerce robustos que no solo se ven increíbles, sino que cargan a la velocidad de la luz.
          </p>

          <p className="about__bio">
            Mi superpoder es <strong>resolver problemas de forma rápida y efectiva.</strong> Me enfoco en la psicología del usuario, el performance y el SEO, asegurándome de que cada propuesta que pongo sobre la mesa no solo cumpla con el diseño, sino que optimice el tiempo y los resultados del negocio. Me encanta proponer, innovar y construir soluciones reales que a la gente le sirvan en su día a día.
          </p>

          <div className="about__bio">
            <strong>Datos curiosos sobre mí:</strong><br></br>
            <p>El café y la música son el combustible de mi código.</p>
            <p>A veces juego videojuegos</p>
            <p>Soy tan fan de Star Wars que organizo actividades y creo contenido para la comunidad del TCG Star Wars: Unlimited.</p>
          </div>

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
