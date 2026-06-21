import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './TechStack.css'

const iconStyle = { width: '44px', height: '44px', display: 'block' }

const TECH_ITEMS = [
  {
    id: 'vtex',
    name: 'VTEX',
    color: '#F71963',
    textIcon: 'VTEX',
  },
  {
    id: 'react',
    name: 'React JS',
    color: '#61DAFB',
    icon: (
      <svg style={iconStyle} viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="#61DAFB" strokeWidth="1.2">
        <circle r="2.05" fill="#61DAFB"/>
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </svg>
    ),
  },
  {
    id: 'html5',
    name: 'HTML5',
    color: '#E34F26',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#E34F26">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.3 5.6H5.2l.4 4.5h12.5l-.4 4.8-5.7 1.9-5.7-1.9-.3-3h3.5l.2 1.3 2.3.8 2.3-.8.2-2.3H5.8L5 5.6h13.8z"/>
      </svg>
    ),
  },
  {
    id: 'css3',
    name: 'CSS3',
    color: '#1572B6',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#1572B6">
        <path d="M1.5 0h21l-1.9 21.2L12 24l-8.6-2.8L1.5 0zm17.1 5.6H8.3l-.2-2h10.8l-.2-2H5.7l.6 6.3h10.5l-.4 4.3-4.4 1.5-4.4-1.5-.2-2.3H5.2l.4 4.5 6.4 2.1 6.4-2.1.8-8.3z"/>
      </svg>
    ),
  },
  {
    id: 'scss',
    name: 'SCSS',
    color: '#CC6699',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#CC6699">
        <path d="M12.012 0C7.29 0 3.75 3.327 3.75 7.973c0 4.148 2.766 6.07 4.966 7.426.33.203.659.407.954.618-2.38.384-5.32 1.503-5.32 4.417 0 2.215 1.765 3.566 4.792 3.566 4.887 0 8.016-3.32 8.016-8.082 0-3.662-2.072-5.46-4.512-6.953a15.42 15.42 0 0 0-.96-.549c1.996-.217 4.48-.992 4.48-3.791 0-2.316-1.585-4.632-4.154-4.632zm-.23 1.947c1.378 0 2.247 1.34 2.247 2.684 0 2.052-1.859 2.457-3.723 2.607.728-.887 1.476-2.43 1.476-3.864 0-1.12-.46-1.427-.001-1.427zM9.467 9.873c2.093 1.285 3.843 2.7 3.843 5.485 0 2.721-1.821 4.582-4.413 4.582-1.396 0-2.336-.713-2.336-1.802 0-1.745 2.146-2.42 4.536-2.736-.339-.533-.761-1.018-1.258-1.547-.936-.998-1.884-2.012-1.884-3.666 0-.821.14-1.542.42-2.14 1.092 1.824 2.094 3.018 2.094 3.018z"/>
      </svg>
    ),
  },
  {
    id: 'js',
    name: 'JavaScript',
    color: '#F7DF1E',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#F7DF1E">
        <path d="M0 0h24v24H0V0zm20.2 16.9c-.8-.5-1.4-.8-2-.8-.6 0-1 .2-1 .7 0 .5.3.7 1.1 1.1 1.6.8 2.7 1.4 2.7 3.3 0 2.1-1.7 3.3-4.1 3.3-2.3 0-3.6-1.1-4.2-2.3l2-1.2c.4.7.9 1.4 2.1 1.4 1 0 1.5-.5 1.5-1.1 0-.7-.4-1-1.4-1.5-1.5-.7-2.4-1.4-2.4-3.2 0-2 1.6-3.1 3.8-3.1 1.7 0 3 .8 3.7 2.1l-1.9 1.1zM11.9 11v11h-2.5v-2.3c-.6.8-1.5 1.5-2.9 1.5-2.5 0-3.9-1.9-3.9-4.8s1.4-4.8 3.9-4.8c1.4 0 2.3.7 2.9 1.5V11h2.5zm-2.5 6.6c0-1.6-.7-2.6-2-2.6s-2 1-2 2.6.7 2.6 2 2.6 2-1 2-2.6z"/>
      </svg>
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    color: '#ffffff',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#ffffff">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.11.82-.26.82-.577v-2.234c-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.82 1.102.82 2.222v3.293c0 .319.22.694.825.576C20.565 21.795 24 17.3 24 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    ),
  },
  {
    id: 'vscode',
    name: 'VS Code',
    color: '#007ACC',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#007ACC">
        <path d="M23.985 6.804L18.423.86a1.363 1.363 0 0 0-1.848-.1l-7.397 5.485L4.1 2.502a1.023 1.023 0 0 0-1.42.062L.21 5.378a.959.959 0 0 0-.012 1.378l3.655 3.247L.203 13.25a.959.959 0 0 0 .012 1.378l2.47 2.812a1.023 1.023 0 0 0 1.42.063l5.078-3.743 7.397 5.485a1.363 1.363 0 0 0 1.848-.1l5.562-5.944a1.272 1.272 0 0 0 0-1.78l-4.526-4.01 4.526-4.01a1.272 1.272 0 0 0 0-1.78zm-8.874 5.2l-3.328-2.617 3.328-2.617v5.234z"/>
      </svg>
    ),
  },
  {
    id: 'photoshop',
    name: 'Photoshop',
    color: '#31A8FF',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24">
        <rect width="24" height="24" rx="4" fill="#001829" stroke="#31A8FF" strokeWidth="1.5"/>
        <text x="5" y="17" fill="#31A8FF" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="13px">Ps</text>
      </svg>
    ),
  },
  {
    id: 'jira',
    name: 'JIRA',
    color: '#0052CC',
    icon: (
      <svg style={iconStyle} viewBox="0 0 24 24" fill="#0052CC">
        <path d="M11.53 2c0 2.274-1.844 4.12-4.12 4.12H5.37V2h6.16zm0 6.64c0 2.274-1.844 4.12-4.12 4.12H5.37V8.64h6.16zm0 6.64c0 2.274-1.844 4.12-4.12 4.12H5.37v-4.12h6.16zM18.63 8.64c0 2.274-1.844 4.12-4.12 4.12H12.47V8.64h6.16zm0 6.64c0 2.274-1.844 4.12-4.12 4.12H12.47v-4.12h6.16zM24 15.28c0 2.274-1.844 4.12-4.12 4.12h-2.04v-4.12H24v4.12z"/>
      </svg>
    ),
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
                    <span className="techstack__icon" style={{ color: tech.color }}>
                      {tech.icon}
                    </span>
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
