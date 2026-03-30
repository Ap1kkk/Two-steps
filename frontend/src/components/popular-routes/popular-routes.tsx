import React from 'react';
import { Link } from 'react-router-dom';
import { Route } from '../../types/route';
import { BASE_STATIC_URL } from '../../types/constants/globals';
import styles from './popular-routes.module.scss';
import {RouteCard} from "../UI/route-card/route-card";

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
	return (
		<section className={styles.popularSection}>
			<div className={styles.mainTitle}>
				<h3 className={styles.sectionTitle}>Популярные</h3>
			</div>

			{routes.map((route) => (
				<RouteCard
					key={route.id}
					route={route}
					difficultyTranslation={difficultyTranslation}
					variant="standard"
				/>
			))}
		</section>
	)
};
