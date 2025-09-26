import React from "react";
import { colors } from "../design-system";

interface FileUploadFieldProps {
  label: React.ReactNode;
  fieldName: string;
  fieldKey: string;
  file: File | null;
  onFileChange: (field: string, file: File | null) => void;
  error?: string | null;
  disabled?: boolean;
}

const FileUploadField: React.FC<FileUploadFieldProps> = ({ label, fieldName, fieldKey, file, onFileChange, error }) => {
  const [isUploading, setIsUploading] = React.useState(false);
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleFiles = (f: File | null) => {
    if (!f) {
      onFileChange(fieldKey, null);
      return;
    }

    setIsUploading(true);
    onFileChange(fieldKey, f);
    setTimeout(() => setIsUploading(false), 200);
  };

  return (
    <div>
      <label className="block text-sm font-medium mb-2" style={{ color: colors.base[700] }}>
        {label} <span style={{ color: colors.error[400] }}>*</span>
      </label>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragOver(false);
          const dropped = e.dataTransfer.files?.[0] || null;
          handleFiles(dropped);
        }}
        className={`w-full p-4 border rounded-xl bg-gray-50 ${isDragOver ? "border-dashed border-2" : ""} ${error ? "border-red-400" : ""}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex-1">
              {file ? (
                <div className="min-w-0">
                  <div className="font-medium truncate max-w-[300px]">{file.name}</div>
                  <div className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                </div>
              ) : (
                <div className="text-sm text-gray-500">Drag & drop a PDF here, or</div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {file && (
              <button type="button" className="text-sm text-red-600 hover:underline" onClick={() => handleFiles(null)}>
                Remove
              </button>
            )}

            <button
              type="button"
              className={`px-3 py-1 text-sm font-medium text-white rounded ${isUploading ? "opacity-60 cursor-wait" : ""}`}
              style={{ backgroundColor: colors.primary[300] }}
              onClick={() => document.getElementById(fieldName)?.click()}
              aria-disabled={isUploading}
            >
              {isUploading ? "Processing..." : "Browse"}
            </button>
            <input id={fieldName} aria-hidden style={{ display: "none" }} type="file" accept="application/pdf" className="hidden" onChange={(e) => handleFiles(e.target.files?.[0] || null)} />
          </div>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Only PDF files accepted. Max 5MB.</p>
        </div>
        <div>{error ? <div className="text-xs text-red-600">{error}</div> : <div className="text-xs text-transparent">&nbsp;</div>}</div>
      </div>
    </div>
  );
};

export default FileUploadField;
