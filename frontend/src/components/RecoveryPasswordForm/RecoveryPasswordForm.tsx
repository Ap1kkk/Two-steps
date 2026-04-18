import React, {
	useCallback,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import styles from './RecoveryPasswordForm.module.scss';
import {
	validateConfirmPassword,
	validatePassword,
} from '../../utils/validator';
import { Button, Input } from '@ui';

interface RecoveryPasswordFormProps {
	formData: {
		newPassword: string;
		oldPassword: string;
		passwordConfirmation: string;
	};
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.ChangeEvent<HTMLFormElement>) => void;
	isFormValid?: boolean;
	isLoading?: boolean;
	error?: string | null;
}

export const RecoveryPasswordForm: React.FC<RecoveryPasswordFormProps> = ({
	formData,
	onChange,
	onSubmit,
	isFormValid,
	isLoading = false,
	error = null,
}) => {
	const passwordRef = useRef<string>('');

	const [displayErrors, setDisplayErrors] = useState<{
		newPassword?: string;
		oldPassword?: string;
		passwordConfirmation?: string;
	}>({});

	const [touched, setTouched] = useState<{
		newPassword: boolean;
		oldPassword: boolean;
		passwordConfirmation: boolean;
	}>({
		newPassword: false,
		oldPassword: false,
		passwordConfirmation: false,
	});

	const [lastValidValues, setLastValidValues] = useState<{
		newPassword: string;
		oldPassword: string;
		passwordConfirmation: string;
	}>({
		newPassword: '',
		oldPassword: '',
		passwordConfirmation: '',
	});

	const passwordNewValidation = useMemo(() => {
		if (!formData.newPassword) {
			return { isValid: false, errorMessage: 'Пароль обязателен' };
		}
		return validatePassword(formData.newPassword);
	}, [formData.newPassword]);

	const passwordValidation = useMemo(() => {
		if (!formData.oldPassword) {
			return { isValid: false, errorMessage: 'Пароль обязателен' };
		}
		return validatePassword(formData.oldPassword);
	}, [formData.oldPassword]);

	const passwordConfirmationValidation = useMemo(() => {
		if (!formData.passwordConfirmation) {
			return { isValid: false, errorMessage: 'Подтвердите пароль' };
		}
		return validateConfirmPassword(
			formData.oldPassword,
			formData.passwordConfirmation
		);
	}, [formData.oldPassword, formData.passwordConfirmation]);

	useEffect(() => {
		if (touched.newPassword) {
			if (passwordNewValidation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					newPassword: undefined,
				}));
				setLastValidValues((prev) => ({
					...prev,
					newPassword: formData.newPassword,
				}));
			} else if (formData.newPassword !== lastValidValues.newPassword) {
				setDisplayErrors((prev) => ({
					...prev,
					newPassword: undefined,
				}));
			} else if (
				touched.newPassword &&
				!passwordNewValidation.isValid &&
				formData.newPassword === lastValidValues.newPassword
			) {
				setDisplayErrors((prev) => ({
					...prev,
					newPassword: passwordValidation.errorMessage,
				}));
			}
		}
	}, [
		passwordNewValidation,
		touched.newPassword,
		formData.newPassword,
		lastValidValues.newPassword,
	]);

	useEffect(() => {
		if (touched.oldPassword) {
			if (passwordValidation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					oldPassword: undefined,
				}));
				setLastValidValues((prev) => ({
					...prev,
					oldPassword: formData.oldPassword,
				}));
			} else if (formData.oldPassword !== lastValidValues.oldPassword) {
				setDisplayErrors((prev) => ({
					...prev,
					oldPassword: undefined,
				}));
			} else if (
				touched.oldPassword &&
				!passwordValidation.isValid &&
				formData.oldPassword === lastValidValues.oldPassword
			) {
				setDisplayErrors((prev) => ({
					...prev,
					oldPassword: passwordValidation.errorMessage,
				}));
			}
		}
	}, [
		passwordValidation,
		touched.oldPassword,
		formData.oldPassword,
		lastValidValues.oldPassword,
	]);

	useEffect(() => {
		if (touched.passwordConfirmation) {
			if (passwordConfirmationValidation.isValid) {
				setDisplayErrors((prev) => ({ ...prev, password: undefined }));
				setLastValidValues((prev) => ({
					...prev,
					passwordConfirmation: formData.passwordConfirmation,
				}));
			} else if (
				formData.passwordConfirmation !==
				lastValidValues.passwordConfirmation
			) {
				setDisplayErrors((prev) => ({ ...prev, password: undefined }));
			} else if (
				touched.passwordConfirmation &&
				!passwordConfirmationValidation.isValid &&
				formData.passwordConfirmation ===
					lastValidValues.passwordConfirmation
			) {
				setDisplayErrors((prev) => ({
					...prev,
					password: passwordConfirmationValidation.errorMessage,
				}));
			}
		}
	}, [
		passwordConfirmationValidation,
		touched.passwordConfirmation,
		formData.passwordConfirmation,
		lastValidValues.passwordConfirmation,
	]);

	const isClientFormValid = useMemo(() => {
		return (
			passwordNewValidation.isValid &&
			passwordValidation.isValid &&
			passwordConfirmationValidation.isValid
		);
	}, [
		passwordNewValidation.isValid,
		passwordValidation.isValid,
		passwordConfirmationValidation.isValid,
	]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const { name, value } = e.target;

			if (name === 'password') {
				passwordRef.current = value;
			}

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
		if (name === 'newPassword') {
			const validation = value
				? validatePassword(value)
				: { isValid: false, errorMessage: 'Пароль обязателен' };
			if (!validation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					newPassword: validation.errorMessage,
				}));
				setLastValidValues((prev) => ({
					...prev,
					newPassword: value,
				}));
			} else {
				setDisplayErrors((prev) => ({
					...prev,
					newPassword: undefined,
				}));
				setLastValidValues((prev) => ({
					...prev,
					newPassword: value,
				}));
			}
		} else if (name === 'password') {
			const validation = value
				? validatePassword(value)
				: { isValid: false, errorMessage: 'Пароль обязателен' };
			if (!validation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					oldPassword: validation.errorMessage,
				}));
				setLastValidValues((prev) => ({
					...prev,
					oldPassword: value,
				}));
			} else {
				setDisplayErrors((prev) => ({
					...prev,
					oldPassword: undefined,
				}));
				setLastValidValues((prev) => ({
					...prev,
					oldPassword: value,
				}));
			}
		} else if (name === 'passwordConfirmation') {
			const passwordValue = passwordRef.current;

			const validation = value
				? validateConfirmPassword(passwordValue, value)
				: {
						isValid: false,
						errorMessage: 'Подтверждение пароля обязательно',
				  };

			if (!validation.isValid) {
				setDisplayErrors((prev) => ({
					...prev,
					passwordConfirmation: validation.errorMessage,
				}));
				setLastValidValues((prev) => ({
					...prev,
					passwordConfirmation: value,
				}));
			} else {
				setDisplayErrors((prev) => ({
					...prev,
					passwordConfirmation: undefined,
				}));
				setLastValidValues((prev) => ({
					...prev,
					passwordConfirmation: value,
				}));
			}
		}
	}, []);

	const handleSubmit = useCallback(
		(e: React.ChangeEvent<HTMLFormElement>) => {
			e.preventDefault();

			setTouched({newPassword: true, oldPassword: true, passwordConfirmation: true });

			const passwordNewError = !passwordNewValidation.isValid
				? passwordNewValidation.errorMessage
				: undefined;
			const passwordError = !passwordValidation.isValid
				? passwordValidation.errorMessage
				: undefined;
			const passwordConfirmationError =
				!passwordConfirmationValidation.isValid
					? passwordConfirmationValidation.errorMessage
					: undefined;

			setDisplayErrors({
				newPassword: passwordNewError,
				oldPassword: passwordError,
				passwordConfirmation: passwordConfirmationError,
			});

			setLastValidValues({
				newPassword: formData.newPassword,
				oldPassword: formData.oldPassword,
				passwordConfirmation: formData.passwordConfirmation,
			});

			if (
				passwordNewValidation.isValid &&
				passwordValidation.isValid &&
				passwordConfirmationValidation.isValid
			) {
				onSubmit(e);
			}
		},
		[
			passwordNewValidation,
			passwordValidation,
			passwordConfirmationValidation,
			onSubmit,
			formData.newPassword,
			formData.oldPassword,
			formData.passwordConfirmation,
		]
	);

	const isDisabled = useMemo(() => {
		return !isFormValid || isLoading || !isClientFormValid;
	}, [isFormValid, isLoading, isClientFormValid]);

	return (
		<div className={styles.container}>
			<div className={styles.errorContainer}>
				<h2 className={styles.title}>Восстановление пароля</h2>
				{error && <p className={styles.error}>{error}</p>}
			</div>
			<form className={styles.confirmationForm} onSubmit={handleSubmit}>
				<Input
					type={'newPassword'}
					name={'newPassword'}
					label={'Новый пароль'}
					value={formData.newPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					required={true}
					placeholder={'Введите пароль'}
					error={displayErrors.newPassword}
				/>

				<Input
					type={'oldPassword'}
					name={'oldPassword'}
					label={'Пароль'}
					value={formData.oldPassword}
					onChange={handleChange}
					onBlur={handleBlur}
					required={true}
					placeholder={'Введите пароль'}
					error={displayErrors.oldPassword}
				/>

				<Input
					type={'passwordConfirmation'}
					name={'passwordConfirmation'}
					label={'Подвтердите пароль'}
					value={formData.passwordConfirmation}
					onChange={handleChange}
					onBlur={handleBlur}
					required={true}
					placeholder={'Подтвердите пароль'}
					error={displayErrors.passwordConfirmation}
				/>

				<Button
					children={isLoading ? 'Вход...' : 'Подтвердить'}
					disabled={isDisabled}
					type='submit'
					variant='primary'
					className={styles.buttonSubmitForm}
				/>
			</form>
		</div>
	);
};
