import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '@store';
import {
	fetchCategories,
	saveUserPreferences,
	togglePreference,
	clearMessages
} from '../../services/slices/preferencesSlice/preferencesSlice';

export const Preferences: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { categories, selectedPreferences, loading, error, successMessage } = useSelector(
		(state: RootState) => state.preferences
	);

	const [isSaving, setIsSaving] = useState(false);

	useEffect(() => {
		dispatch(fetchCategories());

		// Проверяем наличие токена при загрузке компонента
		const refreshToken = localStorage.getItem('refreshToken');
		const userStr = localStorage.getItem('user');

		console.log('RefreshToken from localStorage:', refreshToken);
		console.log('User from localStorage:', userStr);

		if (!refreshToken && !userStr) {
			console.error('No token or user found in localStorage');
		}
	}, [dispatch]);

	const handleTogglePreference = (categoryId: number) => {
		dispatch(togglePreference(categoryId));
	};

	const handleSavePreferences = async () => {
		if (selectedPreferences.length === 0) {
			alert('Пожалуйста, выберите хотя бы одну категорию');
			return;
		}

		setIsSaving(true);

		try {
			let token = localStorage.getItem('refreshToken');

			if (!token) {
				token = sessionStorage.getItem('refreshToken') || sessionStorage.getItem('token');
				console.log('Token from sessionStorage:', token);
			}

			if (!token) {
				throw new Error('Токен не найден. Пожалуйста, войдите заново.');
			}

			console.log('Saving preferences with token:', token);
			console.log('Selected preferences:', selectedPreferences);

			const result = await dispatch(saveUserPreferences({
				token: token,
				preferences: selectedPreferences,
			})).unwrap();

			console.log('Save preferences result:', result);

			if (result.success) {
				const userStr = localStorage.getItem('user');
				if (userStr) {
					const user = JSON.parse(userStr);
					user.preferences = selectedPreferences;
					localStorage.setItem('user', JSON.stringify(user));
				}

				setTimeout(() => {
					navigate('/main_page');
				}, 1500);
			}
		} catch (error) {
			console.error('Error saving preferences:', error);
		} finally {
			setIsSaving(false);
		}
	};

	const handleClearMessage = () => {
		dispatch(clearMessages());
	};

	if (loading) {
		return (
			<div className="preferences-container">
				<div className="loading-spinner">
					<div className="spinner"></div>
					<p>Загрузка категорий...</p>
				</div>
			</div>
		);
	}

	return (
		<div className="preferences-container">
			<h1>Выберите ваши интересы</h1>
			<p className="subtitle">Отметьте категории, которые вам интересны</p>

			{(successMessage || error) && (
				<div
					className={`message ${successMessage ? 'success' : 'error'}`}
					onClick={handleClearMessage}
				>
					{successMessage || error}
					<span className="close">×</span>
				</div>
			)}

			<div className="stats">
                <span className="selected-count">
                    Выбрано категорий: {selectedPreferences.length}
                </span>
				<span className="total-count">
                    Всего категорий: {categories.length}
                </span>
			</div>

			<div className="categories-grid">
				{categories.map((category) => (
					<button
						key={category.id}
						className={`category-card ${selectedPreferences.includes(category.id) ? 'active' : ''}`}
						onClick={() => handleTogglePreference(category.id)}
						disabled={isSaving}
					>
						<div className="category-name">{category.name}</div>
						{selectedPreferences.includes(category.id) && (
							<div className="checkmark">✓</div>
						)}
					</button>
				))}
			</div>

			<div className="actions">
				<button
					className="btn-save"
					onClick={handleSavePreferences}
					disabled={selectedPreferences.length === 0 || isSaving}
				>
					{isSaving ? 'Сохранение...' : `Сохранить (${selectedPreferences.length})`}
				</button>
			</div>
		</div>
	);
};