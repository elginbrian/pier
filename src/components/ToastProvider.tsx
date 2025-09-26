"use client";
import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import Toast from "./Toast";

type ToastItem = { id: string; type: "success" | "error" | "info"; message: string };

const ToastContext = createContext<{ showToast: (type: ToastItem["type"], message: string) => void } | undefined>(undefined);

export const useToasts = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToasts must be used within ToastProvider");
  return ctx;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastItem["type"], message: string) => {
    const id = String(Date.now()) + Math.random().toString(36).slice(2, 7);
    setToasts((s) => [...s, { id, type, message }]);
    setTimeout(() => {
      setToasts((s) => s.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  useEffect(() => {
    if (toasts.length > 3) setToasts((t) => t.slice(-3));
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-50">
        {toasts.map((t) => (
          <Toast key={t.id} type={t.type} message={t.message} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
