// pages/RouteList/RoutesList.tsx
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store';
import {
	fetchAllRoutes,
	fetchRouteById,
	addNewRoute,
	editRoute,
	removeRoute,
	clearMessages,
	clearCurrentRoute,
	fetchRoutesByCategory,
	fetchRoutesByDifficulty,
} from '../../services/slices/routeSlice/routeSlice';
import { CreateRouteData, UpdateRouteData } from '../../types/route';
import './RoutesList.scss';

export const RoutesList: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const { routes, currentRoute, loading, error, successMessage } = useSelector(
		(state: RootState) => state.routes // Убедитесь, что ключ 'route', а не 'routes'
	);

	// Локальные состояния для форм
	const [selectedRouteId, setSelectedRouteId] = useState<number>(0);
	const [categoryId, setCategoryId] = useState<number>(1);
	const [difficulty, setDifficulty] = useState<string>('EASY');

	// Форма создания маршрута
	const [newRoute, setNewRoute] = useState<CreateRouteData>({
		nameRoute: '',
		distance: 0,
		difficulty: 'EASY',
		checkpoints: [{ latitude: 56.328, longitude: 44.002 }],
		categories: [1],
	});

	// Форма редактирования маршрута - убираем id из состояния, так как он передается отдельно
	const [editData, setEditData] = useState<Omit<UpdateRouteData, 'id'>>({
		nameRoute: '',
		distance: 0,
		difficulty: 'EASY',
	});

	// Загрузка всех маршрутов при монтировании
	useEffect(() => {
		dispatch(fetchAllRoutes());
	}, [dispatch]);

	// Обработчики
	const handleFetchAllRoutes = () => {
		dispatch(fetchAllRoutes());
	};

	const handleFetchRouteById = () => {
		if (selectedRouteId) {
			dispatch(fetchRouteById(selectedRouteId));
		} else {
			alert('Введите ID маршрута');
		}
	};

	const handleCreateRoute = async () => {
		if (!newRoute.nameRoute || newRoute.distance <= 0) {
			alert('Заполните все поля');
			return;
		}

		try {
			await dispatch(addNewRoute(newRoute)).unwrap();
			// Очищаем форму
			setNewRoute({
				nameRoute: '',
				distance: 0,
				difficulty: 'EASY',
				checkpoints: [{ latitude: 56.328, longitude: 44.002 }],
				categories: [1],
			});
		} catch (error) {
			console.error('Create error:', error);
		}
	};

	const handleUpdateRoute = async () => {
		if (!selectedRouteId) {
			alert('Выберите ID маршрута для редактирования');
			return;
		}

		try {
			await dispatch(
				editRoute({
					id: selectedRouteId,
					data: editData as UpdateRouteData, // Приводим к нужному типу
				})
			).unwrap();
			// Очищаем форму
			setEditData({
				nameRoute: '',
				distance: 0,
				difficulty: 'EASY',
			});
			setSelectedRouteId(0);
		} catch (error) {
			console.error('Update error:', error);
		}
	};

	const handleDeleteRoute = async (id: number) => {
		if (window.confirm(`Вы уверены, что хотите удалить маршрут ${id}?`)) {
			try {
				await dispatch(removeRoute(id)).unwrap();
			} catch (error) {
				console.error('Delete error:', error);
			}
		}
	};

	const handleFilterByCategory = () => {
		dispatch(fetchRoutesByCategory(categoryId));
	};

	const handleFilterByDifficulty = () => {
		dispatch(fetchRoutesByDifficulty(difficulty));
	};

	const handleClearMessages = () => {
		dispatch(clearMessages());
	};

	const handleClearCurrentRoute = () => {
		dispatch(clearCurrentRoute());
	};

	const handleResetAll = () => {
		dispatch(fetchAllRoutes());
		handleClearCurrentRoute();
		handleClearMessages();
	};

	if (loading && routes.length === 0) {
		return (
			<div className='loading-container'>
				<div className='spinner'></div>
				<p>Загрузка маршрутов...</p>
			</div>
		);
	}

	return (
		<div className='routes-manager'>
			<h1>Управление маршрутами</h1>

			{/* Сообщения */}
			{(successMessage || error) && (
				<div
					className={`message ${successMessage ? 'success' : 'error'}`}
					onClick={handleClearMessages}>
					{successMessage || error}
					<span className='close'>×</span>
				</div>
			)}

			{/* Панель управления */}
			<div className='control-panel'>
				<div className='panel-section'>
					<h3>Основные операции</h3>
					<div className='button-group'>
						<button onClick={handleFetchAllRoutes} className='btn btn-primary'>
							Загрузить все маршруты
						</button>
						<button onClick={handleResetAll} className='btn btn-secondary'>
							Сбросить
						</button>
					</div>
				</div>

				<div className='panel-section'>
					<h3>Получение маршрута по ID</h3>
					<div className='input-group'>
						<input
							type='number'
							placeholder='ID маршрута'
							value={selectedRouteId || ''}
							onChange={(e) => setSelectedRouteId(Number(e.target.value))}
						/>
						<button onClick={handleFetchRouteById} className='btn btn-info'>
							Найти
						</button>
						<button
							onClick={handleClearCurrentRoute}
							className='btn btn-secondary'>
							Очистить
						</button>
					</div>
				</div>

				<div className='panel-section'>
					<h3>Создание нового маршрута</h3>
					<div className='form-group'>
						<input
							type='text'
							placeholder='Название маршрута'
							value={newRoute.nameRoute}
							onChange={(e) =>
								setNewRoute({ ...newRoute, nameRoute: e.target.value })
							}
						/>
						<input
							type='number'
							placeholder='Дистанция (метры)'
							value={newRoute.distance || ''}
							onChange={(e) =>
								setNewRoute({ ...newRoute, distance: Number(e.target.value) })
							}
						/>
						<select
							value={newRoute.difficulty}
							onChange={(e) =>
								setNewRoute({ ...newRoute, difficulty: e.target.value })
							}>
							<option value='EASY'>Легкий</option>
							<option value='MEDIUM'>Средний</option>
							<option value='HARD'>Сложный</option>
						</select>
						<button onClick={handleCreateRoute} className='btn btn-success'>
							Создать маршрут
						</button>
					</div>
				</div>

				<div className='panel-section'>
					<h3>Редактирование маршрута</h3>
					<div className='form-group'>
						<input
							type='number'
							placeholder='ID маршрута для редактирования'
							value={selectedRouteId || ''}
							onChange={(e) => setSelectedRouteId(Number(e.target.value))}
						/>
						<input
							type='text'
							placeholder='Новое название'
							value={editData.nameRoute || ''}
							onChange={(e) =>
								setEditData({ ...editData, nameRoute: e.target.value })
							}
						/>
						<input
							type='number'
							placeholder='Новая дистанция'
							value={editData.distance || ''}
							onChange={(e) =>
								setEditData({ ...editData, distance: Number(e.target.value) })
							}
						/>
						<select
							value={editData.difficulty}
							onChange={(e) =>
								setEditData({ ...editData, difficulty: e.target.value })
							}>
							<option value='EASY'>Легкий</option>
							<option value='MEDIUM'>Средний</option>
							<option value='HARD'>Сложный</option>
						</select>
						<button onClick={handleUpdateRoute} className='btn btn-warning'>
							Обновить
						</button>
					</div>
				</div>

				<div className='panel-section'>
					<h3>Фильтрация</h3>
					<div className='filter-group'>
						<div className='input-group'>
							<input
								type='number'
								placeholder='ID категории'
								value={categoryId}
								onChange={(e) => setCategoryId(Number(e.target.value))}
							/>
							<button onClick={handleFilterByCategory} className='btn btn-info'>
								По категории
							</button>
						</div>
						<div className='input-group'>
							<select
								value={difficulty}
								onChange={(e) => setDifficulty(e.target.value)}>
								<option value='EASY'>Легкий</option>
								<option value='MEDIUM'>Средний</option>
								<option value='HARD'>Сложный</option>
							</select>
							<button
								onClick={handleFilterByDifficulty}
								className='btn btn-info'>
								По сложности
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Текущий маршрут */}
			{currentRoute && (
				<div className='current-route'>
					<h2>Текущий маршрут</h2>
					<div className='route-details'>
						<h3>{currentRoute.nameRoute}</h3>
						<p>
							<strong>ID:</strong> {currentRoute.id}
						</p>
						<p>
							<strong>Дистанция:</strong> {currentRoute.distance} м
						</p>
						<p>
							<strong>Сложность:</strong> {currentRoute.difficulty}
						</p>
						<p>
							<strong>Количество точек:</strong>{' '}
							{currentRoute.checkpoints?.length || 0}
						</p>
						{currentRoute.categories && currentRoute.categories.length > 0 && (
							<p>
								<strong>Категории:</strong>{' '}
								{currentRoute.categories.map((c) => c.name).join(', ')}
							</p>
						)}
					</div>
				</div>
			)}

			{/* Список всех маршрутов */}
			<div className='routes-list-section'>
				<h2>
					Список маршрутов
					<span className='count'>({routes?.length || 0})</span>
				</h2>

				{routes && routes.length > 0 ? (
					<div className='routes-grid'>
						{routes.map((route) => (
							<div key={route.id} className='route-card'>
								<div className='route-header'>
									<h3>{route.nameRoute}</h3>
									<button
										onClick={() => handleDeleteRoute(route.id)}
										className='delete-btn'
										title='Удалить маршрут'>
										×
									</button>
								</div>
								<div className='route-body'>
									<p>
										<strong>ID:</strong> {route.id}
									</p>
									<p>
										<strong>Дистанция:</strong> {route.distance} м
									</p>
									<p>
										<strong>Сложность:</strong>
										<span
											className={`difficulty ${route.difficulty.toLowerCase()}`}>
											{route.difficulty === 'EASY'
												? 'Легкий'
												: route.difficulty === 'MEDIUM'
												? 'Средний'
												: 'Сложный'}
										</span>
									</p>
									<p>
										<strong>Точки маршрута:</strong>{' '}
										{route.checkpoints?.length || 0}
									</p>
									{route.categories && route.categories.length > 0 && (
										<div className='categories'>
											<strong>Категории:</strong>
											<div className='category-tags'>
												{route.categories.map((cat) => (
													<span key={cat.id} className='category-tag'>
														{cat.name}
													</span>
												))}
											</div>
										</div>
									)}
								</div>
								<div className='route-footer'>
									<button
										onClick={() => {
											setSelectedRouteId(route.id);
											dispatch(fetchRouteById(route.id));
										}}
										className='btn-sm btn-info'>
										Просмотр
									</button>
									<button
										onClick={() => {
											setSelectedRouteId(route.id);
											setEditData({
												nameRoute: route.nameRoute,
												distance: route.distance,
												difficulty: route.difficulty,
											});
											window.scrollTo({ top: 0, behavior: 'smooth' });
										}}
										className='btn-sm btn-warning'>
										Редактировать
									</button>
								</div>
							</div>
						))}
					</div>
				) : (
					<div className='empty-state'>
						<p>Нет доступных маршрутов</p>
						<button onClick={handleFetchAllRoutes} className='btn btn-primary'>
							Загрузить маршруты
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default RoutesList;
