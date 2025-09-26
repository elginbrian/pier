"use client";

import Accordion from "./Accordion";
import Button from "./Button";
import { colors } from "../design-system/colors";

const faqs = [
  {
    id: "faq-1",
    title: "What is PIER and what does it do?",
    content: "PIER is a port management platform that helps monitor and manage logistics operations, including shipments, cargo tracking, and integration with third-party systems.",
  },
  {
    id: "faq-2",
    title: "How do I register and use the service?",
    content: "You can register through the registration page. After registering, our team will verify your account and grant access to the management dashboard.",
  },
  {
    id: "faq-3",
    title: "Is there integration with third-party systems?",
    content: "Yes — PIER supports API integration for TMS, ERP, and third-party tracking services. Contact our support team for API access and documentation.",
  },
];

export default function FAQSection() {
  return (
    <section className="w-full bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-extrabold text-gray-900">Frequently Asked Questions</h2>
          <p className="text-gray-600 mt-3">If you have other questions, please contact our support team.</p>
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
