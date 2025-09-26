import React from 'react';

interface DocumentPreviewCardProps {
  title: string;
  filename: string;
  preview: string;
}

const DocumentPreviewCard: React.FC<DocumentPreviewCardProps> = ({ 
  title, 
  filename, 
  preview 
}) => (
  <div className="bg-white rounded-lg p-6 shadow-sm border">
    <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center">
      <span className="text-gray-500 text-sm">{preview}</span>
    </div>
    <h4 className="font-semibold mb-2">{title}</h4>
    <p className="text-sm text-gray-600 mb-3">{filename}</p>
  </div>
);

export default DocumentPreviewCard;