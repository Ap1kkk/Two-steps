import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from "@ui/input/input";
import styles from './authorization-form.module.scss';
import {Button} from "@ui/button/button";

interface AuthorizationFormProps {
    formData: {
        email: string;
        password: string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    isFormValid: boolean;
    isLoading?: boolean;
    error?: string | null;
}

export const AuthorizationForm: React.FC<AuthorizationFormProps> = ({
    formData,
    onChange,
    onSubmit,
    isFormValid,
    isLoading = false,
    error = null,
    }) => {
    return (
        <main className={styles.container}>
            <h2
                className={styles.title}
            >
                Вход в профиль
            </h2>

            {error && (
                <p
                    className={styles.error}
                >
                    {error}
                </p>
            )}

            <form className={styles.form} onSubmit={onSubmit}>
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
                    placeholder={'Введите пароль'}
                />

                <Button
                    disabled={!isFormValid || isLoading}
                    type='submit'
                    fullWidth={true}
                    variant="primary"
                >
                    <p
                        children={isLoading ? 'Вход...' : 'Войти'}
                    />
                </Button>
            </form>

            <div className={styles.links}>
                <Link to='/forgot-password' className={styles.link}>
                    <span>
                        Забыли пароль?
                    </span>
                </Link>

                <div className={styles.register}>
                    <p className={styles.register__text}>
                        Нет аккаунта?
                    </p>
                    <Link to='/register' className={styles.link}>
                        <span>
                            Зарегистрироваться
                        </span>
                    </Link>
                </div>
            </div>
        </main>
    );
};