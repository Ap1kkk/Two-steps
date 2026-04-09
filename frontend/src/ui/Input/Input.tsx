import React, { InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.scss';

import { ReactComponent as OpenEye } from '@icons/eye.svg';
import { ReactComponent as CloseEye } from '@icons/eye-slash.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	error?: string;
	helperText?: string;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	disabled?: boolean;
	required?: boolean;
	className?: string;
}

export const Input: React.FC<InputProps> = ({
	label,
	type = 'text',
	value,
	onChange,
	placeholder,
	error,
	helperText,
	iconLeft,
	iconRight,
	disabled = false,
	required = false,
	className,
	id,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
	const isPassword = type === 'password';
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	return (
		<div className={`${styles.wrapper} ${className}`}>
			{label && (
				<label htmlFor={inputId} className={styles.label}>
					{label}
				</label>
			)}

			<div
				className={`${styles['input-wrapper']} ${error ? styles.error : ''}`}>
				{iconLeft && <span className={styles['icon-left']}>{iconLeft}</span>}

				<input
					id={inputId}
					type={inputType}
					className={styles.input}
					disabled={disabled}
					aria-invalid={!!error}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					{...props}
				/>

				{(iconRight || isPassword) && (
					<span className={styles.rightIcon}>
						{isPassword ? (
							<button
								type='button'
								className={styles.passwordToggle}
								onClick={() => setShowPassword(!showPassword)}
								tabIndex={-1}
								aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}>
								{showPassword ? (
									<OpenEye
										className={styles.eyes}
									/>
								) : (
									<CloseEye
										className={styles.eyes}
									/>
								)}
							</button>
						) : (
							iconRight
						)}
					</span>
				)}
			</div>

			{helperText && !error && (
				<p className={styles.helperText}>{helperText}</p>
			)}

			{error && <p className={styles.errorText}>{error}</p>}
		</div>
	);
};