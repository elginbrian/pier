import React from 'react';
import { colors } from '../design-system';

interface ContractStepperProps {
  currentStep?: number;
  isDeclined?: boolean;
  declinedStep?: number;
}

export default function ContractStepper({ 
  currentStep = 2, 
  isDeclined = false, 
  declinedStep = 1 
}: ContractStepperProps) {
  const steps = ["Verifikasi", "Revisi", "Tanda Tangan", "Kontrak Mulai", "Selesai"];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-0">
      <div className="flex items-center justify-between relative">
        {/* Background line */}
        <div 
          className="absolute top-8 left-8 right-8 h-0.5" 
          style={{ backgroundColor: colors.base[300] }}
        ></div>
        
        {/* Blue progress line (from start to step-1) */}
        {currentStep > 0 && (
          <div 
            className="absolute top-8 left-8 h-0.5 transition-all duration-300"
            style={{ 
              backgroundColor: colors.primary[300],
              width: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% - 2rem + 32px)`
            }}
          ></div>
        )}
        
        {/* Red line (from step-1 to current) */}
        {currentStep > 0 && (
          <div 
            className="absolute top-8 h-0.5 transition-all duration-300"
            style={{ 
              backgroundColor: colors.error[400],
              left: `calc(${((currentStep - 1) / (steps.length - 1)) * 100}% + 32px)`,
              width: `calc(${(1 / (steps.length - 1)) * 100}% - 32px)`
            }}
          ></div>
        )}
        
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isDeclinedStep = isDeclined && index === declinedStep;

          return (
            <div key={step} className="flex flex-col items-center relative z-10">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border-2"
                style={{
                  borderColor: isDeclinedStep
                    ? colors.error[400]
                    : (isDeclined && isCurrent)
                    ? colors.base[300]
                    : isCompleted 
                    ? colors.primary[400] 
                    : isCurrent 
                    ? colors.primary[300] 
                    : colors.base[300],
                  backgroundColor: isDeclinedStep
                    ? colors.error[400]
                    : isCompleted 
                    ? colors.primary[400] 
                    : '#ffffff'
                }}
              >
                {isDeclinedStep ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#ffffff">
                    <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2.5" strokeLinecap="round" />
                  </svg>
                ) : isCompleted ? (
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="#ffffff">
                    <polyline points="20,6 9,17 4,12" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : null}
              </div>
              
              <p 
                className="text-sm text-center font-semibold"
                style={{ 
                  color: isDeclinedStep
                    ? colors.error[400]
                    : (isDeclined && isCurrent)
                    ? colors.base[700]
                    : isCurrent 
                    ? colors.primary[300] 
                    : colors.base[700] 
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