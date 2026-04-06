import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../types/route';
import styles from './MainPage.module.scss';
import { RouteCard, RouteOfTheDay } from '@components';

const LIMIT = 5;

const difficultyTranslation = {
	easy: 'Легкий',
	medium: 'Средний',
	hard: 'Тяжелый',
	extreme: 'Экстремальный',
};

const MOCK_POPULAR_ROUTES: Route[] = [
	{
		id: 1,
		name: 'Парк Горького',
		imagePath: 'https://places.moscow/trip/staryy-arbat-chto-posmotret',
		distance: 3500,
		difficulty: 'EASY',
		categories: [
			{ id: 1, name: 'Парк' },
			{ id: 2, name: 'Прогулка' },
			{ id: 3, name: 'Природа' },
		],
	},
	{
		id: 2,
		name: 'Воробьевы горы',
		imagePath: '/images-123/vorobyovy-gory.jpg',
		distance: 5200,
		difficulty: 'MEDIUM',
		categories: [
			{ id: 3, name: 'Природа' },
			{ id: 4, name: 'Вид' },
		],
	},
	{
		id: 3,
		name: 'Красная площадь',
		imagePath: '/images-123/red-square.jpg',
		distance: 2800,
		difficulty: 'EASY',
		categories: [
			{ id: 5, name: 'История' },
			{ id: 6, name: 'Центр' },
		],
	},
	{
		id: 4,
		name: 'Царицыно',
		imagePath: '/images-123/tsaritsyno.jpg',
		distance: 4800,
		difficulty: 'MEDIUM',
		categories: [
			{ id: 1, name: 'Парк' },
			{ id: 7, name: 'Дворец' },
		],
	},
	{
		id: 5,
		name: 'Сокольники',
		imagePath: '/images-123/sokolniki.jpg',
		distance: 6200,
		difficulty: 'HARD',
		categories: [
			{ id: 1, name: 'Парк' },
			{ id: 8, name: 'Лес' },
		],
	},
];

const MOCK_RECOMMENDED_ROUTES: Route[] = [
	{
		id: 6,
		name: 'Патриаршие пруды',
		imagePath: '/images-123/patriarshiye.jpg',
		distance: 2100,
		difficulty: 'EASY',
		categories: [
			{ id: 9, name: 'Пруды' },
			{ id: 10, name: 'Исторический' },
		],
	},
	{
		id: 7,
		name: 'Арбат',
		imagePath: '/images-123/arbat.jpg',
		distance: 1800,
		difficulty: 'EASY',
		categories: [
			{ id: 11, name: 'Пешеходный' },
			{ id: 12, name: 'Улица' },
		],
	},
	{
		id: 8,
		name: 'Зарядье',
		imagePath: '/images-123/zaryadye.jpg',
		distance: 3200,
		difficulty: 'MEDIUM',
		categories: [
			{ id: 1, name: 'Парк' },
			{ id: 13, name: 'Современный' },
		],
	},
];

export const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
	const [recommendedRoutes, setRecommendedRoutes] = useState<Route[]>([]);
	const [likedRoutes, setLikedRoutes] = useState<Record<number, boolean>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const checkAuth = () => {
			try {
				const user = JSON.parse(localStorage.getItem('user') || '{}');
				setIsAuthenticated(!!user?.token);
			} catch {
				setIsAuthenticated(false);
			}
		};

		checkAuth();
	}, []);

	useEffect(() => {
		// Используем мок данные сразу
		setTimeout(() => {
			setPopularRoutes(MOCK_POPULAR_ROUTES);
			setRecommendedRoutes(MOCK_RECOMMENDED_ROUTES);
			setLoading(false);
		}, 500); // Имитация загрузки
	}, []);

	const handleRouteOfTheDay = () => {
		if (popularRoutes.length > 0) {
			navigate(`/map/${popularRoutes[0].id}`);
		} else if (recommendedRoutes.length > 0) {
			navigate(`/map/${recommendedRoutes[0].id}`);
		} else {
			navigate(`/map/${MOCK_POPULAR_ROUTES[0].id}`);
		}
	};

	const handleToggleLike = (routeId: number) => {
		if (!isAuthenticated) {
			setIsModalOpen(true);
			return;
		}

		setLikedRoutes((prev) => ({
			...prev,
			[routeId]: !prev[routeId],
		}));
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.mapBackground} />
				<div className={styles.loading}>Загрузка...</div>
			</div>
		);
	}

	return (
		<section className={styles.section}>
			{error && (
				<div className={styles.errorBanner}>
					<p>{error}</p>
				</div>
			)}
			<div className={styles.route_day}>
				<RouteOfTheDay onNavigate={handleRouteOfTheDay} />
			</div>

			{popularRoutes.length > 0 && (
				<div className={styles.container}>
					<h2 className={styles.title}>Популярные маршруты</h2>
					<div className={styles.position}>
						{popularRoutes.map((route) => (
							<RouteCard
								key={route.id}
								route={route}
								onToggleLike={handleToggleLike}
								variant='standard'
							/>
						))}
					</div>
				</div>
			)}

			{/*/!* Рекомендованные маршруты *!/*/}
			{/*{recommendedRoutes.length > 0 && (*/}
			{/*	<section className={styles.section}>*/}
			{/*		<h2 className={styles.sectionTitle}>Рекомендованные маршруты</h2>*/}
			{/*		<div className={styles.routesGrid}>*/}
			{/*			{recommendedRoutes.map((route) => (*/}
			{/*				<RouteCard*/}
			{/*					key={route.id}*/}
			{/*					route={route}*/}
			{/*					difficultyTranslation={difficultyTranslation}*/}
			{/*					likedRoutes={Object.keys(likedRoutes)*/}
			{/*						.filter((id) => likedRoutes[Number(id)])*/}
			{/*						.map((id) => Number(id))}*/}
			{/*					onToggleLike={handleToggleLike}*/}
			{/*					variant='standard'*/}
			{/*				/>*/}
			{/*			))}*/}
			{/*		</div>*/}
			{/*	</section>*/}
			{/*)}*/}
		</section>
	);
};

export default MainPage;
