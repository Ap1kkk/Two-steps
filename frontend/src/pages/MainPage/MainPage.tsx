import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Route } from '../../types/route';
import styles from './MainPage.module.scss';
import { RouteCard, RouteOfTheDay } from '@components';
import { mockRoutes, getRandomMockRoute } from '../../types/mockData';

export const MainPage: React.FC = () => {
	const navigate = useNavigate();
	const [popularRoutes, setPopularRoutes] = useState<Route[]>([]);
	const [recommendedRoutes, setRecommendedRoutes] = useState<Route[]>([]);
	const [likedRoutes, setLikedRoutes] = useState<Record<number, boolean>>({});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [routeOfTheDay, setRouteOfTheDay] = useState<Route | null>(null);

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
		const loadRoutes = () => {
			try {
				setPopularRoutes(mockRoutes.slice(0, 4));
				setRecommendedRoutes(mockRoutes.slice(4, 8));

				const randomRoute = getRandomMockRoute();
				setRouteOfTheDay(randomRoute);

				setLoading(false);
			} catch (err) {
				setError('Ошибка при загрузке маршрутов');
				setLoading(false);
			}
		};

		const timer = setTimeout(loadRoutes, 500);
		return () => clearTimeout(timer);
	}, []);

	const handleRouteOfTheDay = () => {
		if (routeOfTheDay) {
			navigate(`/map/${routeOfTheDay.id}`);
		} else if (popularRoutes.length > 0) {
			navigate(`/map/${popularRoutes[0].id}`);
		} else if (recommendedRoutes.length > 0) {
			navigate(`/map/${recommendedRoutes[0].id}`);
		} else {
			navigate(`/map/${mockRoutes[0].id}`);
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

		console.log(`Route ${routeId} liked: ${!likedRoutes[routeId]}`);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	if (loading) {
		return (
			<div className={styles.container}>
				<div className={styles.mapBackground} />
				<div className={styles.loading}>
					<div className={styles.spinner}></div>
					<p>Загрузка маршрутов...</p>
				</div>
			</div>
		);
	}

	if (error) {
		return (
			<div className={styles.container}>
				<div className={styles.mapBackground} />
				<div className={styles.error}>
					<p>{error}</p>
					<button onClick={() => window.location.reload()}>
						Попробовать снова
					</button>
				</div>
			</div>
		);
	}

	return (
		<section className={styles.section}>
			{routeOfTheDay && (
				<div className={styles.route_day}>
					<RouteOfTheDay
						route={routeOfTheDay}
						onNavigate={handleRouteOfTheDay}
					/>
				</div>
			)}

			{popularRoutes.length > 0 && (
				<div className={styles.container}>
					<h2 className={styles.title}>Популярные маршруты</h2>
					<div className={styles.position}>
						{popularRoutes.map((route) => (
							<RouteCard
								key={route.id}
								route={route}
								isLiked={likedRoutes[route.id] || false}
								onToggleLike={handleToggleLike}
								variant='compact'
							/>
						))}
					</div>
				</div>
			)}

			{recommendedRoutes.length > 0 && (
				<div className={styles.container}>
					<h2 className={styles.title}>Рекомендованные маршруты</h2>
					<div className={styles.position}>
						{recommendedRoutes.map((route) => (
							<RouteCard
								key={route.id}
								route={route}
								isLiked={likedRoutes[route.id] || false}
								onToggleLike={handleToggleLike}
								variant='compact'
							/>
						))}
					</div>
				</div>
			)}

			{isModalOpen && (
				<div className={styles.modal} onClick={handleCloseModal}>
					<div
						className={styles.modalContent}
						onClick={(e) => e.stopPropagation()}>
						<h3>Требуется авторизация</h3>
						<p>
							Чтобы добавлять маршруты в избранное, пожалуйста,
							войдите в систему
						</p>
						<div className={styles.modalButtons}>
							<button onClick={() => navigate('/login')}>
								Войти
							</button>
							<button onClick={handleCloseModal}>Закрыть</button>
						</div>
					</div>
				</div>
			)}
		</section>
	);
};

export default MainPage;
