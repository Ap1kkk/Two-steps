import React, { useState, ChangeEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '@store';
import { login } from '../../services/slices/userSlice/userSlice';
import {
    selectIsLoading,
    selectLoginError,
    selectIsAuthenticated
} from '../../services/selectors/userSelectors';
import { AuthorizationForm } from '../../components/authorization-form/authorization-form';

export const Authorization = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const isLoading = useSelector(selectIsLoading);
    const error = useSelector(selectLoginError);
    const isAuthenticated = useSelector(selectIsAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            const timer = setTimeout(() => {
                navigate('/');
            }, 1500);

            return () => clearTimeout(timer);
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const isFormValid = Boolean(
        formData.email &&
        formData.password
    );

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!isFormValid) {
            return;
        }

        dispatch(login({
            email: formData.email,
            password: formData.password
        }));
    };

    const errorMessage = error
        ? typeof error === 'object' && 'message' in error
            ? error.message
            : typeof error === 'string'
                ? error
                : 'Ошибка входа'
        : null;

    return (
        <AuthorizationForm
            formData={formData}
            onChange={handleChange}
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            isLoading={isLoading}
            error={errorMessage}
        />
    );
};

export default Authorization;