import Button from "./Button";
import { colors } from "../design-system";
import { FiFileText, FiGlobe, FiServer } from "react-icons/fi";

export default function WhyChooseUs() {
  return (
    <section style={{ backgroundColor: colors.primary[300] }} className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-4">Kenapa memilih kami?</h3>
        <p className="text-center text-white/90 max-w-3xl mx-auto mb-10">
          Keunggulan Kami untuk Industri Anda Kami memahami kompleksitas dalam mengelola dokumen dan perjanjian di sektor logistik. Platform kami dirancang khusus untuk memecahkan masalah ini dengan:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              title: "Kompetensi Solusi Digital Pelabuhan & Logistik",
              desc: "Kompeten dan mampu dalam implementasi Solusi Digital Pelabuhan & Logistik yang baik.",
              icon: FiFileText,
            },
            {
              title: "Kemitraan Global",
              desc: "Berkoordinasi dengan Mitra Global yang mendukung pengembangan produk dan layanan IT yang terpercaya.",
              icon: FiGlobe,
            },
            {
              title: "Penyedia Solusi IT",
              desc: "ILCS berperan besar dalam perencanaan, pengembangan, dan pengelolaan layanan IT di lingkungan Pelindo Group.",
              icon: FiServer,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="rounded-lg p-6 shadow-md" style={{ backgroundColor: colors.base[100] }}>
                <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4" style={{ backgroundColor: colors.secondary[300] }}>
                  <Icon size={20} color="white" aria-hidden />
                </div>
                <h4 className="font-semibold mb-2" style={{ color: colors.base[700] }}>
                  {item.title}
                </h4>
                <p className="text-sm mb-4" style={{ color: colors.base[500] }}>
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
