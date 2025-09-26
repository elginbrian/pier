"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { colors } from '../design-system';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRetry?: () => void;
  title?: string;
  message?: string;
  errorDetails?: string;
  autoClose?: boolean;
  duration?: number;
}

const FormSendErrorModal: React.FC<ErrorModalProps> = ({ 
  isOpen, 
  onClose, 
  onRetry,
  title = "Terjadi Kesalahan",
  message = "Maaf, terjadi kesalahan saat memproses formulir Anda. Silakan coba lagi atau hubungi tim support kami.",
  errorDetails,
  autoClose = false,
  duration = 8000
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, duration);
        
        return () => clearTimeout(timer);
      }
    } else {
      setIsVisible(false);
    }
  }, [isOpen, autoClose, duration]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleRetry = () => {
    if (onRetry) {
      onRetry();
    }
    handleClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop Overlay */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal Container */}
      <div 
        className={`relative bg-white rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 ease-out max-w-lg w-full mx-4 ${
          isVisible 
            ? 'translate-y-0 opacity-100 scale-100' 
            : 'translate-y-4 opacity-0 scale-95'
        }`}
      >
        {/* Progress Bar */}
        {autoClose && (
          <div 
            className="h-1 bg-gradient-to-r from-red-400 to-red-600"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        )}

        {/* Header */}
        <div 
          className="px-6 py-4 text-center text-white rounded-t-xl"
          style={{ backgroundColor: '#dc2626' }}
        >
          <h4 className="text-xl font-semibold">Formulir Gagal Terkirim</h4>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center">
          <div className="mb-6">
            <Image 
              src="/send-form-failed.png" 
              alt="Form Failed" 
              width={120}
              height={120}
              className="mx-auto rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-800 text-sm leading-relaxed">
              Mohon maaf, terjadi kendala saat mengirimkan formulir Anda. Hal ini sering disebabkan oleh koneksi internet yang terputus atau format file yang tidak didukung.
            </p>
            
            {/* Warning Box */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-left">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-red-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-red-700 text-xs leading-relaxed">
                  Jika Anda terus mengalami masalah, silakan hubungi tim dukungan kami untuk bantuan.
                </p>
              </div>
            </div>
            
            {errorDetails && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                <p className="text-xs text-gray-600 font-mono">{errorDetails}</p>
              </div>
            )}
            
            <Button
              variant="primary"
              size="md"
              onClick={handleRetry || handleClose}
              className="w-full mt-6"
              style={{ backgroundColor: '#dc2626' }}
            >
              Coba Lagi
            </Button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default FormSendErrorModal;