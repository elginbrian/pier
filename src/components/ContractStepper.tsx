import React from 'react';
import { colors } from '../design-system';

export default function ContractStepper() {
  const steps = ["Verifikasi", "Revisi", "Tanda Tangan", "Kontrak Mulai", "Selesai"];
  const currentStep = 2;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div 
          className="absolute top-8 left-8 right-8 h-0.5" 
          style={{ backgroundColor: colors.base[300] }}
        ></div>
        {/* Progress line */}
        <div 
          className="absolute top-8 left-8 h-0.5 transition-all duration-300"
          style={{ 
            backgroundColor: colors.primary[300],
            width: currentStep >= steps.length - 1 
              ? `calc(${((steps.length - 1) / (steps.length - 1)) * 100}% - 2rem - 32px)`
              : `calc(${(currentStep / (steps.length - 1)) * 100}% - 2rem + 32px)`
          }}
        ></div>
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: isCompleted 
                    ? colors.primary[400] 
                    : isCurrent 
                    ? colors.primary[300] 
                    : colors.base[300],
                  backgroundColor: isCompleted 
                    ? colors.primary[400] 
                    : '#ffffff'
                }}
              >
                {isCompleted ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#ffffff">
                    <polyline points="20,6 9,17 4,12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : isCurrent ? (
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: colors.primary[300] }}
                  ></div>
                ) : null}
              </div>
              <p 
                className="text-sm mt-3 text-center font-semibold"
                style={{ 
                  color: isCurrent ? colors.primary[300] : colors.base[700] 
                }}
              >
                {step}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};