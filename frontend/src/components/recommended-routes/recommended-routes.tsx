import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../types/route';
import { BASE_STATIC_URL } from '../../types/constants/globals';
import styles from './recommended-routes.module.scss';

interface RecommendedRoutesProps {
	routes: Route[];
	likedRoutes: Record<number, boolean>;
	onToggleLike: (routeId: number) => void;
}

export const RecommendedRoutes: React.FC<RecommendedRoutesProps> = ({
	routes,
	likedRoutes,
	onToggleLike,
}) => {
	return (
		<section className={styles.recommendedSection}>
			<div className={styles.header}>
				<h3 className={styles.title}>Рекомендуемые</h3>
			</div>

			<div className={styles.scrollContainer}>
				<div className={styles.cardsRow}>
					{routes.map((route) => (
						<div key={route.id} className={styles.cardWrapper}>
							<Link to={`/map/${route.id}`} className={styles.cardLink}>
								<div className={styles.card}>
									<img
										src={BASE_STATIC_URL + route.imagePath}
										alt={route.name}
										className={styles.image}
									/>
									<p className={styles.name}>{route.name}</p>
								</div>
							</Link>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};
