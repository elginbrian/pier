import React from 'react';
import Image from 'next/image';
import Button from './Button';

interface LargeFileUploadProps {
    label: string;
    description?: string;
    acceptedTypes?: string;
    maxSize?: string;
    required?: boolean;
    onFileSelect?: (file: File) => void;
}

const LargeFileUpload: React.FC<LargeFileUploadProps> = ({
    label,
    description = "Drag & drop file atau klik untuk upload",
    acceptedTypes = "PDF, DOC, DOCX",
    maxSize = "10MB",
    required = false,
    onFileSelect
}) => {
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file && onFileSelect) {
            onFileSelect(file);
        }
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
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
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
        </div>
    );
};

export default LargeFileUpload;