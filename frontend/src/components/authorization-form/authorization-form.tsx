import React from 'react';
import { Link } from 'react-router-dom';
import { Input } from "../UI/input/input";
import { Text } from "../UI/text/Text";
import styles from './authorization-form.module.scss';

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
            <Text
                as={'h1'}
                weight={500}
                family={'yandex'}
                size={26}
                align={'center'}
                className={styles.title}
            >
                Вход в личный кабинет
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

                <button
                    className={styles.button}
                    type='submit'
                    disabled={!isFormValid || isLoading}
                >
                    {isLoading ? 'Вход...' : 'Войти'}
                </button>
            </form>

            <div className={styles.links}>
                <Link to='/forgot-password' className={styles.forgotLink}>
                    <Text
                        as={'span'}
                        weight={400}
                        family={'yandex'}
                    >
                        Забыли пароль?
                    </Text>
                </Link>

                <div className={styles.register}>
                    <Text
                        as={'span'}
                        weight={400}
                        family={'yandex'}
                        className={styles.register__text}
                    >
                        Нет аккаунта?
                    </Text>
                    <Link to='/register' className={styles.link}>
                        <Text
                            as={'a'}
                            weight={400}
                            family={'yandex'}
                        >
                            Зарегистрироваться
                        </Text>
                    </Link>
                </div>
            </div>
        </main>
    );
};