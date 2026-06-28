"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import Hero2 from './Hero2'

import img1 from         "../imagens/Album_um/vertical/img1.jpg";
import img2 from         "../imagens/Album_um/vertical/img2.jpg";
import img3  from        "../imagens/Album_um/vertical/img3.jpg";
import img4  from        "../imagens/Album_um/vertical/img4.jpg";
import img5  from        "../imagens/Album_um/vertical/img5.jpg";
import img6  from        "../imagens/Album_um/vertical/img6.jpg";
import img7  from        "../imagens/Album_um/vertical/img7.jpg";
import img8  from        "../imagens/Album_um/vertical/img8.jpg";
import img9 from         "../imagens/Album_um/vertical/img9.jpg";
import img10 from        "../imagens/Album_um/vertical/img10.jpg";
import img11 from        "../imagens/Album_um/vertical/img11.jpg";
import img12 from        "../imagens/Album_um/vertical/img12.jpg";
import img13 from        "../imagens/Album_um/vertical/img13.jpg";

const images = [
  img1, img2, img3, img4, img5, img6, img7,
  img8, img9, img10, img11, img12, img13,
];

const Skiper30 = () => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-[#000000] text-black">
      <div className="font-geist flex h-screen items-center justify-center gap-2">
        <div className="absolute left-1/2 top-[90%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-white">

          <svg
            viewBox="0 0 50 50"
            className="h-7 w-7 transition-transform duration-500 group-hover:-translate-y-1 animate-bounce rotate-180"
            fill="none"
          >
            <path
              d="M24 14L14 24M24 14L34 24M24 14V34"
              stroke="#612d53"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
          <Hero2/>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-[#0a0a0a] p-[2vw]"
      >
        <Column images={[images[0], images[1], images[4]]} y={y} />
        <Column images={[images[3], images[12], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[2]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-45% flex h-full w-1/4 min-w-62.5 flex-col gap-[2vw] first:top-[-45%] nth-2:top-[-95%] nth-3:top-[-45%] nth-4:top-[-75%] "
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <img
            src={`${src}`}
            alt="image"
            className="pointer-events-none object-cover rounded-2xl"
          />
        </div>
      ))}
    </motion.div>
  );
};

export default Skiper30 ;

/**
 * Skiper 30 Parallax_002 — React + framer motion + lenis
 * Inspired by and adapted from https://www.siena.film/films/my-project-x
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the siena.film . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
