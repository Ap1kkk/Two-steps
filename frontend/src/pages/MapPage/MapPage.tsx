import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getMockRouteById,
	mockRouteKremlin,
	mockRoutes,
} from '../../types/mockData';

import styles from './MapPage.module.scss';
import { RouteOnMap } from '@components';
import { Route } from '../../types/route';

export const MapPage = () => {
	const { routeId } = useParams();
	const navigate = useNavigate();

	const [routeData, setRouteData] = useState<Route | null>(null);
	const [userLocation, setUserLocation] = useState<[number, number] | null>(
		null
	);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log('Got user location:', position.coords);
					setUserLocation([
						position.coords.latitude,
						position.coords.longitude,
					]);
				},
				(error) => {
					console.error('Geolocation error:', error);
					setUserLocation([56.326, 44.006]);
				},
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				}
			);
		} else {
			console.log('Geolocation not supported');
			setUserLocation([56.326, 44.006]);
		}
	}, []);

	useEffect(() => {
		const loadRouteData = async () => {
			try {
				setIsLoading(true);
				setError(null);

				await new Promise((resolve) => setTimeout(resolve, 500));

				const id = routeId ? parseInt(routeId) : undefined;
				let mockData = id ? getMockRouteById(id) : mockRouteKremlin;

				if (!mockData) {
					console.warn(`Mock route not found for ID: ${id}`);
					mockData = mockRouteKremlin;
					setError(`Маршрут с ID ${id} не найден`);
				}

				console.log('Route data loaded:', mockData.name);
				setRouteData(mockData);
			} catch (err) {
				console.error('Error loading route:', err);
				setError('Ошибка загрузки маршрута');
				setRouteData(mockRouteKremlin);
			} finally {
				setIsLoading(false);
			}
		};

		loadRouteData();
	}, [routeId]);

	if (isLoading) {
		return (
			<div className={styles.container}>
				<div className={styles.loader}>
					<div className={styles.spinner}></div>
					<p>Загрузка маршрута...</p>
				</div>
			</div>
		);
	}

	return (
		<div className={styles.container}>
			<h1>{routeData?.name}</h1>

			<div className={styles.routeInfo}>
				<div className={styles.infoCard}>
					<div className={styles.infoIcon}>📍</div>
					<div className={styles.infoContent}>
						<span className={styles.infoLabel}>Длина маршрута</span>
						<span className={styles.infoValue}>
							{routeData?.distance
								? (routeData.distance / 1000).toFixed(1)
								: '?'}{' '}
							км
						</span>
					</div>
				</div>

				<div className={styles.infoCard}>
					<div className={styles.infoIcon}>📌</div>
					<div className={styles.infoContent}>
						<span className={styles.infoLabel}>Точек маршрута</span>
						<span className={styles.infoValue}>
							{routeData?.checkpoints?.length || 0}
						</span>
					</div>
				</div>
			</div>

			{routeData?.tags && routeData.tags.length > 0 && (
				<div className={styles.categories}>
					{routeData.tags.map((category, index) => (
						<span key={index} className={styles.categoryTag}>
							{category.name}
						</span>
					))}
				</div>
			)}

			<div className={styles.mapWrapper}>
				<RouteOnMap
					key={routeData?.id}
					routeData={routeData}
					userLocation={userLocation}
					height='100%'
					showUserMarker={true}
					showRoute={true}
				/>
			</div>

			<div className={styles.actions}>
				<button
					onClick={() => navigate('/main_page')}
					className={styles.backButton}>
					← На главную
				</button>

				<select
					className={styles.routeSelector}
					onChange={(e) => navigate(`/map/${e.target.value}`)}
					value={routeId}>
					<option value=''>Выберите маршрут</option>
					{mockRoutes.map((route) => (
						<option key={route.id} value={route.id}>
							{route.name} ({(route.distance / 1000).toFixed(1)}{' '}
							км)
						</option>
					))}
				</select>
			</div>
		</div>
	);
};

export default MapPage;
