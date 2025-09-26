import React, { useState } from 'react';

interface DocumentPreviewCardProps {
  title: string;
  filename: string;
  preview: string;
  downloadUrl?: string;
  onDownload?: () => void;
}

const DocumentPreviewCard: React.FC<DocumentPreviewCardProps> = ({ 
  title, 
  filename, 
  preview,
  downloadUrl,
  onDownload
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleClick = async () => {
    if (onDownload) {
      onDownload();
      return;
    }

    if (!downloadUrl) {
      alert('Download URL not available');
      return;
    }

    setIsDownloading(true);
    
    try {
      // Create a temporary anchor element to trigger download
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      link.style.display = 'none';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log(`Download initiated for: ${filename}`);
    } catch (error) {
      console.error('Download failed:', error);
      alert(`Sorry, failed to download "${filename}". Please try again.`);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div 
      className={`bg-white rounded-lg p-6 shadow-md cursor-pointer hover:shadow-lg transition-all duration-200 hover:border-blue-300 ${
        isDownloading ? 'opacity-75 cursor-wait' : ''
      }`}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="bg-gray-100 h-32 rounded-lg mb-4 flex items-center justify-center relative">
        <span className="text-gray-500 text-sm">{preview}</span>
      </div>
      <h4 className="text-lg font-semibold mb-2">{title}</h4>
      <p className="text-sm text-gray-600 mb-3">{filename}</p>
    </div>
  );
};

export default DocumentPreviewCard;