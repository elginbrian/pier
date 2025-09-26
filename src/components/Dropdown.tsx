"use client";
import { useState } from "react";

const Dropdown = ({ label = "Menu Label", options = ["Label1", "Label2", "Label3", "Label4", "Label5"], onSelect = (_option: string, _index: number) => {}, className = "", error = "" }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string, index: number): void => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option, index);
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className={`w-full px-4 py-3 bg-white border-2 flex items-center justify-between text-left hover:bg-gray-50 focus:outline-none focus:ring-2 transition-colors ${error ? "border-red-500" : "border-blue-500"} ${
          isOpen ? "rounded-t-lg" : "rounded-lg"
        }`}
        style={{
          fontFamily: "Plus Jakarta Sans, sans-serif",
          fontWeight: "600",
          color: "#313144",
        }}
      >
        <span>{selectedOption || label}</span>
        <svg className={`w-5 h-5 text-[#313144] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className={`absolute top-full left-0 right-0 bg-white border-2 border-t-0 rounded-b-lg shadow-lg z-50 overflow-hidden ${error ? "border-red-500" : "border-blue-500"}`}>
          {options.map((option: string, index: number) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option, index)}
              className={`w-full px-4 py-3 text-left hover:bg-[#E1E2E5] focus:outline-none focus:bg-gray-100 transition-colors ${index === 0 ? "bg-[#C4CBDF] text-[#313144]" : ""} ${
                index !== options.length - 1 ? "border-b border-gray-100" : ""
              }`}
              style={{
                fontFamily: "Plus Jakarta Sans, sans-serif",
                fontWeight: "600",
                color: index === 0 ? undefined : "#313144",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  );
};

export default Dropdown;
