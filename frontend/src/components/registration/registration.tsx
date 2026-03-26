import React from 'react';
import { Link } from 'react-router-dom';
import { useRegisterForm } from '../../utils/hooks/useRegistrationForm';
import './registration.module.scss';

export const Registration: React.FC = () => {
    const {
        username,
        email,
        password,
        usernameError,
        emailError,
        passwordError,
        message,
        usernameDirty,
        emailDirty,
        passwordDirty,
        handleUsernameChange,
        handleEmailChange,
        handlePasswordChange,
        handleBlur,
        handleSubmit,
        isFormValid,
    } = useRegisterForm();

    return (
        <div className='__container'>
            <h1 className='title'>Создание личного кабинета</h1>

            {/* Сообщение об ошибке/успехе */}
            {message && (
                <div className={message.includes('успешна') ? 'success-message' : 'error-message'}>
                    {message}
                </div>
            )}

            <form className='form' onSubmit={handleSubmit}>
                <div>
                    <label>Имя</label>
                    <input
                        className={`input ${
                            usernameDirty && usernameError ? 'input-error' : ''
                        }`}
                        type='text'
                        name='username'
                        value={username}
                        onBlur={handleBlur}
                        onChange={handleUsernameChange}
                        placeholder='Введите ваше имя'
                        required
                    />
                    {usernameDirty && usernameError && (
                        <div className='error-message'>{usernameError}</div>
                    )}
                </div>

                <div>
                    <label>Электронная почта</label>
                    <input
                        className={`input ${emailDirty && emailError ? 'input-error' : ''}`}
                        type='email'
                        name='email'
                        value={email}
                        onBlur={handleBlur}
                        onChange={handleEmailChange}
                        placeholder='example@mail.com'
                        required
                    />
                    {emailDirty && emailError && (
                        <div className='error-message'>{emailError}</div>
                    )}
                </div>

                <div>
                    <label>Пароль</label>
                    <input
                        className={`input ${
                            passwordDirty && passwordError ? 'input-error' : ''
                        }`}
                        type='password'
                        name='password'
                        value={password}
                        onBlur={handleBlur}
                        onChange={handlePasswordChange}
                        placeholder='Минимум 6 символов'
                        required
                    />
                    {passwordDirty && passwordError && (
                        <div className='error-message'>{passwordError}</div>
                    )}
                </div>

                <button
                    className='button'
                    type='submit'
                    disabled={!isFormValid}
                >
                    Продолжить
                </button>
            </form>

            <div className='footer'>
                <span>Уже есть аккаунт?</span>
                <Link to='/login' className='link'>
                    Авторизация
                </Link>
            </div>
        </div>
    );
};

export default Registration;