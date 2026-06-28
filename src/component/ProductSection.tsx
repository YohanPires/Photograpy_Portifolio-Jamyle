import { useState, useEffect, useRef } from "react";

const categories = [
  { id: 1, label: "ENSAIOS", title: "FEMININOS",  image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80" },
  { id: 2, label: "ENSAIOS", title: "GESTANTE",   image: "https://assets.vogue.in/photos/5f8fb9f3077c3eea35ebdd4c/2:3/w_2560%2Cc_limit/pregnant%2520woman%2520body.jpg" },
  { id: 3, label: "ENSAIOS", title: "INFANTIL",   image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=600&q=80" },
  { id: 4, label: "",        title: "EVENTOS",    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=80" },
  { id: 5, label: "",        title: "AMBIENTES",  image: "https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=600&q=80" },
];

const CENTER = 2;
const dist   = (i: number) => Math.abs(i - CENTER);
const clamp  = (v: number, a: number, b: number) => Math.min(Math.max(v, a), b);
const remap  = (v: number, i0: number, i1: number, o0: number, o1: number) =>
  o0 + ((v - i0) / (i1 - i0)) * (o1 - o0);

const CSS = `
  .ps-section {
    background: #010103;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
  }

  /* ── Banner ── */
  .ps-banner {
    width: 100%;
    background: #1a1a1a;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    overflow: hidden;
  }
  .ps-banner p {
    color: #4a4a4a;
    font-family: Inter, sans-serif;
    font-size: clamp(8px, 1.2vw, 11px);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    white-space: nowrap;
    margin: 0;
  }

  /* ── Header ── */
  .ps-header {
    text-align: center;
    padding: clamp(32px, 5vw, 60px) clamp(16px, 4vw, 40px) clamp(28px, 4vw, 48px);
    width: 100%;
  }
  .ps-eyebrow {
    color: var(--plum, #c07a7a);
    letter-spacing: 0.35em;
    font-size: clamp(9px, 1.1vw, 11px);
    font-weight: 400;
    margin: 0 0 10px;
    text-transform: uppercase;
  }
  .ps-title {
    color: #e8e8e8;
    letter-spacing: 0.1em;
    font-size: clamp(13px, 2vw, 18px);
    font-weight: 300;
    text-transform: uppercase;
    margin: 0;
  }
  .ps-line {
    margin: 14px auto 0;
    height: 1px;
    background: var(--plum, #c07a7a);
    transition: width 0.6s ease 0.25s;
  }

  /* ── Grid ── */
  .ps-grid {
    display: flex;
    width: 100%;
    max-width: 2200px;
    padding: 0 clamp(100px, 10vw, 300px);
    padding-bottom: clamp(200px, 10vw, 500px);
    gap: clamp(6px, 1vw, 10px);
  }

  /* ── Card ── */
  .ps-card-wrap {
    flex: 1;
    min-width: 0;
    transition: flex 0.45s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .ps-card-wrap:hover { flex: 1.5; }

  .ps-card {
    position: relative;
    width: 100%;
    height: clamp(200px, 30vw, 550px);
    overflow: hidden;
    border-radius: clamp(8px, 1.2vw, 24px);
    cursor: pointer;
  }

  .ps-img-wrap {
    width: 100%;
    height: 100%;
    transition: transform 0.5s ease;
  }
  .ps-card-wrap:hover .ps-img-wrap {
    transform: scale(1.05);
  }

  .ps-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: filter 0.4s ease;
    filter: brightness(0.5);
  }
  .ps-card-wrap:hover .ps-img {
    filter: brightness(0.85);
  }

  .ps-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 55%);
    pointer-events: none;
  }

  .ps-labels {
    position: absolute;
    bottom: clamp(10px, 2vw, 18px);
    left: clamp(10px, 1.5vw, 16px);
    pointer-events: none;
  }
  .ps-label-sub {
    color: rgba(255,255,255,0.45);
    font-size: clamp(7px, 0.9vw, 9px);
    letter-spacing: 0.25em;
    text-transform: uppercase;
    margin: 0 0 4px;
    font-weight: 400;
  }
  .ps-label-title {
    color: #f0f0f0;
    font-size: clamp(10px, 1.3vw, 14px);
    letter-spacing: 0.18em;
    text-transform: uppercase;
    margin: 0;
    font-weight: 500;
  }

  /* ── Mobile: stack vertically ── */
  @media (max-width: 600px) {
    .ps-grid {
      flex-direction: column;
    }
    .ps-card-wrap {
      flex: none !important;
      width: 100%;
    }
    .ps-card-wrap:hover {
      flex: none;
    }
    .ps-card {
      height: clamp(160px, 55vw, 240px);
    }
  }

  /* ── Tablet: 2-col wrap ── */
  @media (min-width: 601px) and (max-width: 900px) {
    .ps-grid {
      flex-wrap: wrap;
    }
    .ps-card-wrap {
      flex: 1 1 calc(50% - 5px) !important;
      max-width: calc(50% - 5px);
    }
    .ps-card-wrap:hover {
      flex: 1 1 calc(50% - 5px);
    }
    .ps-card {
      height: clamp(180px, 28vw, 260px);
    }
  }
`;

let cssInjected = false;
function injectCSS() {
  if (cssInjected || typeof document === "undefined") return;
  const tag = document.createElement("style");
  tag.textContent = CSS;
  document.head.appendChild(tag);
  cssInjected = true;
}

export default function ProductSection() {
  injectCSS();

  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerInView, setHeaderInView]     = useState(false);

  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef  = useRef<HTMLDivElement>(null);

  // ── Card animation state per index (scroll-driven) ───────────────
  const [cardStates, setCardStates] = useState(
    categories.map(() => ({ opacity: 0, translateY: 80, labelOpacity: 0, labelY: 10 }))
  );

  useEffect(() => {
    const onScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh   = window.innerHeight;
      const raw  = clamp(remap(rect.top, vh, 0, 0, 1), 0, 1);
      setScrollProgress(raw);

      const cardProgress = clamp(remap(raw, 0.40, 0.85, 0, 1), 0, 1);

      setCardStates(categories.map((_, i) => {
        const stagger = dist(i) * 0.20;
        const p       = clamp(remap(cardProgress, stagger, 1, 0, 1), 0, 1);
        const lp      = clamp(remap(p, 0.5, 1, 0, 1), 0, 1);
        return {
          opacity:      p,
          translateY:   (1 - p) * 80,
          labelOpacity: lp,
          labelY:       (1 - lp) * 10,
        };
      }));
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setHeaderInView(true); },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Banner
  const bannerMaxH   = 320;
  const bannerP      = clamp(remap(scrollProgress, 0, 0.55, 0, 1), 0, 1);
  const bannerHeight = bannerMaxH * (1 - bannerP);
  const bannerOpac   = clamp(remap(scrollProgress, 0.3, 0.55, 1, 0), 0, 1);

  return (
    <section ref={sectionRef} className="ps-section">

      {/* Banner */}
      <div
        className="ps-banner"
        style={{ height: `${bannerHeight}px`, opacity: bannerOpac }}
      >
        <p>Fotografia · Arte · Memória</p>
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="ps-header"
        style={{
          opacity:    headerInView ? 1 : 0,
          transform:  headerInView ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.9s ease, transform 0.9s ease",
        }}
      >
        <p className="ps-eyebrow">Fotografia</p>
        <h2
          className="ps-title"
          style={{
            opacity:    headerInView ? 1 : 0,
            transform:  headerInView ? "translateY(0)" : "translateY(14px)",
            transition: "opacity 0.7s ease 0.12s, transform 0.7s ease 0.12s",
          }}
        >
          Todas as coleções
        </h2>
        <div
          className="ps-line"
          style={{ width: headerInView ? "90px" : "0px" }}
        />
      </div>

      {/* Grid */}
      <div className="ps-grid">
        {categories.map((cat, i) => {
          const s = cardStates[i];
          return (
            <div
              key={cat.id}
              className="ps-card-wrap"
              style={{
                opacity:   s.opacity,
                transform: `translateY(${s.translateY}px)`,
              }}
            >
              <div className="ps-card">
                {/* Image — scale isolated in its own wrapper */}
                <div className="ps-img-wrap">
                  <img
                    className="ps-img"
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                  />
                </div>

                {/* Gradient */}
                <div className="ps-overlay" />

                {/* Labels */}
                <div
                  className="ps-labels"
                  style={{
                    opacity:   s.labelOpacity,
                    transform: `translateY(${s.labelY}px)`,
                  }}
                >
                  {cat.label && (
                    <p className="ps-label-sub">{cat.label}</p>
                  )}
                  <p className="ps-label-title">{cat.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}