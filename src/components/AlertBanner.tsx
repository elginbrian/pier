import React from 'react';

interface AlertBannerProps {
  type?: 'info' | 'warning' | 'error' | 'success';
  message: string;
  className?: string;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ 
  type = 'info', 
  message, 
  className = '' 
}) => {
  const getStyles = () => {
    switch (type) {
      case 'info':
        return {
          container: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600 bg-blue-100',
          text: 'text-blue-700'
        };
      case 'warning':
        return {
          container: 'bg-yellow-50 border-yellow-200',
          icon: 'text-yellow-600 bg-yellow-100',
          text: 'text-yellow-700'
        };
      case 'error':
        return {
          container: 'bg-red-50 border-red-200',
          icon: 'text-red-600 bg-red-100',
          text: 'text-red-700'
        };
      case 'success':
        return {
          container: 'bg-green-50 border-green-200',
          icon: 'text-green-600 bg-green-100',
          text: 'text-green-700'
        };
    }
  };

  const styles = getStyles();

  return (
    <div className={`${styles.container} border rounded-lg p-4 flex items-start ${className}`}>
      <div className={`w-5 h-5 rounded-full flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 ${styles.icon}`}>
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
        </svg>
      </div>
      <p className={`text-sm ${styles.text}`}>
        {message}
      </p>
    </div>
  );
};

export default AlertBanner;