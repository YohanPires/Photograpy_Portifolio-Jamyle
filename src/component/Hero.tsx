import { useEffect, useRef, useState } from 'react'
import DarkVeil from './DarkVeil.js'
import Jamyle from '../imagens/Props/jamyle.svg'
import Fernandes from '../imagens/Props/Fernandes.svg'

export default function Hero() {
  const veilRef    = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY]   = useState(0)
  const [mounted, setMounted]   = useState(false) // <- controla fade in inicial

  useEffect(() => {
    // pequeno delay para a animação ser visível
    const t = setTimeout(() => setMounted(true), 100)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    let raf: number
    let lastY = 0
    const onScroll = () => {
      lastY = window.scrollY
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => setScrollY(lastY))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  const nome      = Jamyle
  const sobrenome = Fernandes

  const vh = typeof window !== 'undefined' ? window.innerHeight : 900
  const veilY          = scrollY * 0.9
  const contentY       = scrollY * 0.6
  const contentOpacity = Math.max(0, 1 - scrollY / (vh * 0.45))

  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }} id="hero">

      <div ref={veilRef} style={{ position: 'absolute', inset: 0, top: '-20%', height: '120%', transform: `translateY(${veilY}px)`, willChange: 'transform', zIndex: 0 }}>
        <DarkVeil hueShift={0} 
        noiseIntensity={0.00} 
        scanlineIntensity={0.0} 
        speed={0.8} 
        scanlineFrequency={0} 
        warpAmount={5} />
      </div>

      <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, transparent 50%, rgba(10,10,10,0.6) 100%)', pointerEvents: 'none' }} />

      <div
        ref={contentRef}
        style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '1.6rem',
          transform: `translateY(${contentY}px)`,
          opacity: contentOpacity,
          willChange: 'transform, opacity',
          pointerEvents: contentOpacity < 0.05 ? 'none' : 'auto',
        }}
      >
        {/* eyebrow — entra primeiro */}
        <p
          className="hero-eyebrow"
          style={{
            margin: 0, // <- remove margin padrão do browser
            transition: 'opacity 800ms ease, transform 800ms ease',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(5px)',
          }}
        >
          Fotografia
        </p>
        
        {/* bloco nome + linha + sobrenome */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <img
            src={nome}
            alt="nome"
            className="w-80 h-auto"
            style={{
              transition: 'opacity 900ms ease 200ms, transform 900ms ease 200ms',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            }}
          />

          {/* linha centralizada com translateX */}
          <div style={{ width: '100%', display: 'flex', justifyContent: 'center', overflow: 'visible' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              height="1"
              viewBox="0 0 500 1"
              preserveAspectRatio="none"
              style={{
                transition: 'opacity 900ms ease 350ms',
                opacity: mounted ? 1 : 0,
              }}
            >
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#612D53" stopOpacity="0" />
                  <stop offset="30%"  stopColor="#612D53" stopOpacity="1" />
                  <stop offset="50%"  stopColor="#C75CAA" stopOpacity="1" />
                  <stop offset="70%"  stopColor="#612D53" stopOpacity="1" />
                  <stop offset="100%" stopColor="#612D53" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect width="500" height="2" fill="url(#lineGradient)" />
            </svg>
          </div>

          <img
            src={sobrenome}
            alt="sobrenome"
            className="w-64 h-auto"
            style={{
              transition: 'opacity 900ms ease 500ms, transform 900ms ease 500ms',
              opacity: mounted ? 1 : 0,
              transform: mounted ? 'translateY(0)' : 'translateY(12px)',
            }}
          />
        </div>

        {/* subtítulo — entra por último */}
        <p
          className="hero-sub-eyebrow"
          style={{
            margin: 0, // <- remove margin padrão do browser
            transition: 'opacity 800ms ease 650ms, transform 800ms ease 650ms',
            opacity: mounted ? 1 : 0,
            transform: mounted ? 'translateY(0)' : 'translateY(12px)',
          }}
        >
          Belo Horizonte · MG
        </p>
      </div>
    </section>
  )
}