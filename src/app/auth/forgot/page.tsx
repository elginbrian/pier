"use client";
import Image from "next/image";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <section className="flex items-center justify-center w-full md:items-stretch">
        <div className="flex items-center justify-center md:h-screen">
          <Image src="/login-hero.png" alt="poster" width={1200} height={800} className="w-full md:w-auto md:max-h-screen object-cover" priority />
        </div>
      </section>

      <aside className="flex items-center justify-center bg-[color:var(--pier-primary-300)] p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <div className="flex flex-col items-center gap-4 mb-6">
              <Image src="/logo-pelindo.png" alt="PIER logo" width={120} height={36} />
              <h1 className="text-3xl font-semibold text-[color:var(--pier-primary-700)]">LUPA PASSWORD</h1>
            </div>

            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block text-sm text-gray-700">
                Email
                <input
                  className="mt-2 block w-full rounded-md border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[color:var(--pier-accentCool-300)]"
                  placeholder="Masukkan email terdaftar"
                  type="email"
                  name="email"
                />
              </label>

              <button type="submit" className="w-full bg-[color:var(--pier-primary-700)] text-white py-3 rounded-md font-medium hover:brightness-95">
                Kirim Reset Link
              </button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Kembali ke{" "}
              <Link href="/auth/login" className="text-[color:var(--pier-primary-700)] hover:underline">
                Masuk
              </Link>
            </p>

            <p className="text-center text-xs text-gray-400 mt-4">
              Copyright 2025 PT ILCS. All rights reserved.
              <br />
              Pelindo Integrated Electronic Repository
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}
