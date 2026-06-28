import { useEffect, useState } from 'react'
import Logo from '../imagens/Props/LogotipoBranco.png'
import ButtonNav from './ButtonNavbar'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      {/* Logo */}
      <img
        src={Logo}
        alt="ícone"
        className="w-10 h-10 opacity-70 hover:opacity-100 duration-200"
      />

      {/* CTA */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop:'5px' }}>
        <ButtonNav
          label="Portfólio"
          onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <ButtonNav
          label="Sobre"
          onClick={() => document.getElementById('sobre')?.scrollIntoView({ behavior: 'smooth' })}
        />
        <ButtonNav
          label="Contato"
          onClick={() => document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })}
        />
      </div>
    </nav>
  )
}