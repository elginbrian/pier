import Image from "next/image";
import Button from "./Button";
import useReveal from "../hooks/useReveal";
import { useRef } from "react";

export default function Hero() {
  const containerRef = useReveal<HTMLDivElement>();
  const parallaxRef = useRef<HTMLDivElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent) => {
    const el = parallaxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    const tx = x * 12;
    const ty = y * 10;
    el.style.transform = `translate3d(${tx}px, ${ty}px, 0) scale(1.02)`;
  };

  const handlePointerLeave = () => {
    const el = parallaxRef.current;
    if (!el) return;
    el.style.transform = "translate3d(0,0,0) scale(1)";
  };

  return (
    <section className="w-full m-0 p-0 overflow-hidden">
      <div className="relative w-screen h-screen">
        <div ref={parallaxRef} className="absolute inset-0 parallax will-change-transform">
          <Image src="/hero-image.png" alt="Hero" fill className="object-cover" priority sizes="100vw" />
        </div>

        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 30%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div ref={containerRef} onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-6 max-w-3xl reveal-from-bottom reveal stagger">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-extrabold drop-shadow-lg reveal-from-left">Selamat Datang di PIER</h1>
            <p className="mt-4 text-white/90 text-base sm:text-lg md:text-xl font-medium drop-shadow-lg reveal-from-bottom">PELINDO Integrated Electronic Repository. Solusi Digital Untuk Perusahaanmu</p>

            <div className="mt-8 flex items-center justify-center reveal-from-bottom">
              <Button variant="primary" size="md">
                Mulai Jelajahi
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
