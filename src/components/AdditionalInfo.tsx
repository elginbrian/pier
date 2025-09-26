import React from 'react';

interface AdditionalInfoProps {
  descriptions: string[];
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = ({ descriptions }) => (
  <div className="text-sm space-y-3">
    {descriptions.map((desc, index) => (
      <p 
        key={index} 
        className={index === 2 ? "text-gray-700 font-medium" : "text-gray-700"}
      >
        {desc}
      </p>
    ))}
  </div>
);

export default AdditionalInfo;