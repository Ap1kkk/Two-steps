import React from 'react';
import { Link } from 'react-router-dom';
import styles from './register-form.module.scss';
import { Button } from '@ui';
import { Input } from '../../ui/Input';

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
					placeholder={'Введите имя'}
				/>
				<Input
					type={'email'}
					name='email'
					label={'Email'}
					value={formData.email}
					onChange={onChange}
					placeholder={'example@mail.com'}
				/>
				<Input
					type={'password'}
					name='password'
					label={'Пароль'}
					value={formData.password}
					onChange={onChange}
					placeholder={'Минимум 6 символов'}
				/>
				<Input
					type={'password'}
					name='confirmPassword'
					label={'Подтверждение пароля'}
					value={formData.confirmPassword}
					onChange={onChange}
					placeholder={'Повторите пароль'}
					error={passwordError}
				/>

				<Button
					disabled={!isFormValid || isLoading}
					type='submit'
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
