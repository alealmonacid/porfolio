import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './TechStack.css'

const TECH_ITEMS = [
  {
    id: 'vtex',
    name: 'VTEX',
    icon: null,
    color: '#F71963',
    textIcon: 'VTEX',
  },
  {
    id: 'react',
    name: 'React JS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/react/react-original.svg',
    color: '#61DAFB',
  },
  {
    id: 'html5',
    name: 'HTML5',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/html5/html5-original.svg',
    color: '#E34F26',
  },
  {
    id: 'css3',
    name: 'CSS3',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/css3/css3-original.svg',
    color: '#1572B6',
  },
  {
    id: 'scss',
    name: 'SCSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/sass/sass-original.svg',
    color: '#CC6699',
  },
  {
    id: 'js',
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/javascript/javascript-original.svg',
    color: '#F7DF1E',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/github/github-original.svg',
    color: '#ffffff',
  },
  {
    id: 'vscode',
    name: 'VS Code',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/vscode/vscode-original.svg',
    color: '#007ACC',
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/photoshop/photoshop-plain.svg',
    color: '#31A8FF',
  },
  {
    id: 'jira',
    name: 'JIRA',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@v2.15.1/icons/jira/jira-original.svg',
    color: '#0052CC',
  },
]

export default function TechStack() {
  return (
    <section
      id="stack"
      className="techstack section-wrapper reveal-section"
      aria-label="Mi stack tecnológico"
    >
      <h2 className="section-title">Mi Stack Tecnológico</h2>

      <div className="techstack__carousel gradient-overlay-wrapper">
        <Swiper
          modules={[Autoplay]}
          spaceBetween={20}
          loop={true}
          autoplay={{ delay: 1800, disableOnInteraction: false, pauseOnMouseEnter: true }}
          speed={600}
          breakpoints={{
            0: { slidesPerView: 2 },
            600: { slidesPerView: 3 },
            900: { slidesPerView: 4 },
            1100: { slidesPerView: 6 },
          }}
          className="techstack__swiper"
          aria-label="Tecnologías que manejo"
        >
          {TECH_ITEMS.map((tech) => (
            <SwiperSlide key={tech.id}>
              <div
                className="techstack__card"
                role="img"
                aria-label={tech.name}
              >
                <div className="techstack__icon-wrap" style={{ '--tech-color': tech.color }}>
                  {tech.icon ? (
                    <img
                      src={tech.icon}
                      alt={tech.name}
                      className="techstack__icon"
                      loading="lazy"
                      width="52"
                      height="52"
                    />
                  ) : (
                    <span className="techstack__text-icon" style={{ color: tech.color }}>
                      {tech.textIcon}
                    </span>
                  )}
                </div>
                <span className="techstack__name">{tech.name}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
