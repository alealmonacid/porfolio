import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import './BlogArticle.css'

export default function BlogArticle({ article, onBack }) {
  const pageRef = useRef(null)
  const [active, setActive] = useState(false)

  // ponytail: standard CSS transitions instead of GSAP
  useEffect(() => {
    window.scrollTo(0, 0)
    const raf = requestAnimationFrame(() => setActive(true))
    return () => cancelAnimationFrame(raf)
  }, [])

  const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div
      className="blog-article-page"
      ref={pageRef}
      style={{
        opacity: active ? 1 : 0,
        transform: `translate3d(0, ${active ? 0 : '30px'}, 0)`,
        transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label={`Artículo: ${article.title}`}
    >

      {/* Fixed top bar */}
      <header className="article-topbar">
        <button
          className="article-topbar__back"
          onClick={onBack}
          aria-label="Volver al portfolio"
          id="article-back-btn"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver al portfolio
        </button>
        <div className="article-topbar__brand">AA</div>
      </header>

      {/* Hero image + title */}
      <div
        className="article-hero"
        style={{ backgroundImage: `url(${article.image})` }}
        role="img"
        aria-label={`Imagen de portada: ${article.title}`}
      >
        <div className="article-hero__overlay">
          <div className="article-hero__content">
            <span className="article-hero__category">{article.category}</span>
            <h1 className="article-hero__title" itemProp="headline">
              {article.title}
            </h1>
            <div className="article-hero__meta">
              <span className="article-hero__author">Por {article.author}</span>
              <span className="article-hero__sep" aria-hidden="true">·</span>
              <time dateTime={article.date} className="article-hero__date">
                {formatDate(article.date)}
              </time>
              <span className="article-hero__sep" aria-hidden="true">·</span>
              <span className="article-hero__read-time">{article.read_time} de lectura</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article content */}
      <main
        className="article-content"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        <meta itemProp="author" content={article.author} />
        <meta itemProp="datePublished" content={article.date} />
        <meta itemProp="keywords" content={article.keywords?.join(', ')} />
        <meta itemProp="image" content={article.image} />

        {/* Lead excerpt */}
        <p className="article__lead" itemProp="description">
          {article.excerpt}
        </p>

        <div className="article__divider" aria-hidden="true"></div>

        {/* Markdown body */}
        <div className="article__body markdown-body" itemProp="articleBody">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              h2: ({ children }) => <h2 className="md-h2">{children}</h2>,
              h3: ({ children }) => <h3 className="md-h3">{children}</h3>,
              p: ({ children }) => <p className="md-p">{children}</p>,
              ul: ({ children }) => <ul className="md-ul">{children}</ul>,
              ol: ({ children }) => <ol className="md-ol">{children}</ol>,
              li: ({ children }) => <li className="md-li">{children}</li>,
              blockquote: ({ children }) => <blockquote className="md-blockquote">{children}</blockquote>,
              pre: ({ children }) => <pre className="md-pre">{children}</pre>,
              code: ({ inline, children }) =>
                inline
                  ? <code className="md-code-inline">{children}</code>
                  : <code className="md-code-block">{children}</code>,
              table: ({ children }) => (
                <div className="md-table-wrap">
                  <table className="md-table">{children}</table>
                </div>
              ),
              th: ({ children }) => <th className="md-th">{children}</th>,
              td: ({ children }) => <td className="md-td">{children}</td>,
              a: ({ href, children }) => (
                <a href={href} className="md-link" target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
              strong: ({ children }) => <strong className="md-strong">{children}</strong>,
              em: ({ children }) => <em className="md-em">{children}</em>,
              hr: () => <hr className="md-hr" />,
            }}
          >
            {article.content}
          </ReactMarkdown>
        </div>

        {/* Keyword tags */}
        {article.keywords && (
          <div className="article__tags">
            <span className="article__tags-label">Tags:</span>
            {article.keywords.map((kw) => (
              <span key={kw} className="article__tag">{kw}</span>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="article-footer">
        <button
          className="article-footer__back"
          onClick={onBack}
          aria-label="Volver al portfolio"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
            strokeLinejoin="round" aria-hidden="true">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Volver al portfolio
        </button>
        <p className="article-footer__credit">
          Escrito por <strong>Alejandro Almonacid</strong>
        </p>
      </footer>
    </div>
  )
}
