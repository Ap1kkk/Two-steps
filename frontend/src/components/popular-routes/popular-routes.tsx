import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../types/route';
import { BASE_STATIC_URL } from '../../types/constants/globals';
import styles from './popular-routes.module.scss';

interface PopularRoutesProps {
	routes: Route[];
	likedRoutes: Record<number, boolean>;
	onToggleLike: (routeId: number) => void;
	difficultyTranslation: Record<string, string>;
}

export const PopularRoutes: React.FC<PopularRoutesProps> = ({
	routes,
	likedRoutes,
	onToggleLike,
	difficultyTranslation,
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

	return (
		<section className={styles.popularSection}>
			<div className={styles.mainTitle}>
				<h3 className={styles.sectionTitle}>Популярные</h3>
			</div>

			{routes.map((route) => (
				<div key={route.id} className={styles.popularCard}>
					<Link to={`/map/${route.id}`} className={styles.popularLink}>
						<img
							src={BASE_STATIC_URL + route.imagePath}
							alt={route.name}
							className={styles.popularImage}
						/>
						<div className={styles.popularContent}>
							<p className={styles.popularTitle}>{route.name}</p>
							<p className={styles.popularInfo}>
								Расстояние - {route.distance} м
							</p>
							<p className={styles.popularInfo}>
								Сложность -{' '}
								{difficultyTranslation[route.difficulty] || route.difficulty}
							</p>
							{renderTags(route.categories)}
						</div>
					</Link>
				</div>
			))}
		</section>
	);
};
