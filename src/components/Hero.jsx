import { useEffect, useRef, useState } from 'react'
import './Hero.css'

const WORDS = ['Front End Dev', 'TCG Player', 'Community Manager', 'Gamer']
const TYPE_SPEED = 80
const DELETE_SPEED = 45
const PAUSE_AFTER_WORD = 2200
const PAUSE_BEFORE_TYPE = 400

export default function Hero() {
  const [displayText, setDisplayText] = useState('')
  const [wordIndex, setWordIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentWord = WORDS[wordIndex]

    if (isPaused) return

    if (!isDeleting && displayText === currentWord) {
      // Finished typing — pause before delete
      setIsPaused(true)
      timeoutRef.current = setTimeout(() => {
        setIsPaused(false)
        setIsDeleting(true)
      }, PAUSE_AFTER_WORD)
      return
    }

    if (isDeleting && displayText === '') {
      // Finished deleting — pause, then type next word
      setIsPaused(true)
      timeoutRef.current = setTimeout(() => {
        setIsDeleting(false)
        setWordIndex((prev) => (prev + 1) % WORDS.length)
        setIsPaused(false)
      }, PAUSE_BEFORE_TYPE)
      return
    }

    const speed = isDeleting ? DELETE_SPEED : TYPE_SPEED

    timeoutRef.current = setTimeout(() => {
      setDisplayText(
        isDeleting
          ? currentWord.slice(0, displayText.length - 1)
          : currentWord.slice(0, displayText.length + 1)
      )
    }, speed)

    return () => clearTimeout(timeoutRef.current)
  }, [displayText, isDeleting, wordIndex, isPaused])

  return (
    <section id="inicio" className="hero" aria-label="Sección de presentación">
      {/* Subtle grid / noise background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__bg-grid"></div>
        <div className="hero__bg-glow"></div>
      </div>

      <div className="hero__content">
        <p className="hero__greeting">Hola soy</p>
        <h1 className="hero__name">
          Alejandro<br />Almonacid
        </h1>
        <div className="hero__role" aria-live="polite" aria-label={`Rol: ${displayText}`}>
          <span className="hero__role-text">{displayText}</span>
          <span className="hero__cursor" aria-hidden="true">|</span>
        </div>
      </div>

      {/* Bottom gradient overlay */}
      <div className="hero__gradient-bottom" aria-hidden="true"></div>
    </section>
  )
}
