import React from 'react';
import { Link } from 'react-router-dom';
import styles from './register-form.module.scss';
import { Button } from '@ui';
import { Input } from '../../ui/input/input';

interface RegisterFormProps {
	formData: {
		username: string;
		email: string;
		password: string;
		confirmPassword: string;
	};
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	isFormValid: boolean;
	isLoading?: boolean;
	error?: string | null;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
	formData,
	onChange,
	onSubmit,
	isFormValid,
	isLoading = false,
	error = null,
}) => {
	const isPasswordMatch = formData.password === formData.confirmPassword;
	const passwordError =
		formData.confirmPassword && !isPasswordMatch
			? 'Пароли не совпадают'
			: undefined;

	return (
		<main className={styles.container}>
			<h2 className={styles.title}>Регистрация профиля</h2>

			{error && <p className={styles.error}>{error}</p>}

			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={'text'}
					name='username'
					label={'Имя'}
					value={formData.username}
					onChange={onChange}
					fullWidth={true}
					placeholder={'Введите имя'}
				/>
				<Input
					type={'email'}
					name='email'
					label={'Email'}
					value={formData.email}
					onChange={onChange}
					fullWidth={true}
					placeholder={'example@mail.com'}
				/>
				<Input
					type={'password'}
					name='password'
					label={'Пароль'}
					value={formData.password}
					onChange={onChange}
					fullWidth={true}
					placeholder={'Минимум 6 символов'}
				/>
				<Input
					type={'password'}
					name='confirmPassword'
					label={'Подтверждение пароля'}
					value={formData.confirmPassword}
					onChange={onChange}
					fullWidth={true}
					placeholder={'Повторите пароль'}
					error={passwordError}
					padding={14}
				/>

				<Button
					disabled={!isFormValid || isLoading}
					type='submit'
					fullWidth={true}
					variant='primary'>
					<p children={isLoading ? 'Регистрация...' : 'Продолжить'} />
				</Button>
			</form>

			<div className={styles.login}>
				<span className={styles.login__text}>Уже есть аккаунт?</span>
				<Link to='/login' className={styles.link}>
					<a className={styles.text}>Авторизация</a>
				</Link>
			</div>
		</main>
	);
};

export default RegisterForm;
