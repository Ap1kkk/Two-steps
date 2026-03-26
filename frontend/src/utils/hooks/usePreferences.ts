import React, {useState, useEffect, useCallback} from "react";
import {useNavigate} from "react-router-dom";

export interface Category {
    id: number;
    name?: string;
    label?: string;
    title?: string;
    description?: string;
    [key: string]: any;
}

export interface User {
    id?: number;
    username?: string;
    email?: string;
    token?: string;
    preferences?: number[];
    role?: string;
    [key: string]: any;
}

export interface PreferencesResponse {
    message?: string;
    success?: boolean;
    [key: string]: any;
}

const API_URL = 'http://localhost:3001'

export const usePreferences = () => {
    const navigate = useNavigate();
    const [options, setOptions] = useState<Category[]>([]);
    const [preferences, setPreferences] = useState<number[]>([]);
    const [message, setMessage] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);

    const fetchCategories = useCallback(async () => {
        setLoading(true);
        try {
            const userStr = localStorage.getItem('user');
            const user: User | null = userStr ? JSON.parse(userStr): null;
            if (!user) {
                throw new Error('Пользователь не авторизирован');
            }
            const response = await fetch(`${API_URL}/categories`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            });
            if (!response.ok) {
                if (response.status === 403) {
                    throw new Error('Доступ запрещен, проверьте токен.');
                }
                throw new Error('Ошибка загрузки категорий');
            }

            const categories:Category[] = await response.json();
            console.log(categories);
            setOptions(categories);
        } catch (error) {
            console.error('Ошибка получения категорий: ', error);
            setMessage(error instanceof Error ? error.message : 'Не удалось загрузить категории.');
        } finally {
            setLoading(false);
        }
    }, []);

    const clearMessage = useCallback(() => {
        setMessage('');
    }, []);

    useEffect(() => {
        fetchCategories();
    }, [fetchCategories]);

    const handlePreferenceToggle = useCallback((optionId: number) => {
        setPreferences(prev =>
            prev.includes(optionId)
                ? prev.filter(id => id !== optionId)
                : [...prev, optionId]
        );
        if (message && !message.includes('успешно')) {
            clearMessage();
        }
    }, [clearMessage, message]);

    const handleSubmit = useCallback(async (e:React.FormEvent) => {
        e.preventDefault();
        try {
            const userStr = localStorage.getItem('user');
            const user: User | null = userStr ? JSON.parse(userStr) : null;
            if (!user) {
                throw new Error('Пользователь не авторизован');
            }
            console.log('Отправляемые предпочтения: ', preferences);
            console.log('Токен: ', user.token);
            const response = await fetch(`${API_URL}/users/${user.id}`, {
                method: 'PATCH',
                headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify({
                    preferences: preferences
                }),
            });
            const result:PreferencesResponse = await response.json();
            console.log('Ответ сервера:', result);
            if (!response.ok) {
                throw new Error(result.message || 'Ошибка при сохранении предпочтений');
            }

            const updateUser: User = {
                ...user,
                preferences,
            };
            localStorage.setItem('user', JSON.stringify(updateUser));
            setMessage('Предпочтения успешно сохранены!');

            setTimeout(() => {
                navigate('/main_page');
            }, 1500);
        } catch (error) {
            console.error('Ошибка сохранения предпочтений: ', error);
            setMessage(error instanceof Error ? error.message : 'Произошла ошибка.');
        }
    }, [preferences, navigate]);

    return {
        options,
        preferences,
        message,
        loading,
        handlePreferenceToggle,
        handleSubmit,
        clearMessage,
    };
};