import Image from "next/image";
import React from "react";
import Button from "./Button";
import { colors } from "../design-system";

export default function AboutSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-4xl font-extrabold mb-6 reveal-from-left">
            About <span style={{ color: colors.primary[300] }}>PT. ILCS</span>
          </h2>
          <p className="text-gray-600 mb-8 reveal-from-bottom">
            We are a technology leader delivering AI-driven platforms to optimize logistics and port operations. With our solutions you can manage documents and coordinate with partners more efficiently and productively.
          </p>

          <div className="w-48">
            <Button variant="primary" size="md" className="w-full">
              Get Started
            </Button>
          </div>
        </div>

        <div className="flex justify-center md:justify-end reveal-from-right">
          <div className="w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl">
            <Image src="/about-image.png" alt="Illustration" width={700} height={420} className="object-cover block" />
          </div>
        </div>
      </div>
    </section>
  );
}
