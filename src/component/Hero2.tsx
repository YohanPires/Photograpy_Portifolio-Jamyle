
import imgPrincipal from "../imagens/album1/vertical/img16.jpg";
import Button from "./button"

const Hero2 = () => {
  return (
    <section className="grid min-h-screen w-full grid-cols-2 bg-black">

      {/* Coluna esquerda — imagem */}
      <div className="relative h-64 w-full md:h-auto mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent">
        <img
          src= {imgPrincipal}
          alt="Foto principal"
          className="absolute inset-0 max-h-[90%] w-full object-cover"
        />
      </div>

      {/* Coluna direita — texto e botão*/}
      <div className="flex flex-col justify-center gap-8 px-10 py-16 md:px-16 lg:px-24">

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-6">

            <div className="text-[clamp(30px, 3.5vw, 150px)] text-white/90 font-serif">As Multiplas Faces Da Ansiedade</div>

            <div className="text-white/60 text-sm">
              When does a man die? When he is hit by a bullet? No! When he suffers a disease? No! When he ate a soup made out of a poisonous mushroom? No! A man dies when he is forgotten!</div>

              <Button
                label="Ver"
                href="#sobre"
                color="#612d53"
                textSize="0.75rem"
              />

          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero2;