import React from 'react';

interface FormFieldProps {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required = false, children }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
        {required && (
          <span className="text-blue-500 ml-1">
            <img src="/helper.svg" alt="Required" className="inline w-4 h-4" />
          </span>
        )}
      </label>
      {children}
    </div>
  );
};

export default FormField;