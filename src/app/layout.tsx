import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { toCssVariables } from "../design-system";
import AuthProviderClient from "../context/AuthProviderClient";
import { ToastProvider } from "../components/ToastProvider";
import RevealController from "../components/RevealController";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "PIER",
  description: "PELINDO Integrated Electronic Repository",
  icons: {
    icon: "/pelindo-plain.png",
    shortcut: "/pelindo-plain.png",
    apple: "/pelindo-plain.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cssVars = toCssVariables();

  return (
    <html lang="en">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root{${cssVars}}` }} />
        <link rel="icon" href="/pelindo-plain.png" />
      </head>
      <body className={`${plusJakarta.variable} antialiased`}>
        <AuthProviderClient>
          <ToastProvider>
            <RevealController />
            {children}
          </ToastProvider>
        </AuthProviderClient>
      </body>
    </html>
  );
}
