import React from 'react';
import './preferences.module.scss';
import { usePreferences } from '../../utils/hooks/usePreferences';

export const Preferences: React.FC = () => {
    const {
        options,
        preferences,
        message,
        loading,
        handlePreferenceToggle,
        handleSubmit,
    } = usePreferences();

    if (loading) {
        return (
            <div className='_container'>
                <h1>Создание личного кабинета</h1>
                <h3>Предпочтения:</h3>
                <div className="loading-spinner">Загрузка категорий...</div>
            </div>
        );
    }

    return (
        <div className='_container'>
            <h1>Создание личного кабинета</h1>
            <h3>Предпочтения:</h3>
            {message && (
                <p className={message.includes('успешно') ? 'success-message' : 'error-message'}>
                    {message}
                </p>
            )}
            <div className='_preferences-buttons'>
                {options.map((option) => (
                    <button
                        type='button'
                        key={option.id}
                        className={`_preference-button ${
                            preferences.includes(option.id) ? 'active' : ''
                        }`}
                        onClick={() => handlePreferenceToggle(option.id)}>
                        {option.label || option.name || option.title}
                    </button>
                ))}
            </div>
            <button
                type='submit'
                className='_submit-button'
                onClick={handleSubmit}
                disabled={preferences.length === 0}
            >
                {preferences.length === 0 ? 'Выберите предпочтения' : 'Продолжить'}
            </button>
        </div>
    );
};

export default Preferences;