"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import { FiUser, FiLock, FiLogIn } from "react-icons/fi";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";
import { useToasts } from "../../../components/ToastProvider";

export default function LoginPage() {
  const router = useRouter();
  const { signIn, user } = useAuth();
  const { showToast } = useToasts();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (user) {
    router.replace("/");
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!identifier || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      await signIn(identifier, password);
      showToast("success", "Successfully signed in");
      router.push("/");
    } catch (err: any) {
      const msg = err?.message || "Failed to sign in";
      setError(msg);
      showToast("error", msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-[auto_1fr]">
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
              <h1 className="text-4xl font-bold text-[color:var(--pier-primary-700)]">LOGIN</h1>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <Input label="Username / Email" placeholder="Enter username or email" value={identifier} onChange={(e) => setIdentifier(e.target.value)} leftIcon={<FiUser />} />

              <Input label="Password" placeholder="Enter password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} leftIcon={<FiLock />} />

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-600">
                  <input type="checkbox" className="w-4 h-4" />
                  Remember me
                </label>
                <Link href="/auth/forgot" className="text-sm text-[color:var(--pier-primary-700)] hover:underline">
                  Forgot Password?
                </Link>
              </div>

              {error && <div className="text-sm text-red-600">{error}</div>}

              <Button type="submit" disabled={loading} className="w-full py-3 rounded-md font-medium hover:brightness-95" leftIcon={<FiLogIn />}>
                {loading ? "Signing in..." : "Sign in"}
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600 mt-6">
              Don't have an account?{" "}
              <Link href="/vendor-registration" className="text-[color:var(--pier-primary-700)] hover:underline">
                Register as a Vendor
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
