import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './AuthorizationForm.module.scss';
import { Button, Input } from '@ui';
import { validateEmail } from '../../utils/validator';

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

	const [lastEmailError, setLastEmailError] = useState<string | undefined>(
		undefined
	);

	const emailValidation = useMemo(() => {
		if (!formData.email) {
			return { isValid: false, errorMessage: 'Email обязателен' };
		}
		return validateEmail(formData.email);
	}, [formData.email]);

	const passwordValidation = useMemo(() => {
		if (!formData.password) {
			return { isValid: false, errorMessage: 'Пароль обязателен' };
		}
		return { isValid: true };
	}, [formData.password]);

	useEffect(() => {
		if (touched.email) {
			const error = emailValidation.isValid
				? undefined
				: emailValidation.errorMessage;
			setLastEmailError(error);
			setFieldErrors((prev) => ({
				...prev,
				email: error,
			}));
		}
	}, [emailValidation, touched.email]);

	useEffect(() => {
		if (touched.password) {
			setFieldErrors((prev) => ({
				...prev,
				password: passwordValidation.isValid
					? undefined
					: passwordValidation.errorMessage,
			}));
		}
	}, [passwordValidation, touched.password]);

	const isClientFormValid = useMemo(() => {
		return emailValidation.isValid && passwordValidation.isValid;
	}, [emailValidation.isValid, passwordValidation.isValid]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name } = e.target;
			onChange(e);

			if (name === 'password' && touched.password) {
				setFieldErrors((prev) => ({
					...prev,
					password: undefined,
				}));
			}
		},
		[onChange, touched]
	);

	const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
		const { name } = e.target;
		setTouched((prev) => ({ ...prev, [name]: true }));
	}, []);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			setTouched({ email: true, password: true });
			const emailError = emailValidation.isValid
				? undefined
				: emailValidation.errorMessage;
			const passwordError = passwordValidation.isValid
				? undefined
				: passwordValidation.errorMessage;

			setLastEmailError(emailError);
			setFieldErrors({
				email: emailError,
				password: passwordError,
			});
			if (emailValidation.isValid && passwordValidation.isValid) {
				onSubmit(e);
			}
		},
		[
			emailValidation.isValid,
			passwordValidation.isValid,
			onSubmit,
			emailValidation.errorMessage,
			passwordValidation.errorMessage,
		]
	);

	const isDisabled = useMemo(() => {
		return !isFormValid || isLoading || !isClientFormValid;
	}, [isFormValid, isLoading, isClientFormValid]);

	const displayEmailError = touched.email ? lastEmailError : undefined;

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
					error={displayEmailError}
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

				<Button disabled={isDisabled} type='submit' variant='primary'>
					<p className={styles.buttonText}>
						{isLoading ? 'Вход...' : 'Войти'}
					</p>
				</Button>
			</form>

			<div className={styles.links}>
				<Link to='/forgot-password' className={styles.link}>
					Забыли пароль?
				</Link>

				<div className={styles.register}>
					<p className={styles.registerText}>Нет аккаунта?</p>
					<Link to='/registration' className={styles.link}>
						Зарегистрироваться
					</Link>
				</div>
			</div>
		</div>
	);
};
