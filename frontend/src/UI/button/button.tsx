import React from 'react';
import styles from './button.module.scss';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	variant?: ButtonVariant;
	padding?: number;
	fullWidth?: boolean;
	isLoading?: boolean;
	leftIcon?: React.ReactNode;
	rightIcon?: React.ReactNode;
	children: React.ReactNode;
	className?: string;
}

export const Button: React.FC<ButtonProps> = ({
	variant = 'primary',
	padding = 6,
	fullWidth = false,
	isLoading = false,
	leftIcon,
	rightIcon,
	children,
	disabled,
	className,
	...props
	}) => {
	const buttonStyle: React.CSSProperties = {
		paddingTop: 12,
		paddingBottom: 12,
		paddingLeft: padding,
		paddingRight: padding,
	};

	const buttonClasses = [
		styles.button,
		styles[variant],
		fullWidth && styles.fullWidth,
		isLoading && styles.loading,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<button
			className={buttonClasses}
			style={buttonStyle}
			disabled={disabled || isLoading}
			{...props}
		>
			{isLoading && <span className={styles.spinner} aria-hidden='true' />}
			{!isLoading && leftIcon && (
				<span className={styles.leftIcon}>{leftIcon}</span>
			)}
			<span className={styles.content}>{children}</span>
			{!isLoading && rightIcon && (
				<span className={styles.rightIcon}>{rightIcon}</span>
			)}
		</button>
	);
};
