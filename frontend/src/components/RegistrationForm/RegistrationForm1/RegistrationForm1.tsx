import React, { useCallback, useMemo, useState } from 'react';
import {
	validateConfirmPassword,
	validateEmail,
	validatePassword,
} from '../../../utils/validator';
import { Button, Input } from '@ui';
import styles from './RegistrationForm1.module.scss';

interface RegistrationForm1Props {
	onNext: (data: { email: string; password: string }) => void;
	initialData?: { email: string; password: string };
}

const RegistrationForm1: React.FC<RegistrationForm1Props> = ({
																 onNext,
																 initialData,
															 }) => {
	const [email, setEmail] = useState(initialData?.email || '');
	const [password, setPassword] = useState(initialData?.password || '');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState<{
		email?: string;
		password?: string;
		confirmPassword?: string;
	}>({});
	const [touched, setTouched] = useState<{
		email: boolean;
		password: boolean;
		confirmPassword: boolean;
	}>({
		email: false,
		password: false,
		confirmPassword: false,
	});

	const emailValidation = useMemo(() => validateEmail(email), [email]);
	const passwordValidation = useMemo(
		() => validatePassword(password),
		[password]
	);
	const confirmPasswordValidation = useMemo(
		() => validateConfirmPassword(password, confirmPassword),
		[password, confirmPassword]
	);

	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
			if (touched.email) {
				setErrors((prev) => ({ ...prev, email: undefined }));
			}
		},
		[touched.email]
	);

	const handlePasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value);
			if (touched.password) {
				setErrors((prev) => ({ ...prev, password: undefined }));
			}
		},
		[touched.password]
	);

	const handleConfirmPasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setConfirmPassword(e.target.value);
			if (touched.confirmPassword) {
				setErrors((prev) => ({ ...prev, confirmPassword: undefined }));
			}
		},
		[touched.confirmPassword]
	);

	const handleEmailBlur = useCallback(() => {
		setTouched((prev) => ({ ...prev, email: true }));
		if (!emailValidation.isValid && email) {
			setErrors((prev) => ({
				...prev,
				email: emailValidation.errorMessage,
			}));
		}
	}, [emailValidation.isValid, emailValidation.errorMessage, email]);

	const handlePasswordBlur = useCallback(() => {
		setTouched((prev) => ({ ...prev, password: true }));
		if (!passwordValidation.isValid && password) {
			setErrors((prev) => ({
				...prev,
				password: passwordValidation.errorMessage,
			}));
		}
	}, [passwordValidation.isValid, passwordValidation.errorMessage, password]);

	const handleConfirmPasswordBlur = useCallback(() => {
		setTouched((prev) => ({ ...prev, confirmPassword: true }));
		if (!confirmPasswordValidation.isValid && confirmPassword) {
			setErrors((prev) => ({
				...prev,
				confirmPassword: confirmPasswordValidation.errorMessage,
			}));
		}
	}, [
		confirmPasswordValidation.isValid,
		confirmPasswordValidation.errorMessage,
		confirmPassword,
	]);

	const validateForm = useCallback((): boolean => {
		const newErrors: {
			email?: string;
			password?: string;
			confirmPassword?: string;
		} = {};

		if (!emailValidation.isValid) {
			newErrors.email = emailValidation.errorMessage;
		}
		if (!passwordValidation.isValid) {
			newErrors.password = passwordValidation.errorMessage;
		}
		if (!confirmPasswordValidation.isValid) {
			newErrors.confirmPassword = confirmPasswordValidation.errorMessage;
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	}, [emailValidation, passwordValidation, confirmPasswordValidation]);

	const handleSubmit = useCallback(
		(e: React.FormEvent) => {
			e.preventDefault();

			setTouched({
				email: true,
				password: true,
				confirmPassword: true,
			});

			if (validateForm()) {
				onNext({ email, password });
			}
		},
		[email, password, validateForm, onNext]
	);

	const passwordHelperText =
		password && !errors.password && passwordValidation.isValid
			? '✓ Пароль подходит'
			: undefined;

	return (
		<div className={styles.container}>
			<div className={styles.stepCounter}>
				<span className={styles.stepTitle}>Шаг 1</span>
				<ul className={styles.dashList}>
					<li className={`${styles.dash} ${styles.dashActive}`}></li>
					<li className={styles.dash}></li>
					<li className={styles.dash}></li>
				</ul>
			</div>
			<form onSubmit={handleSubmit} className={styles.regForm} noValidate>
				<Input
					id='email'
					type='email'
					label='Email'
					name='email'
					value={email}
					onChange={handleEmailChange}
					onBlur={handleEmailBlur}
					placeholder='example@mail.com'
					required={true}
					error={touched.email ? errors.email : undefined}
				/>

				<Input
					id='password'
					type='password'
					label='Пароль'
					name='password'
					value={password}
					onChange={handlePasswordChange}
					onBlur={handlePasswordBlur}
					placeholder='Минимум 6 символов'
					required={true}
					error={touched.password ? errors.password : undefined}
					helperText={passwordHelperText}
				/>

				<Input
					id='confirmPassword'
					type='password'
					label='Подтвердите пароль'
					name='confirmPassword'
					value={confirmPassword}
					onChange={handleConfirmPasswordChange}
					onBlur={handleConfirmPasswordBlur}
					placeholder='Введите пароль ещё раз'
					required={true}
					error={
						touched.confirmPassword
							? errors.confirmPassword
							: undefined
					}
				/>

				<Button
					variant={'primary'}
					type='submit'
					className={styles.nextButton}>
					Далее
				</Button>
			</form>
		</div>
	);
};

export default RegistrationForm1;