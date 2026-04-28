import React, { useEffect, useState } from 'react';
import { YMaps, Map } from '@pbe/react-yandex-maps';
import { useRouteMap } from '../../hooks/useRouteMap';
import { Route } from '../../types/route';
import styles from './RouteOnMap.module.scss';

const YANDEX_MAPS_API_KEY = '71b4ede5-7042-4bba-9243-a2cb4b638bd5';

export interface RouteMapProps {
	routeData?: Route | null;
	userLocation?: [number, number] | null;
	onMapLoad?: (ymaps: any, map: any) => void;
	className?: string;
	showUserMarker?: boolean;
	showRoute?: boolean;
}

export const RouteOnMap: React.FC<RouteMapProps> = ({
	routeData,
	userLocation,
	onMapLoad,
	showUserMarker = true,
	showRoute = true,
}) => {
	const [mapKey, setMapKey] = useState(0);

	const {
		ymaps,
		map,
		isMapReady,
		mapError,
		handleApiLoad,
		handleApiError,
		handleMapRef,
		buildRoute,
		addUserMarker,
		setMapError,
	} = useRouteMap(routeData, userLocation, onMapLoad);

	useEffect(() => {
		setMapKey((prev) => prev + 1);
	}, [routeData?.id]);

	useEffect(() => {
		if (isMapReady && showRoute && routeData) {
			console.log('Building route...');
			setTimeout(() => {
				buildRoute();
			}, 100);
		}
	}, [isMapReady, routeData, showRoute, buildRoute]);

	useEffect(() => {
		if (isMapReady && showUserMarker && userLocation && ymaps && map) {
			console.log('Adding user marker...');
			setTimeout(() => {
				addUserMarker();
			}, 200);
		}
	}, [isMapReady, userLocation, showUserMarker, addUserMarker, ymaps, map]);

	useEffect(() => {
		if (isMapReady && map) {
			if (routeData?.checkpoints && routeData.checkpoints.length > 0) {
				const points = routeData.checkpoints.map((cp: any) => [
					cp.latitude,
					cp.longitude,
				]);
				if (ymaps && points.length > 0) {
					try {
						const bounds = ymaps.util.bounds.fromPoints(points);
						map.setBounds(bounds, {
							checkZoomRange: true,
							zoomMargin: 30,
							duration: 300,
						});
					} catch (error) {
						console.error('Error setting bounds:', error);
						if (userLocation) {
							map.setCenter(userLocation, 14);
						}
					}
				}
			} else if (userLocation) {
				map.setCenter(userLocation, 14);
			}
		}
	}, [isMapReady, map, routeData, userLocation, ymaps]);

	const defaultCenter = userLocation || [55.751574, 37.573856];

	console.log('Rendering routes-on-map:', {
		isMapReady,
		mapError,
		hasRouteData: !!routeData,
		userLocation,
	});

	return (
		<div className={styles.mapContainer}>
			<YMaps
				key={mapKey}
				query={{
					apikey: YANDEX_MAPS_API_KEY,
					lang: 'ru_RU',
					load: 'package.full,util.bounds,multiRouter.MultiRoute',
				}}>
				<Map
					instanceRef={handleMapRef}
					onError={handleApiError}
					defaultState={{
						center: defaultCenter,
						zoom: 12,
						controls: ['zoomControl', 'fullscreenControl'],
					}}
					onLoad={handleApiLoad}
					options={{
						suppressMapOpenBlock: true,
						yandexMapDisablePoiInteractivity: true,
					}}
					width='100%'
					height='100%'
					className={styles.map}
					modules={['multiRouter.MultiRoute', 'util.bounds']}
				/>
			</YMaps>

			{mapError && (
				<div className={styles.mapError}>
					<p>{mapError}</p>
					<button
						onClick={() => {
							setMapError(null);
							window.location.reload();
						}}
						className={styles.retryButton}>
						Попробовать снова
					</button>
				</div>
			)}

			{!isMapReady && !mapError && (
				<div className={styles.mapLoader}>
					<div className={styles.spinner}></div>
					<p>Загрузка карты...</p>
				</div>
			)}
		</div>
	);
};
