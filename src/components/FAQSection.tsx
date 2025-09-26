"use client";

import Accordion from "./Accordion";
import Button from "./Button";
import { colors } from "../design-system/colors";

const faqs = [
  {
    id: "faq-1",
    title: "Apa itu PIER dan apa fungsinya?",
    content: "PIER adalah platform manajemen pelabuhan yang membantu memantau dan mengelola operasi logistik, termasuk pengiriman, pelacakan kargo, dan integrasi dengan sistem pihak ketiga.",
  },
  {
    id: "faq-2",
    title: "Bagaimana cara mendaftar dan menggunakan layanan?",
    content: "Anda dapat mendaftar melalui halaman registrasi. Setelah terdaftar, tim kami akan memverifikasi akun Anda dan memberikan akses ke dashboard manajemen.",
  },
  {
    id: "faq-3",
    title: "Apakah ada integrasi dengan sistem pihak ketiga?",
    content: "Ya — PIER mendukung integrasi API untuk sistem TMS, ERP, dan layanan pelacakan pihak ketiga. Hubungi tim dukungan kami untuk akses API dan dokumentasi.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900">Pertanyaan yang Sering Diajukan</h2>
          <p className="text-gray-600 mt-3">Jika ada pertanyaan lain, hubungi tim dukungan kami.</p>
        </div>

        <div className="grid grid-cols-1">
          <div>
            <div className="bg-transparent">
              <Accordion items={faqs.map((f) => ({ id: f.id, title: f.title, content: f.content }))} />
            </div>
          </div>

          <div className="flex items-start"></div>
        </div>
      </div>
    </section>
  );
}
