import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
	getMockRouteById,
	mockRouteKremlin,
	mockRoutes,
} from '../../mocks/route';

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
			<section className={styles.container}>
				<div className={styles.loader}>
					<div className={styles.spinner}></div>
					<p>Загрузка маршрута...</p>
				</div>
			</section>
		);
	}

	return (
		<section className={styles.container}>
			<div className={styles.mapWrapper}>
				<RouteOnMap
					key={routeData?.id}
					routeData={routeData}
					userLocation={userLocation}
					showUserMarker={true}
					showRoute={true}
				/>
			</div>
		</section>
	);
};

export default MapPage;
