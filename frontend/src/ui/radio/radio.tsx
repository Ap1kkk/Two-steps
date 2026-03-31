import React, { type InputHTMLAttributes } from 'react';
import styles from './radio.module.css';

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
	label?: string;
}

export const Radio: React.FC<RadioProps> = ({
	name,
	value,
	checked,
	onChange,
	label,
	disabled = false,
	className,
	id,
	...rest
}) => {
	const radioId = id || `radio-${name}-${value}`;

	return (
		<label
			className={`${styles.radioLabel} ${disabled ? styles.disabled : ''} ${className || ''}`}
			htmlFor={radioId}
		>
			<div className={styles.radioWrapper}>
				<input
					type="radio"
					id={radioId}
					name={name}
					value={value}
					checked={checked}
					onChange={onChange}
					disabled={disabled}
					className={styles.hiddenInput}
					{...rest}
				/>
				<div className={styles.customRadio}>{checked && <div className={styles.dot} />}</div>
			</div>
			{label && <span className={styles.labelText}>{label}</span>}
		</label>
	);
};
