import React from 'react';
import { colors } from '../design-system';

interface FileUploadFieldProps {
  label: string;
  fieldName: string;
  file: File | null;
  onFileChange: (field: string, file: File | null) => void;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({
  label,
  fieldName,
  file,
  onFileChange
}) => (
  <div>
    <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
      {label} <span style={{ color: colors.error[400] }}>*</span>
    </label>
    <div className="relative">
      <input
        type="text"
        placeholder="No file chosen"
        readOnly
        value={file?.name || ""}
        className="w-full h-14 px-5 pr-24 border rounded-xl bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="button"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 text-sm font-medium text-white rounded-lg border"
        style={{
          backgroundColor: colors.primary[300],
          borderColor: colors.primary[300],
        }}
        onClick={() => document.getElementById(fieldName)?.click()}
      >
        Browse
      </button>
      <input
        id={fieldName}
        type="file"
        className="hidden"
        onChange={(e) => onFileChange(fieldName.replace('dokumen-', 'dokumen'), e.target.files?.[0] || null)}
      />
    </div>
  </div>
);

export default FileUploadField;