import React, { useState, ChangeEvent } from "react";
import {useNavigate} from "react-router-dom";

export interface RegisterFromData {
    username: string;
    email: string;
    password: string;
    role: 'USER';
    token: string;
}

export interface RegisterResponse {
    id?: number;
    username?: string;
    email?: string;
    message?: string;
    [key: string]: any;
}

interface ValidationState {
    username: string;
    email: string;
    password: string;
}

interface DirtyState {
    username: boolean;
    email: boolean;
    password: boolean;
}

const API_URL = `http://localhost:3001/users`;
export const useRegisterForm = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [dirty, setDirty] = useState<DirtyState>({
        username: false,
        email: false,
        password: false,
    });
    const [errors, setErrors] = useState<ValidationState>({
        username: 'Поле не может быть пустым',
        email: 'Поле не может быть пустым',
        password: 'Поле не может быть пустым',
    })
    const [message, setMessage] = useState<string>('')

    const validateUsername = (value: string): void => {
        if (!value) {
            setErrors(prev => ({ ...prev, username: 'Поле не может быть пустым!'}));
        } else {
            setErrors(prev => ({ ...prev, username: '' }));
        }
    };

    const validateEmail = (value: string) => {
        const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
            setErrors(prev => ({ ...prev, email: 'Поле не может быть пустым!'}));
        } else if (!emailRegex.test(value)) {
            setErrors(prev => ({ ...prev, email: 'Неккорректный email!'}));
        } else {
            setErrors(prev => ({ ...prev, email: ''}))
        }
    };

    const validatePassword = (value: string) => {
        if (!value) {
            setErrors(prev => ({ ...prev, password: 'Поле не может быть пустым!'}));
        } else if (value.length < 6) {
            setErrors(prev => ({ ...prev, password: 'Пароль должен содержать минимум 6 символов!'}));
        } else {
            setErrors(prev => ({ ...prev, password: ''}));
        }
    };

    const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUsername(value);
        validateUsername(value);
    }

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword(value);
    }

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        validateEmail(value);
    }

    const handleBlur = (e: ChangeEvent<HTMLInputElement>) => {
        const {name} = e.target;
        setDirty(prev => ({ ...prev, [name]: true}));
    };

    const isFormValid = Boolean(
        username &&
        email &&
        password &&
        !errors.username &&
        !errors.email &&
        !errors.password
    );

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDirty({username: true, email: true, password: true});
        validateUsername(username);
        validateEmail(email);
        validatePassword(password);
        if (!isFormValid) {
            setMessage('Проверьте корректность данных!');
            return;
        }

        try {
            const formData: RegisterFromData = {
                username,
                email,
                password,
                role: 'USER',
                token: 'asdasdasd',
            };

            const responce = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if(responce.ok) {
                const data: RegisterResponse = await responce.json();
                localStorage.setItem('user', JSON.stringify(data));
                setMessage('Регистрация успешна!');
                setTimeout(() => {
                    resetForm();
                    navigate('/register/preferences');
                }, 1500)
            } else {
                const errorData: RegisterResponse = await responce.json();
                setMessage(
                    `Ошибка регистрации: ${errorData.message || 'Попробуйте еще раз.'}`
                );
            }
        } catch (error) {
            console.error('Ошибка при отправке запроса:', error);
            setMessage('Сервер недоступен. Убедитесь, что json-server запущен (npm run json-server)');
        }
    };

    const resetForm = () => {
        setUsername('');
        setEmail('');
        setPassword('');
        setDirty({ username: false, email: false, password: false });
        setErrors({
            username: 'Поле не может быть пустым!',
            email: 'Поле не может быть пустым!',
            password: 'Поле не может быть пустым!',
        });
        setMessage('');
    }
    return {
        username,
        email,
        password,
        usernameError: errors.username,
        emailError: errors.email,
        passwordError: errors.password,
        message,
        usernameDirty: dirty.username,
        emailDirty: dirty.email,
        passwordDirty: dirty.password,
        setUsername,
        setEmail,
        setPassword,
        validateUsername,
        validateEmail,
        validatePassword,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleBlur,
        handleSubmit,
        resetForm,
        isFormValid,
    };
};