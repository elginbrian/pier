'use client';

import React from 'react';
import { colors } from '@/design-system';

interface DocumentUploadProps {
  filename: string;
  size: string;
  isUploaded?: boolean;
  className?: string;
}

export default function DocumentUpload({ 
  filename, 
  size, 
  isUploaded = true, 
  className = "" 
}: DocumentUploadProps) {
  return (
    <div
      className={`rounded-lg p-6 text-center ${className}`}
      style={{
        border: `1px solid ${colors.base[200]}`,
        backgroundColor: colors.base[100]
      }}
    >
      <div className="mb-4">
        <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
          <svg 
            className="w-6 h-6" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke={colors.base[500]}
            strokeWidth="2"
          >
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        </div>
      </div>
      <p
        className="text-sm mb-2"
        style={{ color: colors.base[600] }}
      >
        {filename}
      </p>
      <p
        className="text-xs"
        style={{ color: colors.base[500] }}
      >
        {size} - {isUploaded ? 'Uploaded' : 'Pending'}
      </p>
    </div>
  );
}