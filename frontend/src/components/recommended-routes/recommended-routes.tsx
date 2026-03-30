import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../types/route';
import { BASE_STATIC_URL } from '../../types/constants/globals';
import styles from './recommended-routes.module.scss';
import {RouteCard} from "../../UI/route-card/route-card";

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
						<RouteCard
							key={route.id}
							route={route}
							variant="compact"
						/>
					))}
				</div>
			</div>
		</section>
	);
};
