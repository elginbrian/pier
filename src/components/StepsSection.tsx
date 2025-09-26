import React from "react";
import Image from "next/image";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { colors } from "../design-system";

export default function StepsSection() {
  const router = useRouter();
  const steps = [
    { title: "Registration", desc: 'Register as a vendor by clicking the "Get Started" button next to it', img: "/step-1.png" },
    { title: "Fill Online Form", desc: "Complete the registration form by providing the requested information", img: "/step-2.png" },
    { title: "Upload Supporting Documents", desc: "Upload the required supporting documents in the registration form", img: "/step-3.png" },
    { title: "Submit and Wait for Notification", desc: "Submit the registration form and wait for a confirmation notification", img: "/step-4.png" },
  ];

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        <div>
          <h2 className="text-4xl font-extrabold mb-6 reveal-from-left" style={{ color: colors.base[700] }}>
            Steps to Create a Contract with <span style={{ color: colors.primary[300] }}>PIER</span>
          </h2>
          <p className="mb-6 reveal-from-bottom" style={{ color: colors.base[500] }}>
            PIER is an AI-powered contract management platform used by PT ILCS to simplify the entire contract lifecycle management, from vendor registration, proposal submission, contract drafting, to real-time contract monitoring.
          </p>

          <div className="w-48">
            <Button variant="primary" size="md" className="w-full" onClick={() => router.push("/dashboard/proposal/create")}>
              Create Contract
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="flex flex-col gap-6 stagger reveal-from-bottom">
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
