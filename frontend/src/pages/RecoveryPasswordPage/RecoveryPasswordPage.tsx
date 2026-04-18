import { useNavigate } from 'react-router-dom';
import React, { ChangeEvent, useEffect, useState } from 'react';
import {  useSelector } from '@store';
import {
	selectIsAuthenticated,
	selectIsLoading,
	selectLoginError,
} from '../../services/selectors/userSelectors';
import { RecoveryPasswordForm } from '@components';
import styles from './RecoveryPasswordPage.module.scss'

export const RecoveryPasswordPage = () => {
	const navigate = useNavigate();
	
	const [formData, setFormData] = useState({
		newPassword: '',
		oldPassword: '',
		passwordConfirmation: '',
	});

	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectLoginError)
	const isAuthenticated = useSelector(selectIsAuthenticated)

	useEffect(() => {
		if (isAuthenticated) {
			const timer = setTimeout(() => {
				navigate('/');
			}, 1500);
			return () => clearTimeout(timer);
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value} = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const isFormValid = Boolean(
		formData.newPassword && formData.oldPassword && formData.passwordConfirmation
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormValid) {
			return;
		}
	};

	const errorMessage = error
		? typeof error === 'object' && 'message' in error
			? error.message
			: typeof error === 'string'
			? error
			: 'Ошибка'
		: null;

	return (
		<section className={styles.container}>
			<RecoveryPasswordForm
				formData={formData}
				onChange={handleChange}
				onSubmit={handleSubmit}
				isFormValid={isFormValid}
				isLoading={isLoading}
				error={errorMessage}
			/>
		</section>
	)
};

export default RecoveryPasswordPage;