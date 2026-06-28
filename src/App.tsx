import './index.css'

import Navbar              from './component/Navbar'
import Hero                from './component/Hero'
import Skiper30            from './component/skiper30'
import HeroFilm            from './component/ParallaxHeroFilm'
import FilmAboutSection    from './component/FilmAboutSection'
import ProductSection      from './component/ProductSection'
//import PhotoGallerySlider  from './component/PhotoGallerySlider'
//import Carrossel           from './component/PhotoCarrosel'
import ContactSection      from './component/ContactSection'


export default function App() {

  return (
    <>
          <Navbar/>
          <Hero />
          <Skiper30/>
          <ProductSection/>
          <HeroFilm/>
          <FilmAboutSection/>
          <ContactSection/>
    </>
  )
}
