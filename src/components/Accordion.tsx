"use client";

import React, { useState, KeyboardEvent } from "react";
import { colors } from "../design-system/colors";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items && items.length ? items[0].id : null);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  function onKeyDown(e: KeyboardEvent, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle(id);
    }
  }

  return (
    <div className="w-full">
      <div className="space-y-3">
        {items?.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`bg-white rounded-lg shadow-sm border ${isOpen ? "ring-2 ring-indigo-50" : ""}`}>
              <div className="flex">
                <div style={{ backgroundColor: isOpen ? colors.primary[300] : "transparent" }} className={`w-1 rounded-l-lg`} />
                <div className="flex-1">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`panel-${item.id}`}
                    id={`accordion-${item.id}`}
                    onClick={() => toggle(item.id)}
                    onKeyDown={(e) => onKeyDown(e, item.id)}
                    className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  >
                    <span style={{ color: isOpen ? colors.primary[300] : undefined }} className={`text-lg font-semibold ${isOpen ? "" : "text-gray-900"}`}>
                      {item.title}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      aria-hidden
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  <div id={`panel-${item.id}`} role="region" aria-labelledby={`accordion-${item.id}`} className={`px-6 overflow-hidden transition-[max-height] duration-300 ${isOpen ? "max-h-96 py-4" : "max-h-0"}`}>
                    <div className="text-sm text-gray-700">{item.content}</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
