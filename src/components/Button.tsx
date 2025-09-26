"use client";

import React from "react";
import { colors } from "../design-system";

type ButtonVariant = "primary" | "secondary" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  className?: string;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", size = "md", disabled = false, children, className = "", leftIcon, ...rest }) => {
  const baseClass = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus:outline-none focus:ring-2";

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  return (
    <button className={`${baseClass} ${sizeClasses[size]} ${disabledClass} ${className}`} disabled={disabled} style={variant === "primary" ? { backgroundColor: colors.primary[300], color: "#fff", borderRadius: 12 } : undefined} {...rest}>
      {leftIcon && <span style={{ display: "inline-flex", marginRight: 12, alignItems: "center" }}>{leftIcon}</span>}
      {children}
    </button>
  );
};

export default Button;
