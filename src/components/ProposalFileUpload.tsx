import React, { useState } from 'react';
import Image from 'next/image';
import Button from './Button';

interface ProposalFileUploadProps {
  label: string;
  description?: string;
  required?: boolean;
  acceptedTypes?: string;
  maxSize?: string;
  onFileSelect?: (file: File | null) => void;
  file?: File | null;
  error?: string;
}

const ProposalFileUpload: React.FC<ProposalFileUploadProps> = ({
  label,
  description = "Upload PDF",
  required = false,
  acceptedTypes = "PDF, DOC, DOCX",
  maxSize = "10MB",
  onFileSelect,
  file,
  error
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(file || null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0] || null;
    setSelectedFile(newFile);
    if (onFileSelect) {
      onFileSelect(newFile);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    if (onFileSelect) {
      onFileSelect(null);
    }
    // Clear the input
    const input = document.getElementById(`file-${label.replace(/\s+/g, '-').toLowerCase()}`) as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {label}
        {required && (
          <span className="text-blue-500 ml-1">
            <svg className="inline w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </label>
      
      {selectedFile ? (
        <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                <img src="/file.svg" alt="File" className="inline w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRemoveFile}
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        <div className={`border rounded-lg p-6 text-center ${
          error ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="mb-4">
            <div className="w-12 h-12 mx-auto rounded-full flex items-center justify-center">
              <img src="/upload-pdf-file.svg" alt="Upload PDF" className="inline w-6 h-6" />
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <input
            type="file"
            className="hidden"
            id={`file-${label.replace(/\s+/g, '-').toLowerCase()}`}
            onChange={handleFileChange}
            accept='.pdf,.doc,.docx'
          />
          <Button 
            variant="primary" 
            size="sm"
            className="bg-base-400"
            onClick={() => document.getElementById(`file-${label.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
          >
            Upload
          </Button>
        </div>
      )}
      
      {error && (
        <p className="text-sm text-red-600 mt-1">{error}</p>
      )}
    </div>
  );
};

export default ProposalFileUpload;