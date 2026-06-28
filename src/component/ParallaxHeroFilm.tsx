"use client";

import { useEffect, useRef } from "react";
import CapturaFilm from '../imagens/Props/capturaFilme.jpg'

// ── Ajuste manual ─────────────────────────────
const WINDOW_START_W = 65;  // % largura inicial (maior, scroll down diminui)
const WINDOW_START_H = 65;  // % altura inicial
const WINDOW_END_W   = 42;  // % largura mínima (scroll down chega aqui)
const WINDOW_END_H   = 42;  // % altura mínima
// ─────────────────────────────────────────────

export default function ParallaxHeroFilm() {
  const sectionRef    = useRef<HTMLDivElement>(null);
  const bannerRef     = useRef<HTMLDivElement>(null);
  const filmScreenRef = useRef<HTMLDivElement>(null);
  const filmWindowRef = useRef<HTMLDivElement>(null);

  // ── Banner encolhe no scroll ──
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      const rect    = section.getBoundingClientRect();
      const offsetY = -rect.top;
      if (offsetY < 0) return;

      const vh       = window.innerHeight - 300;
      const progress = Math.min(offsetY / vh, 1);
      const height   = vh * (1 - progress);

      if (bannerRef.current) {
        bannerRef.current.style.height = `${height}px`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Janela diminui (scroll down) / cresce (scroll up) ──
  useEffect(() => {
    const screen = filmScreenRef.current;
    const win    = filmWindowRef.current;
    if (!screen || !win) return;

    const handleScroll = () => {
      const rect     = screen.getBoundingClientRect();
      const vh       = window.innerHeight;
      const total    = vh + rect.height;
      const traveled = vh - rect.top;
      const progress = Math.max(0, Math.min(traveled / total, 1));

      // invertido: progress alto = janela menor
      const w = WINDOW_START_W + (WINDOW_END_W - WINDOW_START_W) * progress;
      const h = WINDOW_START_H + (WINDOW_END_H - WINDOW_START_H) * progress;

      win.style.width  = `${w}%`;
      win.style.height = `${h}%`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{
        position: "relative",
        width: "100%",
        height: "180vh",
        fontFamily: "sans-serif",
      }}
    >
      {/* ── Wrapper sticky ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* ── Banner ── */}
        <div
          ref={bannerRef}
          style={{
            width: "100%",
            height: "70vh",
            overflow: "hidden",
            flexShrink: 0,
            position: "relative",
          }}
        >
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%", height: "100%",
            overflow: "hidden",
          }}>
            <img
              src={CapturaFilm}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                position: "absolute",
                top: "50%", left: 0,
                transform: "translateY(-50%)",
                display: "block",
                minHeight: "100%",
                filter: "blur(2px)",
              }}
            />
          </div>

          <div style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at 50% 130%, transparent 20%, rgba(0,0,0,0.7) 80%)",
            zIndex: 1, pointerEvents: "none",
          }} />

          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            zIndex: 2, pointerEvents: "none",
            whiteSpace: "nowrap",
          }}>
            <span style={{
              display: "block",
              fontSize: "clamp(11px, 0.6vw, 200px)",
              letterSpacing: "0.3em", 
              color: "rgba(255,255,255,0.6)",
              textTransform: "uppercase",
              marginBottom: "12px",
            }}>
              portfolio
            </span>
            <div style={{
              fontSize: "clamp(30px, 3.5vw, 150px)", //tamanho padrao titulo
              fontWeight: 500,
              color: "#F9F7EF",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              textShadow: "0 2px 40px rgba(0,0,0,0.5)",
            }}>
              Cinema
            </div>
          </div>
        </div>

        {/* ── Tela do filme ── */}
        <div
          ref={filmScreenRef}
          style={{
            width: "100%",
            flex: 1,
            minHeight: "100vh",
            background: "#F9F7EF",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            gap: "20px",
          }}
        >

          {/* Texto acima */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 20,
          }}>
            <span style={{
              fontSize: "clamp(11px, 0.6vw, 70px)", //tamanho padrao subcessao
              letterSpacing: "0.4em",
              color: "#aaa",
              textTransform: "uppercase",
            }}>
              2026 — direção
            </span>
            <div style={{
              fontSize: "clamp(30px, 3.5vw, 150px)", //tamanho padrao titulo
              fontWeight: 500,
              color: "#111",
              letterSpacing: "-0.03em",
              lineHeight: 1,
              fontFamily: "'Playfair Display', serif",
              marginTop:"clamp(10px, 1vw, 200px)",
              marginBottom:"clamp(40px, 4vw, 300px)",
            }}>
              VIVA E TREMELUZENTE
            </div>
          </div>

          {/* ── Janela de filme ── */}
          <div
            ref={filmWindowRef}
            style={{
              width:  `${WINDOW_START_W}%`,
              height: `${WINDOW_START_H}%`,
              position: "relative",
              overflow: "hidden",
              zIndex: 10,
              willChange: "width, height",
              flexShrink: 0,
              borderRadius: "30px",
            }}
          >
            {/* Play button — Liquid Glass */}
            <div style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
              cursor: "pointer",
              width: "72px",
              height: "72px",
              animationDuration:'300',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translate(-50%, -50%) scale(1.07)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "translate(-50%, -50%) scale(1)";
              }}
            >
              <style>{`
                @keyframes liquidShift {
                  0%   { border-radius: 50% 45% 52% 48% / 48% 52% 45% 50%; }
                  25%  { border-radius: 48% 52% 46% 54% / 52% 46% 54% 48%; }
                  50%  { border-radius: 45% 50% 52% 46% / 50% 54% 46% 52%; }
                  75%  { border-radius: 52% 46% 48% 52% / 46% 50% 52% 48%; }
                  100% { border-radius: 50% 45% 52% 48% / 48% 52% 45% 50%; }
                }
                @keyframes liquidShine {
                  0%   { opacity: 0.55; transform: translateX(-30%) translateY(-20%) rotate(-10deg); }
                  50%  { opacity: 0.75; transform: translateX(-25%) translateY(-25%) rotate(-8deg); }
                  100% { opacity: 0.55; transform: translateX(-30%) translateY(-20%) rotate(-10deg); }
                }
              `}</style>

              {/* Blob líquido */}
              <div style={{
                position: "absolute", inset: 0,
                animation: "liquidShift 4s ease-in-out infinite",
                background: "linear-gradient(135deg, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0.10) 60%, rgba(255,255,255,0.22) 100%)",
                backdropFilter: "blur(14px) saturate(1.6)",
                WebkitBackdropFilter: "blur(14px) saturate(1.6)",
                boxShadow: `
                  inset 0 1px 1px rgba(255,255,255,0.55),
                  inset 0 -1px 1px rgba(0,0,0,0.10),
                  0 8px 32px rgba(0,0,0,0.18),
                  0 1.5px 0px rgba(255,255,255,0.30)
                `,
                border: "1px solid rgba(255,255,255,0.35)",
                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
              }}>
                {/* Reflexo interno */}
                <div style={{
                  position: "absolute",
                  top: "8%", left: "18%",
                  width: "55%", height: "36%",
                  background: "linear-gradient(120deg, rgba(255,255,255,0.70), rgba(255,255,255,0.08))",
                  borderRadius: "50%",
                  filter: "blur(3px)",
                  animation: "liquidShine 4s ease-in-out infinite",
                  pointerEvents: "none",
                }} />
              </div>
              
              {/* Triângulo play */}
              <div style={{
                position: "absolute", inset: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <svg
                  width="20" height="22"
                  viewBox="0 0 20 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ marginLeft: "3px", filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.18))" }}
                >
                  <path
                    d="M2 1.5L18 11L2 20.5V1.5Z"
                    fill="rgba(255,255,255,0.95)"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
            {/* imagem sem zoom: sempre 100% da largura, altura proporcional */}
            <img
              src={CapturaFilm}
              alt="Cinema"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "100%",
                height: "auto",
                minHeight: "100%",
                display: "block",
                objectFit: "cover",
              }}
            />
            {/* Vignette sutil */}
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(to bottom, rgba(0,0,0,0.12) 0%, transparent 25%, transparent 75%, rgba(0,0,0,0.18) 100%)",
              pointerEvents: "none",
              zIndex: 1,
            }} />
          </div>

          {/* Texto abaixo */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 20,
          }}>
            <span style={{
              fontSize: "11px",
              letterSpacing: "0.2em",
              color: "#bbb",
              textTransform: "uppercase",
            }}>
              uma história em construção
            </span>
            <span style={{
              fontSize: "10px",
              letterSpacing: "0.35em",
              color: "#ccc",
              textTransform: "uppercase",
            }}>
              curta-metragem · 12 min
            </span>
          </div>

        </div>
      </div>
    </div>
  );
}