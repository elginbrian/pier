import React from 'react';
import Image from 'next/image';

interface FormSectionProps {
  stepNumber?: number; // Made optional since we're not using it
  title: string;
  children: React.ReactNode;
  icon?: string;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children, icon }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        {icon && (
          <Image 
            src={icon} 
            alt={title} 
            width={20} 
            height={20} 
            className="mr-3"
          />
        )}
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      </div>
      <div>
        {children}
      </div>
    </div>
  );
};

export default FormSection;