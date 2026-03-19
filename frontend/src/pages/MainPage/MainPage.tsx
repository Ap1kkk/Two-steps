import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteOfTheDay } from '../../components/RouteOfTheDay';
import { RecommendedRoutes } from '../../components/RecommendedRoutes';
import { PopularRoutes } from '../../components/PopularRoutes';
import { Route } from 'src/types';
import { BASE_API_URL } from '../../types/constants/globals';
import styles from './MainPage.module.scss';

const LIMIT = 5;

const difficultyTranslation = {
	EASY: 'Легкий',
	MEDIUM: 'Средний',
	HARD: 'Тяжелый',
};

const MOCK_POPULAR_ROUTES: Route[] = [
	{
		id: 1,
		name: 'Парк Горького',
		imagePath: '/images-123/park-gorkogo.jpg',
		distance: 3500,
		difficulty: 'EASY',
		categories: [{ id: 1, name: 'Парк' }, { id: 2, name: 'Прогулка' }]
	},
	{
		id: 2,
		name: 'Воробьевы горы',
		imagePath: '/images-123/vorobyovy-gory.jpg',
		distance: 5200,
		difficulty: 'MEDIUM',
		categories: [{ id: 3, name: 'Природа' }, { id: 4, name: 'Вид' }]
	},
	{
		id: 3,
		name: 'Красная площадь',
		imagePath: '/images-123/red-square.jpg',
		distance: 2800,
		difficulty: 'EASY',
		categories: [{ id: 5, name: 'История' }, { id: 6, name: 'Центр' }]
	},
	{
		id: 4,
		name: 'Царицыно',
		imagePath: '/images-123/tsaritsyno.jpg',
		distance: 4800,
		difficulty: 'MEDIUM',
		categories: [{ id: 1, name: 'Парк' }, { id: 7, name: 'Дворец' }]
	},
	{
		id: 5,
		name: 'Сокольники',
		imagePath: '/images-123/sokolniki.jpg',
		distance: 6200,
		difficulty: 'HARD',
		categories: [{ id: 1, name: 'Парк' }, { id: 8, name: 'Лес' }]
	}
];

const MOCK_RECOMMENDED_ROUTES: Route[] = [
	{
		id: 6,
		name: 'Патриаршие пруды',
		imagePath: '/images-123/patriarshiye.jpg',
		distance: 2100,
		difficulty: 'EASY',
		categories: [{ id: 9, name: 'Пруды' }, { id: 10, name: 'Исторический' }]
	},
	{
		id: 7,
		name: 'Арбат',
		imagePath: 'src/assets/images-123/arbat.jpg',
		distance: 1800,
		difficulty: 'EASY',
		categories: [{ id: 11, name: 'Пешеходный' }, { id: 12, name: 'Улица' }]
	},
	{
		id: 8,
		name: 'Зарядье',
		imagePath: '/images-123/zaryadye.jpg',
		distance: 3200,
		difficulty: 'MEDIUM',
		categories: [{ id: 1, name: 'Парк' }, { id: 13, name: 'Современный' }]
	},
	{
		id: 9,
		name: 'ВДНХ',
		imagePath: '/images-123/vdnh.jpg',
		distance: 7500,
		difficulty: 'HARD',
		categories: [{ id: 14, name: 'Выставка' }, { id: 15, name: 'Достопримечательность' }]
	},
	{
		id: 10,
		name: 'Коломенское',
		imagePath: '/images-123/kolomenskoye.jpg',
		distance: 5400,
		difficulty: 'MEDIUM',
		categories: [{ id: 1, name: 'Парк' }, { id: 16, name: 'Музей' }]
	}
];

const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
	const [recommendedRoutes, setRecommendedRoutes] = useState<Route[]>([]);
	const [likedRoutes, setLikedRoutes] = useState<Record<number, boolean>>({});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

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
		const fetchRoutes = async () => {
			try {
				setLoading(true);
				setError(null);

				let headers: HeadersInit = {
					'Content-Type': 'application/json',
				};

				try {
					const user = JSON.parse(localStorage.getItem('user') || '{}');
					if (user?.token) {
						headers = {
							...headers,
							Authorization: `Bearer ${user.token}`,
						};
					}
				} catch {

				}

				try {
					const popularResponse = await fetch(
						`${BASE_API_URL}/route/popular?limit=${LIMIT}`,
						{
							method: 'POST',
							headers,
						}
					);

					if (popularResponse.ok) {
						const data = await popularResponse.json();
						setPopularRoutes(data);
					} else {
						console.warn('Failed to fetch popular routes, using mock data');
						setPopularRoutes(MOCK_POPULAR_ROUTES);
					}
				} catch (error) {
					console.warn('Error fetching popular routes, using mock data:', error);
					setPopularRoutes(MOCK_POPULAR_ROUTES);
				}

				try {
					const recommendedResponse = await fetch(
						`${BASE_API_URL}/route/recommended?limit=${LIMIT}`,
						{
							method: 'POST',
							headers,
						}
					);

					if (recommendedResponse.ok) {
						const data = await recommendedResponse.json();
						setRecommendedRoutes(data);
					} else {
						console.warn('Failed to fetch recommended routes, using mock data');
						setRecommendedRoutes(MOCK_RECOMMENDED_ROUTES);
					}
				} catch (error) {
					console.warn('Error fetching recommended routes, using mock data:', error);
					setRecommendedRoutes(MOCK_RECOMMENDED_ROUTES);
				}

			} catch (error) {
				console.error('Error fetching routes:', error);
				setError('Не удалось загрузить маршруты. Показываем демо-данные.');
				setPopularRoutes(MOCK_POPULAR_ROUTES);
				setRecommendedRoutes(MOCK_RECOMMENDED_ROUTES);
			} finally {
				setLoading(false);
			}
		};

		fetchRoutes();
	}, []);

	const handleRouteOfTheDay = async () => {
		try {
			let headers: HeadersInit = {};

			try {
				const user = JSON.parse(localStorage.getItem('user') || '{}');
				if (user?.token) {
					headers = {
						Authorization: `Bearer ${user.token}`,
					};
				}
			} catch {
			}

			const response = await fetch(`${BASE_API_URL}/route/daily`, {
				method: 'GET',
				headers,
			});

			if (response.ok) {
				const data = await response.json();
				navigate(`/map/${data.id}`);
			} else {
				if (popularRoutes.length > 0) {
					navigate(`/map/${popularRoutes[0].id}`);
				} else if (recommendedRoutes.length > 0) {
					navigate(`/map/${recommendedRoutes[0].id}`);
				} else {
					navigate(`/map/${MOCK_POPULAR_ROUTES[0].id}`);
				}
			}
		} catch (error) {
			console.error('Error fetching route of the day:', error);
			if (popularRoutes.length > 0) {
				navigate(`/map/${popularRoutes[0].id}`);
			} else if (recommendedRoutes.length > 0) {
				navigate(`/map/${recommendedRoutes[0].id}`);
			} else {
				navigate(`/map/${MOCK_POPULAR_ROUTES[0].id}`);
			}
		}
	};

	const handleToggleLike = (routeId: number) => {
		if (!isAuthenticated) {
			navigate('/login');
			return;
		}

		setLikedRoutes(prev => ({
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
		<div className={styles.container}>
			<div className={styles.mapBackground} />

			{error && (
				<div className={styles.errorBanner}>
					<p>{error}</p>
				</div>
			)}

			<div className={styles.content}>
				<RouteOfTheDay onNavigate={handleRouteOfTheDay} />

				{recommendedRoutes.length > 0 && (
					<RecommendedRoutes
						routes={recommendedRoutes}
						likedRoutes={likedRoutes}
						onToggleLike={handleToggleLike}
					/>
				)}

				{popularRoutes.length > 0 && (
					<PopularRoutes
						routes={popularRoutes}
						likedRoutes={likedRoutes}
						onToggleLike={handleToggleLike}
						difficultyTranslation={difficultyTranslation}
					/>
				)}
			</div>
		</div>
	);
};

export default MainPage;