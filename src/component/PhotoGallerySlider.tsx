import { useState, useEffect, useCallback } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface SlideData {
  id: number;
  serie: string;
  title: string;
  description: string;
  image: string;
  thumbs: string[];
}

interface PhotoGallerySliderProps {
  /** Slides to display */
  slides: SlideData[];
  /** Top label text */
  topLabel?: string;
  /** If true, image is on the RIGHT and text on the LEFT */
  reverse?: boolean;
}

type SlideState = "entering" | "active" | "exiting";

// ─── Shared CSS (injected once) ───────────────────────────────────────────────
const SHARED_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Inter:wght@300;400&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  .pg-root {
    background: #0e0e0e;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 24px;
    color: #e0e0e0;
  }

  .pg-inner {
    width: 100%;
    max-width: 880px;
  }

  .pg-top-label {
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    letter-spacing: 0.3em;
    color: #888;
    text-transform: uppercase;
    margin-bottom: 32px;
  }

  /* reverse: right-align label */
  .pg-root.pg-reversed .pg-top-label {
    text-align: right;
  }

  .pg-main-layout {
    display: flex;
    gap: 48px;
    align-items: flex-start;
  }

  /* Image side */
  .pg-image-side {
    flex: 0 0 auto;
    width: 280px;
  }

  .pg-image-frame {
    position: relative;
    width: 100%;
    height: 360px;
    overflow: hidden;
    border-radius: 2px;
  }

  .pg-main-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transform-origin: center;
  }

  .pg-corner-tl {
    position: absolute;
    top: -1px; left: -1px;
    width: 24px; height: 24px;
    border-top: 1px solid #c07a7a;
    border-left: 1px solid #c07a7a;
    z-index: 2;
  }
  .pg-corner-br {
    position: absolute;
    bottom: -1px; right: -1px;
    width: 24px; height: 24px;
    border-bottom: 1px solid #c07a7a;
    border-right: 1px solid #c07a7a;
    z-index: 2;
  }

  /* Text side */
  .pg-text-side {
    flex: 1;
    padding-top: 8px;
  }

  /* reversed: right-align text */
  .pg-root.pg-reversed .pg-text-side {
    text-align: right;
  }

  .pg-serie-label {
    font-family: 'Inter', sans-serif;
    font-size: 9px;
    letter-spacing: 0.3em;
    color: #888;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  .pg-slide-title {
    font-family: 'Cormorant Garamond', serif;
    font-size: 28px;
    font-weight: 300;
    color: #c07a7a;
    margin-bottom: 20px;
    line-height: 1.2;
  }

  .pg-slide-description {
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-weight: 300;
    line-height: 1.85;
    color: #aaa;
    max-width: 300px;
  }

  /* reversed: align description to right edge */
  .pg-root.pg-reversed .pg-slide-description {
    margin-left: auto;
  }

  .pg-ver-btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    margin-top: 32px;
    padding: 10px 22px;
    border: 1px solid #333;
    border-radius: 2px;
    background: transparent;
    color: #ccc;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.2em;
    cursor: pointer;
    text-transform: uppercase;
    transition: border-color 0.3s, color 0.3s, background 0.3s;
  }
  .pg-ver-btn:hover {
    border-color: #c07a7a;
    color: #c07a7a;
    background: rgba(192,122,122,0.06);
  }
  .pg-ver-btn svg { transition: transform 0.3s; }
  .pg-ver-btn:hover svg { transform: translateX(4px); }

  /* reversed: flip arrow direction */
  .pg-root.pg-reversed .pg-ver-btn {
    flex-direction: row-reverse;
  }
  .pg-root.pg-reversed .pg-ver-btn:hover svg {
    transform: translateX(-4px);
  }

  .pg-counter {
    font-family: 'Cormorant Garamond', serif;
    font-size: 13px;
    color: #444;
    margin-top: 48px;
    letter-spacing: 0.15em;
  }
  .pg-counter span { color: #c07a7a; }

  /* Thumbnails */
  .pg-thumbs-row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 32px;
  }

  .pg-arrow-btn {
    background: none;
    border: none;
    cursor: pointer;
    color: #555;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.25s, background 0.25s;
    flex-shrink: 0;
  }
  .pg-arrow-btn:hover {
    color: #c07a7a;
    background: rgba(192,122,122,0.08);
  }

  .pg-thumbs-list {
    display: flex;
    gap: 10px;
    flex: 1;
    justify-content: center;
  }

  .pg-thumb-item {
    width: 110px;
    height: 76px;
    overflow: hidden;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    flex-shrink: 0;
  }

  .pg-thumb-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease, filter 0.4s ease;
    filter: brightness(0.5) saturate(0.7);
  }
  .pg-thumb-item.pg-active img,
  .pg-thumb-item:hover img {
    filter: brightness(0.85) saturate(1);
    transform: scale(1.06);
  }
  .pg-thumb-item.pg-active::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 2px;
    background: #c07a7a;
  }

  .pg-divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, #2a2a2a, transparent);
    margin: 28px 0;
  }

  /* Section separator between two instances */
  .pg-section-sep {
    height: 1px;
    background: linear-gradient(90deg, transparent, #c07a7a33, transparent);
    max-width: 880px;
    width: 100%;
    margin: 0 auto;
  }
`;

let cssInjected = false;
function injectSharedCSS() {
  if (cssInjected || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = SHARED_CSS;
  document.head.appendChild(tag);
  cssInjected = true;
}

// ─── Component ────────────────────────────────────────────────────────────────
export function PhotoGallerySlider({
  slides,
  topLabel = "Portfólio — Ensaios Femininos",
  reverse = false,
}: PhotoGallerySliderProps) {
  injectSharedCSS();

  const [current, setCurrent] = useState(0);
  const [slideState, setSlideState] = useState<SlideState>("active");
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [activeThumb, setActiveThumb] = useState(0);

  const goTo = useCallback(
    (index: number, dir: "next" | "prev") => {
      if (slideState !== "active") return;
      setDirection(dir);
      setSlideState("exiting");
      setTimeout(() => {
        setCurrent(index);
        setActiveThumb(0);
        setSlideState("entering");
        setTimeout(() => setSlideState("active"), 50);
      }, 420);
    },
    [slideState]
  );

  const next = useCallback(() => goTo((current + 1) % slides.length, "next"), [current, goTo, slides.length]);
  const prev = useCallback(() => goTo((current - 1 + slides.length) % slides.length, "prev"), [current, goTo, slides.length]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const slide = slides[current];

  const imgTranslate =
    slideState === "exiting"
      ? direction === "next" ? "-6%" : "6%"
      : slideState === "entering"
      ? direction === "next" ? "6%" : "-6%"
      : "0%";

  const textTranslate =
    slideState === "exiting"
      ? direction === "next" ? "-20px" : "20px"
      : slideState === "entering"
      ? direction === "next" ? "20px" : "-20px"
      : "0px";

  const opacity = slideState === "active" ? 1 : 0;

  const imageBlock = (
    <div className="pg-image-side">
      <div className="pg-image-frame">
        <div className="pg-corner-tl" />
        <div className="pg-corner-br" />
        <img
          key={slide.id}
          className="pg-main-image"
          src={slide.image}
          alt={slide.title}
          style={{
            opacity,
            transform: `translateX(${imgTranslate}) scale(${slideState === "active" ? 1 : 1.03})`,
            transition:
              slideState === "active"
                ? "opacity 0.5s ease, transform 0.55s ease"
                : "opacity 0.38s ease, transform 0.38s ease",
          }}
        />
      </div>
    </div>
  );

  const textBlock = (
    <div className="pg-text-side">
      <p
        className="pg-serie-label"
        style={{
          opacity,
          transform: `translateY(${textTranslate})`,
          transition: "opacity 0.45s ease 0.05s, transform 0.45s ease 0.05s",
        }}
      >
        {slide.serie}
      </p>
      <h2
        className="pg-slide-title"
        style={{
          opacity,
          transform: `translateY(${textTranslate})`,
          transition: "opacity 0.45s ease 0.1s, transform 0.45s ease 0.1s",
        }}
      >
        {slide.title}
      </h2>
      <p
        className="pg-slide-description"
        style={{
          opacity,
          transform: `translateY(${textTranslate})`,
          transition: "opacity 0.45s ease 0.15s, transform 0.45s ease 0.15s",
        }}
      >
        {slide.description}
      </p>

      <button
        className="pg-ver-btn"
        style={{ opacity, transition: "opacity 0.45s ease 0.2s" }}
      >
        Ver
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M1 7h12M8 3l5 4-5 4"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <p className="pg-counter">
        <span>{String(current + 1).padStart(2, "0")}</span> /{" "}
        {String(slides.length).padStart(2, "0")}
      </p>
    </div>
  );

  return (
    <div className={`pg-root${reverse ? " pg-reversed" : ""}`}>
      <div className="pg-inner">
        <p className="pg-top-label">{topLabel}</p>

        <div className="pg-main-layout">
          {reverse ? (
            <>
              {textBlock}
              {imageBlock}
            </>
          ) : (
            <>
              {imageBlock}
              {textBlock}
            </>
          )}
        </div>

        <div className="pg-divider" />

        <div className="pg-thumbs-row">
          <button className="pg-arrow-btn" onClick={prev} aria-label="Anterior">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9l5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="pg-thumbs-list">
            {slide.thumbs.map((src, i) => (
              <div
                key={i}
                className={`pg-thumb-item${activeThumb === i ? " pg-active" : ""}`}
                onClick={() => setActiveThumb(i)}
              >
                <img src={src} alt={`Thumbnail ${i + 1}`} />
              </div>
            ))}
          </div>

          <button className="pg-arrow-btn" onClick={next} aria-label="Próximo">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4l5 5-5 5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Demo: two instances side by side on the page ────────────────────────────
const slidesA: SlideData[] = [
  {
    id: 1,
    serie: "SÉRIE I",
    title: "Luz Natural",
    description:
      "A luz do sol toca cada detalhe com delicadeza, revelando a beleza que sempre esteve lá — esperando apenas o momento certo para ser capturada.",
    image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=70",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=70",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=70",
    ],
  },
  {
    id: 2,
    serie: "SÉRIE II",
    title: "Olhar Presente",
    description:
      "Cada quadro guarda um instante único — aquele segundo em que o mundo parou e tudo o que existia era a conexão entre a câmera e a alma.",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=70",
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=70",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=70",
    ],
  },
  {
    id: 3,
    serie: "SÉRIE III",
    title: "Silêncio Vivo",
    description:
      "No silêncio entre os cliques, a vida pulsa. Fotografar é aprender a escutar com os olhos e falar sem palavras.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&q=70",
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200&q=70",
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=70",
    ],
  },
];

const slidesB: SlideData[] = [
  {
    id: 1,
    serie: "SÉRIE IV",
    title: "Sombra e Forma",
    description:
      "Entre a luz e a escuridão nasce o contorno — a silhueta que define sem revelar tudo, convidando o olhar a imaginar o que não é mostrado.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=70",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=70",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=70",
    ],
  },
  {
    id: 2,
    serie: "SÉRIE V",
    title: "Movimento Suspenso",
    description:
      "O obturador paralisa o que os olhos nunca veriam — um gesto, um sopro, um sorriso a meio caminho. A fotografia é o museu do efêmero.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=70",
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=70",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=70",
    ],
  },
  {
    id: 3,
    serie: "SÉRIE VI",
    title: "Presença",
    description:
      "Estar presente é o primeiro ato criativo. Todo o resto — a lente, a luz, o enquadramento — é apenas o idioma em que essa presença é traduzida.",
    image: "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=600&q=85",
    thumbs: [
      "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=200&q=70",
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=200&q=70",
      "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=200&q=70",
    ],
  },
];

export default function App() {
  return (
    <div style={{ background: "#0e0e0e" }}>
      {/* Instance 1 — normal: image LEFT, text RIGHT */}
      <PhotoGallerySlider
        slides={slidesA}
        topLabel="Portfólio — Ensaios Femininos"
        reverse={false}
      />

      {/* Thin separator between instances */}
      <div
        style={{
          height: "1px",
          background: "linear-gradient(90deg, transparent, #c07a7a44, transparent)",
          maxWidth: "880px",
          margin: "0 auto",
        }}
      />

      {/* Instance 2 — reversed: text LEFT, image RIGHT */}
      <PhotoGallerySlider
        slides={slidesB}
        topLabel="Portfólio — Gestante & Família"
        reverse={true}
      />
    </div>
  );
}