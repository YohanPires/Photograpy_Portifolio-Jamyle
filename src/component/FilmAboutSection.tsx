import FotoPerfil from "../imagens/Props/CartazFilm.jpeg";

export default function FilmAboutSection() {
  return (
    <section
      id="aboutFilm"
      className="w-full min-h-screen bg-(--light) flex items-center justify-center px-[clamp(1rem,5vw,6rem)] py-[clamp(3rem,8vw,8rem)]"
    >
      <div className="w-full max-w-7xl grid lg:grid-cols-[420px_1fr] gap-[clamp(2rem,5vw,6rem)] items-center">

        {/* Cartaz */}
        <div className="relative overflow-hidden" style={{ borderRadius: "24px"}}>
          <img
            src={FotoPerfil}
            alt="Cartáz do filme"
            className="w-full h-full object-cover transition-all duration-700"
            style={{ filter: "grayscale(15%) brightness(0.90)" }}
            onMouseEnter={e => (e.currentTarget.style.filter = "grayscale(0%) brightness(1)")}
            onMouseLeave={e => (e.currentTarget.style.filter = "grayscale(15%) brightness(0.90)")}
          />
        </div>

        {/* Conteúdo */}
        <div className="flex flex-col justify-center">

          {/* Tag */}
          <div className="flex items-center gap-3 mb-4">
            <div style={{ width: "20px", height: "1px", background: "#612d53" }} />
            <span style={{
              fontSize: "9px",
              letterSpacing: "0.45em",
              textTransform: "uppercase",
              color: "#612d53", 
            }}>
              curta-metragem · 2026
            </span>
          </div>

          {/* Título */}
          <h2
            className="font-light tracking-wide text-black"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(2rem, 3.5vw, 4rem)",
              letterSpacing: "-0.01em",
              lineHeight: 1.1,
              fontStyle: "italic", 
              color: "black"
            }}
          >Viva e Tremeluzente
          </h2>

          {/* Linha divisória */}
          <div style={{
            marginTop: "28px",
            width: "48px",
            height: "1px",
            background: "rgba(10,10,10,0.12)",
          }} />

          {/* Sinopse */}
          <p
            className="mt-8 max-w-xl"
            style={{
              lineHeight: 2,
              color: "rgba(10,10,10,0.45)",
              fontSize: "clamp(.95rem, .8rem + .3vw, 1.05rem)",
              fontWeight: 300,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Consequuntur rerum aspernatur quas sint molestiae ipsam
            reprehenderit omnis. Possimus, aspernatur architecto.
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Officia laboriosam vitae accusamus.
          </p>

          {/* Ficha técnica */}
          <div
            className="mt-10 flex flex-col gap-0"
            style={{ borderTop: "1px solid rgba(10,10,10,0.08)" }}
          >
            {[
              { label: "gênero",    value: "Drama" },
              { label: "formato",   value: "Curta-metragem" },
              { label: "duração",   value: "15 minutos" },
              { label: "ano",       value: "2026" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between items-center py-4"
                style={{ borderBottom: "1px solid rgba(10,10,10,0.08)" }}
              >
                <span style={{
                  fontSize: "9px",
                  letterSpacing: "0.35em",
                  textTransform: "uppercase",
                  color: "rgba(10,10,10,0.3)",
                }}>
                  {label}
                </span>
                <span style={{
                  fontSize: "12px",
                  letterSpacing: "0.08em",
                  color: "rgba(10,10,10,0.7)",
                  fontWeight: 300,
                }}>
                  {value}
                </span>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}