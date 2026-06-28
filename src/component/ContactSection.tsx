import {
  FaArrowUp,
} from "react-icons/fa";

import FotoPerfil from "../imagens/Props/Perfil.jpeg";
import Icontip from "./StyledIcon";
import {BeamBackground} from "./beam-background"

export default function ContactSection() {
  return (
    <section
      id="contato"
      className="w-full bg-black border-t border-zinc-900"
    >
      {/* ===================== */}
      {/* SOBRE */}
      {/* ===================== */}

      <div className="grid lg:grid-cols-[380px_1fr]">
        



        {/* Foto */}

        <div className="relative overflow-hidden h-130">

          <img
            src={FotoPerfil}
            alt="Jamyle Fernandes"
            className="
              w-full
              h-full
              object-cover
              brightness-75
              transition-all
              duration-700
              hover:scale-105
              hover:brightness-100
            "
          />

          <div className="absolute inset-0 bg-black/20" />

        </div>

        {/* Texto */}
        <BeamBackground numBeams={8}>

        <div className="flex flex-col justify-center px-[clamp(2rem,5vw,6rem)] py-[clamp(3rem,5vw,6rem)]">

          <h2 className="text-white tracking-[0.3em] text-xl font-light">
            Jamyle Fernandes
          </h2>

          <p className="mt-4 uppercase tracking-[0.35em] text-xs text-zinc-500">
            Fotógrafa & Cineasta
          </p>

          <p className="mt-12 max-w-xl leading-8 text-zinc-400">
            Lorem Ipsum is simply dummy text of the printing and
            typesetting industry. Lorem Ipsum has been the industry's
            standard dummy text ever since 1966.
          </p>

        </div>
        </BeamBackground>
      </div>

      {/* CONTATO */}
      <div
        className="
        relative
        py-16
        flex
        flex-col
        gap-3
        items-center
        bg-linear-to-r
        to-zinc-900
      "
      >

        <span className="felx relative uppercase tracking-[0.2em] text-xs text-white">
          Contato
        </span>

        <p className="mt-8 text-sm text-white">
          jamylecarvalho5@gmail.com
        </p>

        <p className="mt-4 text-sm text-white mb-9">
          (31) 99603-9986
        </p>

        {/* Redes */}

        <div className="flex gap-8 mt-10 text-2xl">

          <Icontip />

        </div>

        {/* Botão subir */}

        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }
          className="
            absolute
            right-8
            bottom-8
            w-12
            h-12
            rounded-full
            bg-black
            flex
            items-center
            justify-center
            hover:scale-110
            transition
          "
        >
          <FaArrowUp />
        </button>

      </div>

      {/* ===================== */}
      {/* FOOTER */}

      <footer
        className="
          h-10
          py-15
          px-15
          flex
          items-center
          justify-center
          text-[10px]
          tracking-[0.2em]
          text-zinc-500
        "
      >

        <span>© 2026 Todos os direitos reservados.</span>

      </footer>

    </section>
  );
}