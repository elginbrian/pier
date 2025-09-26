import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full h-screen m-0 p-0 overflow-hidden">
      <div className="relative w-full h-full">
        <Image src="/hero-image.png" alt="Hero" fill className="object-cover" priority />
      </div>
    </section>
  );
}
