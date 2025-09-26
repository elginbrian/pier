import Image from "next/image";
import { colors } from "../design-system";

export default function TestimonialsSection() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl font-extrabold text-center mb-8 reveal-from-left">What Our Clients Say</h3>

        <div className="rounded-xl overflow-hidden reveal-from-bottom" style={{ backgroundColor: colors.primary[300] }}>
          <div className="p-8 md:p-12 flex items-center gap-8">
            <div className="flex-1">
              <blockquote className="italic mb-6" style={{ color: "#ffffffcc" }}>
                "ILCS helps in providing solutions to digitize Indonesian ports and it is hoped that in the future ILCS and the IPC Group will grow, develop together for the progress of the nation."
              </blockquote>

              <div className="pt-6" style={{ borderTop: `1px solid ${colors.base[100]}` }}>
                <div style={{ color: colors.base[100], fontWeight: 700, fontSize: "1.125rem" }}>ARIEF PRABOWO</div>
                <div style={{ color: `${colors.base[100]}cc` }}>President Director of PT Pelindo Jasa Maritim</div>
              </div>
            </div>

            <div className="w-40 h-40 rounded-lg overflow-hidden bg-white/5 flex-shrink-0">
              <Image src="/testimony.png" alt="profile" width={160} height={160} className="object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
