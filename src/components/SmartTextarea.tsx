import React from 'react';

interface SmartTextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  error?: string;
}

const SmartTextarea: React.FC<SmartTextareaProps> = ({
  value,
  onChange,
  placeholder,
  rows = 3,
  className = '',
  error
}) => {
  const hasContent = value.trim().length > 0;
  
  return (
    <div>
      <textarea
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-black ${
          error 
            ? 'border-red-300' 
            : hasContent 
            ? 'border-green-300' 
            : 'border-gray-300'
        } ${className}`}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{ color: '#000000' }} // Ensure user input text is black
      />
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default SmartTextarea;