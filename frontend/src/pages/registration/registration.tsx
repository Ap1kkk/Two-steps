import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { register } from '../../services/slices/userSlice/userSlice';
import {
	selectIsLoading,
	selectRegisterError,
	selectIsAuthenticated,
} from '../../services/selectors/userSelectors';
import RegisterForm from '../../components/register-form/register-form';

export const Registration = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const isLoading = useSelector(selectIsLoading);
	const error = useSelector(selectRegisterError);
	const isAuthenticated = useSelector(selectIsAuthenticated);

	useEffect(() => {
		if (isAuthenticated) {
			const timer = setTimeout(() => {
				navigate('/register/preferences');
			}, 1500);

			return () => clearTimeout(timer);
		}
	}, [isAuthenticated, navigate]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const isFormValid = Boolean(
		formData.username &&
			formData.email &&
			formData.password &&
			formData.confirmPassword &&
			formData.password === formData.confirmPassword
	);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (!isFormValid) {
			return;
		}

		dispatch(
			register({
				username: formData.username,
				email: formData.email,
				password: formData.password,
				role: 'USER',
			})
		);
	};

	const errorMessage = error
		? typeof error === 'object' && 'message' in error
			? error.message
			: typeof error === 'string'
			? error
			: 'Ошибка регистрации'
		: null;

	return (
		<RegisterForm
			formData={{
				username: formData.username,
				email: formData.email,
				password: formData.password,
				confirmPassword: formData.confirmPassword,
			}}
			onChange={handleChange}
			onSubmit={handleSubmit}
			isFormValid={isFormValid}
			isLoading={isLoading}
			error={errorMessage}
		/>
	);
};

export default Registration;
