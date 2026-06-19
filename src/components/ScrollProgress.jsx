import { useEffect, useRef, useState } from 'react'
import './ScrollProgress.css'

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      if (barRef.current) {
        barRef.current.style.width = `${progress}%`
      }
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress()

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="scroll-progress-track" role="progressbar" aria-label="Progreso de lectura" aria-valuemin="0" aria-valuemax="100">
      <div className="scroll-progress-bar" ref={barRef} />
    </div>
  )
}
