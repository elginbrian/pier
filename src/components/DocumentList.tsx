import React from 'react';

interface DocumentListProps {
  items: string[];
}

const DocumentList: React.FC<DocumentListProps> = ({ items }) => (
  <ul className="space-y-2 text-sm">
    {items.map((item, index) => (
      <li key={index}>• {item}</li>
    ))}
  </ul>
);

export default DocumentList;