import { useEffect } from 'react'
import alojoLogo from '../assets/alejo_logo.svg'
import './Loader.css'

export default function Loader({ onComplete }) {
  // ponytail: native CSS animations instead of GSAP timelines
  useEffect(() => {
    const timer = setTimeout(onComplete, 3100)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <div className="loader-overlay">
      <div className="loader-content">
        <img 
          src={alojoLogo} 
          alt="Cargando - Alejandro Almonacid" 
          className="loader-logo"
        />
      </div>
    </div>
  )
}
