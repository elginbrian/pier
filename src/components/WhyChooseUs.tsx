import Button from "./Button";
import { colors } from "../design-system";
import { FiFileText, FiGlobe, FiServer } from "react-icons/fi";

export default function WhyChooseUs() {
  return (
    <section style={{ backgroundColor: colors.primary[300] }} className="py-20 reveal-from-bottom">
      <div className="max-w-7xl mx-auto px-6">
        <h3 className="text-3xl sm:text-4xl font-extrabold text-center text-white mb-4 reveal-from-bottom">Why choose us?</h3>
        <p className="text-center text-white/90 max-w-3xl mx-auto mb-10 reveal-from-bottom">
          Our Advantages for Your Industry. We understand the complexity of managing documents and agreements in the logistics sector. Our platform is designed specifically to solve these challenges by:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 why-grid">
          {[
            {
              title: "Digital Port & Logistics Expertise",
              desc: "Experienced in implementing high-quality digital solutions for ports and logistics.",
              icon: FiFileText,
            },
            {
              title: "Global Partnerships",
              desc: "Cooperating with global partners to support the development of trusted IT products and services.",
              icon: FiGlobe,
            },
            {
              title: "IT Solution Provider",
              desc: "ILCS plays a major role in planning, developing, and managing IT services within the Pelindo Group.",
              icon: FiServer,
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                role="button"
                tabIndex={0}
                className="group rounded-lg p-6 shadow-md reveal-from-bottom transition-transform duration-300 transform hover:-translate-y-2 hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{ backgroundColor: colors.base[100] }}
              >
                <div className="w-12 h-12 rounded-md flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110" style={{ backgroundColor: colors.secondary[300] }}>
                  <img src={`/why-choose-us-${idx + 1}.png`} alt="check" className="w-full h-full object-cover" />
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
