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
      <div className="space-y-5">
        {items?.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`rounded-xl shadow-md`} style={{ backgroundColor: colors.base[100] }}>
              <div className="flex">
                <div className={`w-1 rounded-l-lg`} />
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
                    <span className={`text-lg font-semibold`}>
                      {item.title}
                    </span>
                    <img
                      src="/arrow-bottom.svg"
                      alt="Arrow Bottom"
                      className={`w-8 h-8 rounded-lg object-contain transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
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
