import React from 'react';
import { Link } from 'react-router-dom';
import styles from './route-card.module.scss';
import { Route } from '../../types/route';
import { BASE_STATIC_URL } from '../../types/constants/globals';

interface RouteCardProps {
	route: Route;
	difficultyTranslation?: Record<string, string>;
	likedRoutes?: Record<number, boolean>;
	onToggleLike?: (routeId: number) => void;
	variant?: 'standard' | 'compact';
}

export const RouteCard: React.FC<RouteCardProps> = ({
	route,
	difficultyTranslation,
	likedRoutes,
	onToggleLike,
	variant = 'standard',
}) => {
	const renderTags = (categories: { id: number; name: string }[]) => (
		<div className={styles.tagContainer}>
			{categories.map((cat) => (
				<span key={cat.id} className={styles.tag}>
					{cat.name}
				</span>
			))}
		</div>
	);

	if (variant === 'standard') {
		return (
			<div className={styles.routeCard}>
				<Link to={`/map/${route.id}`} className={styles.routeLink}>
					<img
						src={BASE_STATIC_URL + route.imagePath}
						alt={route.name}
						className={styles.routeImage}
					/>
					<div className={styles.routeContent}>
						<p className={styles.routeTitle}>{route.name}</p>
						<p className={styles.routeInfo}>Расстояние - {route.distance} м</p>
						<p className={styles.routeInfo}>
							Сложность -{' '}
							{!difficultyTranslation ||
								difficultyTranslation[route.difficulty] ||
								route.difficulty}
						</p>
						{renderTags(route.categories)}
					</div>
				</Link>
			</div>
		);
	}

	if (variant === 'compact') {
		return (
			<div className={styles.compactCard}>
				<Link to={`/map/${route.id}`} className={styles.compactLink}>
					<div className={styles.compactCardInner}>
						<img
							src={BASE_STATIC_URL + route.imagePath}
							alt={route.name}
							className={styles.compactImage}
						/>
						<p className={styles.compactName}>{route.name}</p>
					</div>
				</Link>
			</div>
		);
	}

	return null;
};

RouteCard.displayName = 'RouteCard';
