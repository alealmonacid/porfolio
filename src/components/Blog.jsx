import { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import './Blog.css'

export default function Blog({ onArticleClick }) {
  const [articles, setArticles] = useState([])

  useEffect(() => {
    fetch('/data/blog.json')
      .then((r) => r.json())
      .then(setArticles)
      .catch(() => setArticles([]))
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <section
      id="blog"
      className="blog section-wrapper reveal-section"
      aria-label="Blog de Alejandro Almonacid"
    >
      <h2 className="section-title">Blog</h2>
      <p className="blog__subtitle">
        Artículos sobre desarrollo web, tecnología, gaming y experiencias profesionales.
      </p>

      <div className="blog__slider gradient-overlay-wrapper">
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={24}
          loop={articles.length > 3}
          navigation={{
            nextEl: '.blog__btn-next',
            prevEl: '.blog__btn-prev',
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0:    { slidesPerView: 1 },
            768:  { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="blog__swiper"
          aria-label="Slider de artículos del blog"
        >
          {articles.map((article) => (
            <SwiperSlide key={article.id}>
              <article
                className="blog-card"
                role="button"
                tabIndex={0}
                aria-label={`Leer artículo: ${article.title}`}
                onClick={() => onArticleClick(article)}
                onKeyDown={(e) => e.key === 'Enter' && onArticleClick(article)}
                itemScope
                itemType="https://schema.org/BlogPosting"
              >
                <meta itemProp="author" content={article.author} />
                <meta itemProp="datePublished" content={article.date} />
                <meta itemProp="keywords" content={article.keywords?.join(', ')} />

                {/* Image */}
                <div className="blog-card__image-wrap">
                  <img
                    src={article.image}
                    alt={`Imagen del artículo: ${article.title}`}
                    className="blog-card__image"
                    loading="lazy"
                    itemProp="image"
                  />
                  <div className="blog-card__image-overlay"></div>

                  {/* Category badge on image */}
                  <span className="blog-card__category" aria-label={`Categoría: ${article.category}`}>
                    {article.category}
                  </span>
                </div>

                {/* Body */}
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <time
                      className="blog-card__date"
                      dateTime={article.date}
                      itemProp="datePublished"
                    >
                      {formatDate(article.date)}
                    </time>
                    <span className="blog-card__separator" aria-hidden="true">·</span>
                    <span className="blog-card__read-time">{article.read_time}</span>
                  </div>

                  <h3 className="blog-card__title" itemProp="headline">
                    {article.title}
                  </h3>

                  <p className="blog-card__excerpt" itemProp="description">
                    {article.excerpt}
                  </p>

                  <span className="blog-card__cta" aria-hidden="true">
                    Leer más
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                      strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </span>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom nav buttons */}
        <button className="blog__btn blog__btn-prev" aria-label="Artículo anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
        <button className="blog__btn blog__btn-next" aria-label="Artículo siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </button>
      </div>
    </section>
  )
}
