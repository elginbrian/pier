"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { useToasts } from "../../../components/ToastProvider";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FiMail } from "react-icons/fi";

export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useAuth();
  const { showToast } = useToasts();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return showToast("error", "Please enter your email first");
    setLoading(true);
    try {
      await requestPasswordReset(email);
      showToast("success", "Reset link has been sent to your email");
    } catch (err: any) {
      showToast("error", err?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <section className="hidden lg:flex items-center justify-center w-full lg:items-stretch">
        <div className="flex items-center justify-center lg:h-screen">
          <Image src="/login-hero-2.png" alt="poster" width={1200} height={800} className="w-full lg:w-auto lg:max-h-screen object-cover" priority />
        </div>
      </section>

      <aside className="flex items-center justify-center bg-white lg:bg-[color:var(--pier-primary-300)] p-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
            <div className="flex flex-col items-center gap-4 mb-6">
              <Image src="/logo-pelindo.png" alt="PIER logo" width={120} height={36} />
              <h1 className="text-3xl font-bold text-[color:var(--pier-primary-700)]">FORGOT PASSWORD</h1>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input label="Email" placeholder="Enter your registered email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} leftIcon={<FiMail />} />

              <Button type="submit" disabled={loading} className="w-full bg-[color:var(--pier-primary-700)] text-white py-3 rounded-md font-medium hover:brightness-95">
                {loading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Back to{" "}
              <Link href="/auth/login" className="text-[color:var(--pier-primary-700)] hover:underline">
                Sign in
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
