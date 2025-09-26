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
  const baseClass = "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 ease-in-out focus:outline-none focus:ring-2";

  const sizeClasses = {
    sm: "h-8 px-3 text-sm",
    md: "h-12 px-6 text-base",
    lg: "h-14 px-8 text-lg",
  };

  const disabledClass = disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer";

  const [hovered, setHovered] = React.useState(false);

  const variantStyle: React.CSSProperties | undefined = (() => {
    if (variant === "primary") {
      const bg = disabled ? colors.disabled[300] : hovered ? colors.primary[400] : colors.primary[300];
      return {
        backgroundColor: bg,
        color: "#fff",
        border: "none",
        borderRadius: 12,
      };
    }

    if (variant === "secondary") {
      const bg = disabled ? colors.disabled[300] : hovered ? colors.secondary[400] : colors.secondary[300];
      return {
        backgroundColor: bg,
        color: "#fff",
        border: "none",
        borderRadius: 12,
      };
    }

    if (variant === "outline") {
      const bg = hovered && !disabled ? colors.primary[300] : "transparent";
      const color = hovered && !disabled ? "#fff" : colors.primary[300];
      return {
        backgroundColor: bg,
        color,
        border: `2px solid ${colors.primary[300]}`,
        borderRadius: 12,
      };
    }

    return undefined;
  })();

  // Hover styles applied via inline style on :hover are not possible here; instead we add utility classes that slightly adjust using Tailwind-friendly classes and rely on transitions. For color changes that require token shades, use CSS variables in layout (available) or rely on slightly different shades via inline style on focus/active via onMouseEnter/onMouseLeave as a fallback. We'll add simple class-based scale and opacity transitions plus inline style base colors.

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      className={`${baseClass} ${sizeClasses[size]} ${disabledClass} ${className} hover:shadow-lg hover:-translate-y-0.5`}
      disabled={disabled}
      style={variantStyle}
      {...rest}
    >
      {leftIcon && <span style={{ display: "inline-flex", marginRight: 12, alignItems: "center" }}>{leftIcon}</span>}
      {children}
    </button>
  );
};

export default Button;
