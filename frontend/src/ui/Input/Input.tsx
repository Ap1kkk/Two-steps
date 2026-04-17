import React, { InputHTMLAttributes, useState } from 'react';
import styles from './Input.module.scss';

import { ReactComponent as OpenEye } from '../../assets/icons/eye.svg';
import { ReactComponent as CloseEye } from '../../assets/icons/eye-slash.svg';
import { ReactComponent as ArrowUp } from '../../assets/icons/chevron-up-small.svg';
import { ReactComponent as ArrowDown } from '../../assets/icons/chevron-down-small.svg';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	value?: string | number;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder?: string;
	error?: string;
	helperText?: string;
	iconLeft?: React.ReactNode;
	iconRight?: React.ReactNode;
	disabled?: boolean;
	required?: boolean;
	className?: string;
	showNumberArrows?: boolean;
	inputPadding?: string;
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
	showNumberArrows = true,
	inputPadding = '14px 16px',
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const inputId = id || label?.toLowerCase().replace(/\s/g, '-');
	const isPassword = type === 'password';
	const isNumber = type === 'number';
	const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

	const handleIncrement = () => {
		if (disabled || !onChange) return;

		let currentValue =
			typeof value === 'number' ? value : parseFloat(String(value));
		if (isNaN(currentValue)) currentValue = 0;

		const step = props.step ? parseFloat(String(props.step)) : 1;
		const newValue = currentValue + step;

		const event = {
			target: {
				value: String(newValue),
				name: props.name,
				type: 'number',
			},
			currentTarget: { value: String(newValue) },
			bubbles: true,
			cancelable: true,
			defaultPrevented: false,
			isDefaultPrevented: () => false,
			isPropagationStopped: () => false,
			persist: () => {},
			preventDefault: () => {},
			stopPropagation: () => {},
			nativeEvent: new Event('change'),
			timeStamp: Date.now(),
			type: 'change',
		} as React.ChangeEvent<HTMLInputElement>;

		onChange(event);
	};

	const handleDecrement = () => {
		if (disabled || !onChange) return;

		let currentValue =
			typeof value === 'number' ? value : parseFloat(String(value));
		if (isNaN(currentValue)) currentValue = 0;

		const step = props.step ? parseFloat(String(props.step)) : 1;
		const newValue = currentValue - step;

		const event = {
			target: {
				value: String(newValue),
				name: props.name,
				type: 'number',
			},
			currentTarget: { value: String(newValue) },
			bubbles: true,
			cancelable: true,
			defaultPrevented: false,
			isDefaultPrevented: () => false,
			isPropagationStopped: () => false,
			persist: () => {},
			preventDefault: () => {},
			stopPropagation: () => {},
			nativeEvent: new Event('change'),
			timeStamp: Date.now(),
			type: 'change',
		} as React.ChangeEvent<HTMLInputElement>;

		onChange(event);
	};

	return (
		<div className={`${styles.wrapper} ${className}`}>
			{label && (
				<label htmlFor={inputId} className={styles.label}>
					{label}
				</label>
			)}

			<div
				className={`${styles['input-wrapper']} ${
					error ? styles.error : ''
				}`}
				style={inputPadding ? { padding: inputPadding } : undefined}>
				{iconLeft && (
					<span className={styles['icon-left']}>{iconLeft}</span>
				)}

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

				{isNumber && showNumberArrows && (
					<div className={styles['number-controls']}>
						<ArrowUp
							className={styles.arrowIcon}
							onClick={handleIncrement}
							tabIndex={-1}
						/>
						<ArrowDown
							className={styles.arrowIcon}
							onClick={handleDecrement}
							tabIndex={-1}
						/>
					</div>
				)}

				{(iconRight || isPassword) && (
					<span className={styles.rightIcon}>
						{isPassword ? (
							<button
								type='button'
								className={styles.passwordToggle}
								onClick={() => setShowPassword(!showPassword)}
								tabIndex={-1}
								aria-label={
									showPassword
										? 'Скрыть пароль'
										: 'Показать пароль'
								}>
								{showPassword ? (
									<OpenEye className={styles.eyes} />
								) : (
									<CloseEye className={styles.eyes} />
								)}
							</button>
						) : (
							iconRight
						)}
					</span>
				)}
			</div>

			{(error || helperText) && (
				<div className={styles['message-container']}>
					{helperText && !error && (
						<p className={styles.helperText}>{helperText}</p>
					)}
					{error && <p className={styles.errorText}>{error}</p>}
				</div>
			)}
		</div>
	);
};
