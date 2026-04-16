import React, {
	useCallback,
	useEffect,
	useMemo,
	useState,
	useRef,
} from 'react';
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
	const [displayErrors, setDisplayErrors] = useState<{
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

	const [lastValidValues, setLastValidValues] = useState<{
		email: string;
		password: string;
	}>({
		email: '',
		password: '',
	});

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
		return validatePassword(formData.password);
	}, [formData.password]);

	useEffect(() => {
		if (touched.email) {
			if (emailValidation.isValid) {
				setDisplayErrors((prev) => ({ ...prev, email: undefined }));
				setLastValidValues((prev) => ({
					...prev,
					email: formData.email,
				}));
			} else if (formData.email !== lastValidValues.email) {
				setDisplayErrors((prev) => ({ ...prev, email: undefined }));
			} else if (
				touched.email &&
				!emailValidation.isValid &&
				formData.email === lastValidValues.email
			) {
				setDisplayErrors((prev) => ({
					...prev,
					email: emailValidation.errorMessage,
				}));
			}
		}
	}, [emailValidation, touched.email, formData.email, lastValidValues.email]);

	useEffect(() => {
		if (touched.password) {
			if (passwordValidation.isValid) {
				setDisplayErrors((prev) => ({ ...prev, password: undefined }));
				setLastValidValues((prev) => ({
					...prev,
					password: formData.password,
				}));
			} else if (formData.password !== lastValidValues.password) {
				setDisplayErrors((prev) => ({ ...prev, password: undefined }));
			} else if (
				touched.password &&
				!passwordValidation.isValid &&
				formData.password === lastValidValues.password
			) {
				setDisplayErrors((prev) => ({
					...prev,
					password: passwordValidation.errorMessage,
				}));
			}
		}
	}, [
		passwordValidation,
		touched.password,
		formData.password,
		lastValidValues.password,
	]);

	const isClientFormValid = useMemo(() => {
		return emailValidation.isValid && passwordValidation.isValid;
	}, [emailValidation.isValid, passwordValidation.isValid]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;
			onChange(e);

			if (touched[name as keyof typeof touched]) {
				setDisplayErrors((prev) => ({ ...prev, [name]: undefined }));
			}
		},
		[onChange, touched]
	);

	const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
		const { name, value } = e.target;

		setTouched((prev) => ({ ...prev, [name]: true }));

		if (name === 'email') {
			const validation = value
				? validateEmail(value)
				: { isValid: false, errorMessage: 'Email обязателен' };
			if (!validation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					email: validation.errorMessage,
				}));
				setLastValidValues((prev) => ({ ...prev, email: value }));
			} else {
				setDisplayErrors((prev) => ({ ...prev, email: undefined }));
				setLastValidValues((prev) => ({ ...prev, email: value }));
			}
		} else if (name === 'password') {
			const validation = value
				? validatePassword(value)
				: { isValid: false, errorMessage: 'Пароль обязателен' };
			if (!validation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					password: validation.errorMessage,
				}));
				setLastValidValues((prev) => ({ ...prev, password: value }));
			} else {
				setDisplayErrors((prev) => ({ ...prev, password: undefined }));
				setLastValidValues((prev) => ({ ...prev, password: value }));
			}
		}
	}, []);

	const handleSubmit = useCallback(
		(e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();

			setTouched({ email: true, password: true });

			const emailError = !emailValidation.isValid
				? emailValidation.errorMessage
				: undefined;
			const passwordError = !passwordValidation.isValid
				? passwordValidation.errorMessage
				: undefined;

			setDisplayErrors({
				email: emailError,
				password: passwordError,
			});

			setLastValidValues({
				email: formData.email,
				password: formData.password,
			});

			if (emailValidation.isValid && passwordValidation.isValid) {
				onSubmit(e);
			}
		},
		[
			emailValidation,
			passwordValidation,
			onSubmit,
			formData.email,
			formData.password,
		]
	);

	const isDisabled = useMemo(() => {
		return !isFormValid || isLoading || !isClientFormValid;
	}, [isFormValid, isLoading, isClientFormValid]);

	return (
		<div className={styles.container}>
			<div className={styles.errorContainer}>
				<h2 className={styles.title}>Вход в профиль</h2>
				{error && <p className={styles.error}>{error}</p>}
			</div>
			<form className={styles.authForm} onSubmit={handleSubmit}>
				<Input
					type={'email'}
					name='email'
					label={'Email'}
					value={formData.email}
					onChange={handleChange}
					onBlur={handleBlur}
					required={true}
					placeholder={'example@mail.com'}
					error={displayErrors.email}
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
					error={displayErrors.password}
				/>

				<Button
					children={isLoading ? 'Вход...' : 'Войти'}
					disabled={isDisabled}
					type='submit'
					variant='primary'
					className={styles.buttonSubmitForm}
				/>
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
