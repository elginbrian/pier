'use client';

import React, { forwardRef, useState, InputHTMLAttributes } from 'react';
import { colors } from '../design-system';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Input variant style */
  variant?: 'default' | 'bordered' | 'ghost';
  /** Input state */
  state?: 'default' | 'error' | 'success';
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Input label */
  label?: string;
  /** Error message */
  error?: string;
  /** Help text */
  helperText?: string;
  /** Custom container className */
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      variant = 'default',
      state = 'default',
      leftIcon,
      rightIcon,
      label,
      error,
      helperText,
      disabled = false,
      required = false,
      className = '',
      containerClassName = '',
      id,
      ...props
    },
    ref
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    // Determine actual state (error takes precedence)
    const actualState = error ? 'error' : state;

    // Container styles based on variant and state
    const getContainerStyles = (): React.CSSProperties => {
      const base: React.CSSProperties = {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        height: '56px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      };

      // Variant styles
      switch (variant) {
        case 'bordered':
          base.border = `1px solid ${colors.base[300]}`;
          base.backgroundColor = 'transparent';
          break;
        case 'ghost':
          base.border = 'none';
          base.backgroundColor = 'transparent';
          break;
        default:
          base.border = `1px solid ${colors.base[200]}`;
          base.backgroundColor = colors.base[100];
          break;
      }

      // State styles
      if (!disabled) {
        if (actualState === 'error') {
          base.borderColor = colors.error[400];
          if (isFocused) {
            base.borderColor = colors.error[500];
            base.boxShadow = `0 0 0 3px ${colors.error[100]}`;
          }
        } else if (actualState === 'success') {
          base.borderColor = colors.success[400];
          if (isFocused) {
            base.borderColor = colors.success[500];
            base.boxShadow = `0 0 0 3px ${colors.success[100]}`;
          }
        } else if (isFocused) {
          base.borderColor = colors.primary[400];
          base.boxShadow = `0 0 0 3px ${colors.primary[100]}`;
        }
      } else {
        base.borderColor = colors.disabled[300];
        base.backgroundColor = colors.disabled[100];
        base.cursor = 'not-allowed';
      }

      return base;
    };

    // Input styles
    const inputStyles: React.CSSProperties = {
      width: '100%',
      height: '100%',
      border: 'none',
      outline: 'none',
      backgroundColor: 'transparent',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '1.5',
      fontFamily: 'inherit',
      paddingLeft: leftIcon ? '44px' : '16px',
      paddingRight: rightIcon ? '44px' : '16px',
      color: disabled ? colors.disabled[500] : colors.base[700],
      cursor: disabled ? 'not-allowed' : 'text',
    };

    // Icon styles
    const iconStyles: React.CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '20px',
      height: '20px',
      color: disabled ? colors.disabled[400] : colors.base[500],
      pointerEvents: 'none',
    };

    const leftIconStyles = { ...iconStyles, left: '12px' };
    const rightIconStyles = { ...iconStyles, right: '12px' };

    return (
      <div className={containerClassName}>
        {label && (
          <label
            htmlFor={inputId}
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: disabled ? colors.disabled[400] : colors.base[700],
              marginBottom: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {label}
            {required && (
              <span style={{ color: colors.error[400], marginLeft: '4px' }}>*</span>
            )}
          </label>
        )}

        <div style={getContainerStyles()}>
          {leftIcon && <div style={leftIconStyles}>{leftIcon}</div>}
          
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            style={inputStyles}
            className={className}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
          />

          {rightIcon && <div style={rightIconStyles}>{rightIcon}</div>}
        </div>

        {(error || helperText) && (
          <div
            style={{
              fontSize: '12px',
              marginTop: '6px',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: error ? colors.error[500] : colors.base[500],
            }}
          >
            {error || helperText}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;