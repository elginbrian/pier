"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Button from './Button';
import { colors } from '../design-system';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: () => void;
  autoClose?: boolean;
  duration?: number;
}

const FormSendSuccessModal: React.FC<SuccessModalProps> = ({ 
  isOpen, 
  onClose, 
  onLogin,
  autoClose = true,
  duration = 5000
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

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
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
            className="h-1 bg-gradient-to-r from-blue-400 to-blue-600"
            style={{
              animation: `shrink ${duration}ms linear forwards`
            }}
          />
        )}

        {/* Header */}
        <div 
          className="px-6 py-4 text-center text-white rounded-t-xl"
          style={{ backgroundColor: '#1e40af' }}
        >
          <h4 className="text-xl font-semibold">Formulir Terkirim</h4>
        </div>

        {/* Content */}
        <div className="px-6 py-6 text-center">
          <div className="mb-6">
            <Image 
              src="/send-form-success.png" 
              alt="Form Success" 
              width={120}
              height={120}
              className="mx-auto rounded-lg"
            />
          </div>
          
          <div className="space-y-4">
            <p className="text-gray-800 text-sm leading-relaxed">
              Terima kasih, formulir Anda telah kami terima. Kami sedang memproses dan memverifikasi data Anda.
            </p>
            
            <p className="text-gray-700 text-sm leading-relaxed">
              Harap cek email Anda (termasuk folder Spam) dalam beberapa jam ke depan. Anda akan menerima detail akun login (berisi email dan password) atau notifikasi feedback jika proses verifikasi data mengalami kendala.
            </p>
            
            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 text-left">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-blue-700 text-xs leading-relaxed">
                  Setelah menerima detail akun, silakan Masuk ke website kami untuk memantau perkembangan aplikasi Anda.
                </p>
              </div>
            </div>
            
            {/* Warning Box */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-left">
              <div className="flex items-start">
                <div className="w-5 h-5 rounded-full bg-yellow-100 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                  <svg className="w-3 h-3 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-yellow-700 text-xs leading-relaxed">
                  Data Anda aman dan hanya digunakan untuk verifikasi identitas. Kami tidak akan membagikan data ini kepada pihak ketiga.
                </p>
              </div>
            </div>
            
            <Button
              variant="primary"
              size="md"
              onClick={handleLogin}
              className="w-full mt-6"
              style={{ backgroundColor: '#1e40af' }}
            >
              Login
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

export default FormSendSuccessModal;