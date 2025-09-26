import React, { useState } from 'react';
import Image from 'next/image';
import Button from './Button';

interface LargeFileUploadProps {
    label: string;
    description?: string;
    acceptedTypes?: string;
    maxSize?: string;
    required?: boolean;
    onFileSelect?: (file: File | null) => void;
    file?: File | null;
    error?: string;
}

const LargeFileUpload: React.FC<LargeFileUploadProps> = ({
    label,
    description = "Drag & drop file atau klik untuk upload",
    acceptedTypes = "PDF, DOC, DOCX",
    maxSize = "10MB",
    required = false,
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
        const input = document.getElementById(`large-file-${label.replace(/\s+/g, '-').toLowerCase()}`) as HTMLInputElement;
        if (input) input.value = '';
    };

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
            
            {selectedFile ? (
                <div className="border border-gray-200 rounded-lg p-4 bg-green-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                <Image
                                    src="/file.svg"
                                    alt="File"
                                    width={16}
                                    height={16}
                                />
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
                <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}>
                    <div className="mb-4">
                        <div className="w-12 h-12 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                            <Image
                                src="/upload-any-file.svg"
                                alt="Upload File"
                                width={24}
                                height={24}
                            />
                        </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{description}</p>
                    <p className="text-xs text-gray-500 mb-4">{acceptedTypes} (Max {maxSize})</p>
                    <input
                        type="file"
                        className="hidden"
                        id={`large-file-${label.replace(/\s+/g, '-').toLowerCase()}`}
                        onChange={handleFileChange}
                        accept={acceptedTypes.includes('PDF') ? '.pdf,.doc,.docx' : '.pdf'}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        onClick={() => document.getElementById(`large-file-${label.replace(/\s+/g, '-').toLowerCase()}`)?.click()}
                    >
                        Pilih File
                    </Button>
                </div>
            )}
            
            {error && (
                <p className="text-sm text-red-600 mt-1">{error}</p>
            )}
        </div>
    );
};

export default LargeFileUpload;