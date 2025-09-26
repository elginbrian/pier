'use client';
import { useState } from 'react';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

const Accordion = ({ 
  items, 
  className = "",
  allowMultiple = false 
}: AccordionProps) => {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    if (allowMultiple) {
      setOpenItems(prev => 
        prev.includes(id) 
          ? prev.filter(item => item !== id)
          : [...prev, id]
      );
    } else {
      setOpenItems(prev => 
        prev.includes(id) ? [] : [id]
      );
    }
  };

  const isOpen = (id: string) => openItems.includes(id);

  return (
    <div className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <div
          key={item.id}
          className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100"
        >
          <button
            onClick={() => toggleItem(item.id)}
            className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors focus:outline-none"
            style={{ 
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontWeight: '600'
            }}
          >
            <div className="flex-1 pr-4">
              <h3 
                className="text-base leading-relaxed"
                style={{ color: '#000000' }}
                dangerouslySetInnerHTML={{ __html: item.question }}
              />
            </div>
            
            <div className="flex-shrink-0">
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  isOpen(item.id) ? 'rotate-180 text-[#007F8D]' : 'text-[#007F8D]'
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2.5} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </div>
          </button>

          <div
            className={`overflow-hidden transition-all duration-300 ease-in-out ${
              isOpen(item.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <div className="px-6 pb-5">
              <div 
                className="text-sm leading-relaxed"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, sans-serif',
                  fontWeight: '400',
                  color: '#000000'
                }}
              >
                {item.answer}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;