import React from "react";
import Image from "next/image";
import Button from "./Button";
import { colors } from "../design-system";

export default function StepsSection() {
  const steps = [
    { title: "Registrasi", desc: 'Lakukan Registrasi Sebagai Vendor Dengan Menekan Tombol "Mulai" Di Samping', img: "/step-1.png" },
    { title: "Isi Formulir Online", desc: "Melengkapi Formulir Registrasi Dengan Mengisi Data-Data Yang Diminta", img: "/step-2.png" },
    { title: "Unggah Dokumen Pendukung", desc: "Unggah Dokumen-Dokumen Pendukung Yang Diminta Pada Form Registrasi", img: "/step-3.png" },
    { title: "Kirim dan Tunggu Notifikasi", desc: "Submit Formulir Registrasi Dan Harap Menunggu Konfirmasi Pengajuan Melalui Notifikasi", img: "/step-4.png" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-4xl font-extrabold mb-6" style={{ color: colors.base[700] }}>
            Langkah-Langkah Membuat Kontrak Bersama <span style={{ color: colors.primary[300] }}>PIER</span>
          </h2>
          <p className="mb-6" style={{ color: colors.base[500] }}>
            PIER adalah platform manajemen kontrak berbasis AI yang digunakan PT ILCS untuk mempermudah pengelolaan seluruh siklus hidup kontrak, mulai dari pendaftaran vendor, pengajuan proposal, drafting kontrak, hingga monitoring kontrak
            secara real-time.
          </p>

          <div className="w-48">
            <Button variant="primary" size="md" className="w-full">
              Buat Kontrak
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-6">
            {steps.map((s, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 text-3xl font-semibold text-gray-700">{String(i + 1).padStart(2, "0")}</div>
                <div className="flex-1 border-t pt-4" style={{ borderColor: colors.base[200] }}>
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-md overflow-hidden flex items-center justify-center">
                      <Image src={s.img} alt="step" width={80} height={80} className="object-contain" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm text-gray-600">{s.desc}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
