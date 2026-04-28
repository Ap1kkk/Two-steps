import { useState, useEffect, useCallback, useRef } from 'react';
import { Route } from '../types/route';

export const useRouteMap = (
	routeData: Route | null | undefined,
	userLocation: [number, number] | null | undefined,
	onMapLoad?: ((ymaps: any, map: any) => void) | undefined
) => {
	const [ymaps, setYmaps] = useState<any>(null);
	const [map, setMap] = useState<any>(null);
	const [route, setRoute] = useState<any>(null);
	const [isMapReady, setIsMapReady] = useState(false);
	const [mapError, setMapError] = useState<string | null>(null);

	const routeRef = useRef<any>(null);
	const userMarkerRef = useRef<any>(null);

	/** Загрузка API Яндекс.Карт */
	const handleApiLoad = useCallback((ymapsInstance: any) => {
		console.log('Yandex Maps API loaded');
		setYmaps(ymapsInstance);
		setIsMapReady(true);
	}, []);

	/** Обработка ошибки загрузки API */
	const handleApiError = useCallback((error: any) => {
		console.error('Yandex Maps API error:', error);
		setMapError(
			'Не удалось загрузить карту. Пожалуйста, обновите страницу.'
		);
	}, []);

	/** Получение ссылки на карту */
	const handleMapRef = useCallback(
		(mapInstance: any) => {
			if (mapInstance) {
				console.log('Map instance received');
				setMap(mapInstance);
				if (onMapLoad && ymaps) {
					onMapLoad(ymaps, mapInstance);
				}
			}
		},
		[ymaps, onMapLoad]
	);

	/** Построение маршрута по чекпоинтам */
	const buildRoute = useCallback(() => {
		if (!ymaps || !map) {
			console.log('Cannot build route: ymaps or map not ready');
			return null;
		}

		if (!routeData?.checkpoints || routeData.checkpoints.length < 2) {
			console.log('Cannot build route: need at least 2 checkpoints');
			return null;
		}

		try {
			if (routeRef.current) {
				map.geoObjects.remove(routeRef.current);
				routeRef.current = null;
			}

			const points = routeData.checkpoints.map((cp) => [
				cp.latitude,
				cp.longitude,
			]);

			const multiRoute = new ymaps.multiRouter.MultiRoute(
				{
					referencePoints: points,
					params: {
						routingMode: 'pedestrian',
						results: 1,
					},
				},
				{
					boundsAutoApply: false,
					wayPointStartIconColor: '#007bff',
					wayPointStartIconFillColor: '#007bff',
					wayPointEndIconColor: '#007bff',
					wayPointEndIconFillColor: '#007bff',
					routeActiveStrokeWidth: 4,
					routeActiveStrokeColor: '#007bff',
					pinVisible: false,
				}
			);

			map.geoObjects.add(multiRoute);
			routeRef.current = multiRoute;
			setRoute(multiRoute);

			return multiRoute;
		} catch (error) {
			console.error('Error building route:', error);
			setMapError('Ошибка при построении маршрута');
			return null;
		}
	}, [ymaps, map, routeData]);

	/** Добавление маркера местоположения пользователя */
	const addUserMarker = useCallback(() => {
		if (!ymaps || !map || !userLocation) {
			return null;
		}

		try {
			if (userMarkerRef.current) {
				map.geoObjects.remove(userMarkerRef.current);
				userMarkerRef.current = null;
			}

			const userMarker = new ymaps.Placemark(
				userLocation,
				{
					hintContent: 'Вы здесь',
					balloonContent: 'Ваше текущее местоположение',
				},
				{
					iconLayout: 'default#image',
					iconImageHref:
						'https://yastatic.net/s3/front-maps-static/maps-front-maps/static/v51/icons/core/map-placemark-dot-32.svg',
					iconImageSize: [32, 32],
					iconImageOffset: [-16, -16],
					preset: 'islands#blueCircleDotIcon',
					zIndex: 1000,
				}
			);

			map.geoObjects.add(userMarker);
			userMarkerRef.current = userMarker;
			return userMarker;
		} catch (error) {
			console.error('Error adding user marker:', error);
			return null;
		}
	}, [ymaps, map, userLocation]);

	/** Центрирование карты на маршруте */
	const fitMapToRoute = useCallback(() => {
		if (!map || !routeRef.current) return;

		try {
			const bounds = routeRef.current.getBounds();
			if (bounds) {
				map.setBounds(bounds, {
					checkZoomRange: true,
					zoomMargin: 50,
				});
			}
		} catch (error) {
			console.error('Error fitting map to route:', error);
		}
	}, [map]);

	/** Очистка маршрута */
	const clearRoute = useCallback(() => {
		if (routeRef.current && map) {
			try {
				map.geoObjects.remove(routeRef.current);
				routeRef.current = null;
				setRoute(null);
			} catch (error) {
				console.error('Error clearing route:', error);
			}
		}
	}, [map]);

	/** Очистка маркера пользователя */
	const clearUserMarker = useCallback(() => {
		if (userMarkerRef.current && map) {
			try {
				map.geoObjects.remove(userMarkerRef.current);
				userMarkerRef.current = null;
			} catch (error) {
				console.error('Error clearing user marker:', error);
			}
		}
	}, [map]);

	/** Сброс всех ошибок */
	const clearErrors = useCallback(() => {
		setMapError(null);
	}, []);

	useEffect(() => {
		return () => {
			if (routeRef.current && map) {
				try {
					map.geoObjects.remove(routeRef.current);
				} catch (error) {
					console.error('Error cleaning up route:', error);
				}
			}
			if (userMarkerRef.current && map) {
				try {
					map.geoObjects.remove(userMarkerRef.current);
				} catch (error) {
					console.error('Error cleaning up user marker:', error);
				}
			}
		};
	}, [map]);

	return {
		ymaps,
		map,
		route,
		isMapReady,
		mapError,
		handleApiLoad,
		handleApiError,
		handleMapRef,
		buildRoute,
		addUserMarker,
		fitMapToRoute,
		clearRoute,
		clearUserMarker,
		clearErrors,
		setMapError,
	};
};
