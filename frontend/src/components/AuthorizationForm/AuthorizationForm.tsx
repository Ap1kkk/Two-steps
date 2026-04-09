import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthorizationForm.module.scss';
import { Button, Input } from '@ui';
import { validateEmail, validatePassword } from '../../utils/validator';

interface AuthorizationFormProps {
	formData: {
		email: string;
		password: string;
	};
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isFormValid: boolean;
	isLoading?: boolean;
	error?: string | null;
}

export const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
	formData,
	onChange,
	onSubmit,
	isFormValid,
	isLoading = false,
	error = null,
}) => {
	const [fieldErrors, setFieldErrors] = useState<{
		email?: string;
		password?: string;
	}>({});

	const [touched, setTouched] = useState<{
		email: boolean;
		password: boolean;
	}>({
		email: false,
		password: false,
	});

	const validateEmailField = (email: string) => {
		const result = validateEmail(email);
		if (!result.isValid) {
			setFieldErrors((prev) => ({ ...prev, email: result.errorMessage }));
			return false;
		} else {
			setFieldErrors((prev) => ({ ...prev, email: undefined }));
			return true;
		}
	};

	const validatePasswordField = (password: string) => {
		const result = validatePassword(password);
		if (!result.isValid) {
			setFieldErrors((prev) => ({
				...prev,
				password: result.errorMessage,
			}));
			return false;
		} else {
			setFieldErrors((prev) => ({ ...prev, password: undefined }));
			return true;
		}
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		onChange(e);

		if (touched[name as keyof typeof touched]) {
			if (name === 'email') {
				validateEmailField(value);
			} else if (name === 'password') {
				validatePasswordField(value);
			}
		}
	};

	const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setTouched((prev) => ({ ...prev, [name]: true }));

		if (name === 'email') {
			validateEmailField(value);
		} else if (name === 'password') {
			validatePasswordField(value);
		}
	};

	const isClientFormValid = () => {
		const isEmailValid = validateEmailField(formData.email);
		const isPasswordValid = validatePasswordField(formData.password);
		return isEmailValid && isPasswordValid;
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		setTouched({ email: true, password: true });

		const isEmailValid = validateEmailField(formData.email);
		const isPasswordValid = validatePasswordField(formData.password);

		if (isEmailValid && isPasswordValid) {
			onSubmit(e);
		}
	};

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>Вход в профиль</h2>

			{error && <p className={styles.error}>{error}</p>}

			<form className={styles.form} onSubmit={handleSubmit}>
				<Input
					type={'email'}
					name='email'
					label={'Email'}
					value={formData.email}
					onChange={handleChange}
					onBlur={handleBlur}
					required={true}
					placeholder={'example@mail.com'}
					error={touched.email ? fieldErrors.email : undefined}
				/>

				<Input
					type={'password'}
					name='password'
					label={'Пароль'}
					value={formData.password}
					onChange={handleChange}
					onBlur={handleBlur}
					required={true}
					placeholder={'Введите пароль'}
					error={touched.password ? fieldErrors.password : undefined}
				/>

				<Button
					disabled={!isFormValid || isLoading || !isClientFormValid()}
					type='submit'
					variant='primary'>
					<p
						className={styles.buttonText}
						children={isLoading ? 'Вход...' : 'Войти'}
					/>
				</Button>
			</form>

			<div className={styles.links}>
				<Link to='/forgot-password' className={styles.link}>
					Забыли пароль?
				</Link>

				<div className={styles.register}>
					<p className={styles.registerText}>Нет аккаунта?</p>
					<Link to='/register' className={styles.link}>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</div>
	);
};
