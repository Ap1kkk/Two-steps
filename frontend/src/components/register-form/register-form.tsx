import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from "../UI/input/input";
import { Text } from "../UI/text/Text";
import styles from './register-form.module.scss';
import {Button} from "../UI/button/button";

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
	const passwordError = formData.confirmPassword && !isPasswordMatch
		? 'Пароли не совпадают'
		: undefined;

	return (
		<main className={styles.container}>
			<Text
				as={'h1'}
				weight={500}
				family={'yandex'}
				size={24}
				align={'center'}
				className={styles.title}
			>
				Регистрация профиля
			</Text>

			{error && (
				<Text
					as="p"
					family="yandex"
					align="center"
					className={styles.error}
				>
					{error}
				</Text>
			)}

			<form className={styles.form} onSubmit={onSubmit}>
				<Input
					type={'text'}
					name="username"
					label={'Имя'}
					value={formData.username}
					onChange={onChange}
					required={true}
					fullWidth={true}
					placeholder={'Введите имя'}
				/>
				<Input
					type={'email'}
					name="email"
					label={'Email'}
					value={formData.email}
					onChange={onChange}
					required={true}
					fullWidth={true}
					placeholder={'example@mail.com'}
				/>
				<Input
					type={'password'}
					name="password"
					label={'Пароль'}
					value={formData.password}
					onChange={onChange}
					required={true}
					fullWidth={true}
					placeholder={'Минимум 6 символов'}
				/>
				<Input
					type={'password'}
					name="confirmPassword"
					label={'Подтверждение пароля'}
					value={formData.confirmPassword}
					onChange={onChange}
					required={true}
					fullWidth={true}
					placeholder={'Повторите пароль'}
					error={passwordError}
					padding={14}
				/>

				<Button
					disabled={!isFormValid || isLoading}
					type='submit'
					fullWidth={true}
					variant="primary"
				>
					<Text
						as={'text'}
						weight={400}
						family={'yandex'}
						size={14}
						children={isLoading ? 'Регистрация...' : 'Продолжить'}
					/>
				</Button>
			</form>

			<div className={styles.login}>
				<Text
					as={'span'}
					weight={400}
					family={'yandex'}
					className={styles.login__text}
				>
					Уже есть аккаунт?
				</Text>
				<Link to='/login' className={styles.link}>
					<Text
						as={'a'}
						weight={400}
						family={'yandex'}
						className={styles.text}
					>
						Авторизация
					</Text>
				</Link>
			</div>
		</main>
	);
};

export default RegisterForm;
