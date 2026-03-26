import React, { forwardRef, useState } from 'react';
import styles from './input.module.scss';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label?: string;
    type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    helperText?: string;
    padding?: number;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    disabled?: boolean;
    required?: boolean;
    fullWidth?: boolean;
    className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
                                                                   label,
                                                                   type = 'text',
                                                                   value,
                                                                   onChange,
                                                                   placeholder,
                                                                   error,
                                                                   helperText,
                                                                   padding = 12,
                                                                   leftIcon,
                                                                   rightIcon,
                                                                   disabled = false,
                                                                   required = false,
                                                                   fullWidth = false,
                                                                   className,
                                                                   id,
                                                                   ...props
                                                               }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    const isPassword = type === 'password';
    const inputType = isPassword && showPassword ? 'text' : type;

    const inputStyle: React.CSSProperties = {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: leftIcon ? padding + 24 : padding,
        paddingRight: (rightIcon || isPassword) ? padding + 24 : padding,
    };

    const wrapperClasses = [
        styles.wrapper,
        fullWidth && styles.fullWidth,
    ].filter(Boolean).join(' ');

    const inputClasses = [
        styles.input,
        error && styles.error,
        disabled && styles.disabled,
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={wrapperClasses}>
            {label && (
                <label htmlFor={inputId} className={styles.label}>
                    {label}
                    {required && <span className={styles.required}>*</span>}
                </label>
            )}

            <div className={styles.inputContainer}>
                {leftIcon && (
                    <span
                        className={styles.leftIcon}
                        style={{ left: padding }}
                    >
                        {leftIcon}
                    </span>
                )}

                <input
                    ref={ref}
                    id={inputId}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    className={inputClasses}
                    style={inputStyle}
                    aria-invalid={!!error}
                    aria-disabled={disabled}
                    {...props}
                />

                {(rightIcon || isPassword) && (
                    <span
                        className={styles.rightIcon}
                        style={{ right: padding }}
                    >
                        {isPassword ? (
                            <button
                                type="button"
                                className={styles.passwordToggle}
                                onClick={() => setShowPassword(!showPassword)}
                                tabIndex={-1}
                                aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        ) : (
                            rightIcon
                        )}
                    </span>
                )}
            </div>

            {helperText && !error && (
                <p className={styles.helperText}>
                    {helperText}
                </p>
            )}

            {error && (
                <p className={styles.errorText}>
                    {error}
                </p>
            )}
        </div>
    );
});

Input.displayName = 'Input';