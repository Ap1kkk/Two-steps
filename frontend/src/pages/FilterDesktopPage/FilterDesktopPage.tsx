import React, { useEffect, useState } from 'react';
import { Route, Tags } from '../../types/route';
import { Filter } from '../../components/Filter';
import { RouteCard } from '@components';
import { mockRoutes } from '../../types/mockData';

import styles from './FilterDesktopPage.module.scss';

interface Filters {
	distance: {
		min: number;
		max: number;
	};
	checkpointsCount: {
		min: number;
		max: number;
	};
	categoryIds: number[];
	duration: {
		min: number;
		max: number;
	};
	difficulty: string[];
	rating: number;
}

export const FilterDesktopPage: React.FC = () => {
	const [activeFilters, setActiveFilters] = useState<Filters | null>(null);
	const [recommendedRoutes, setRecommendedRoutes] = useState<Route[]>([]);

	const tags: Tags[] = [
		{ id: 1, name: 'Исторический' },
		{ id: 2, name: 'Природный' },
		{ id: 3, name: 'Городской' },
		{ id: 4, name: 'Водный' },
		{ id: 5, name: 'Горный' },
		{ id: 6, name: 'Архитектурный' },
		{ id: 7, name: 'Религиозный' },
		{ id: 8, name: 'Современный' },
	];

	useEffect(() => {
		const loadRoutes = () => {
			setRecommendedRoutes(mockRoutes);
		};

		const timer = setTimeout(loadRoutes, 500);
		return () => clearTimeout(timer);
	}, []);

	const handleApplyFilters = (filters: Filters) => {
		setActiveFilters(filters);
		console.log('Applied filters:', filters);

		let filteredRoutes = [...mockRoutes];

		if (filters.distance.min > 0 || filters.distance.max < Infinity) {
			filteredRoutes = filteredRoutes.filter(
				(route) =>
					route.distance >= filters.distance.min &&
					route.distance <= filters.distance.max
			);
		}

		if (
			filters.checkpointsCount.min > 0 ||
			filters.checkpointsCount.max < Infinity
		) {
			filteredRoutes = filteredRoutes.filter(
				(route) =>
					route.checkpoints.length >= filters.checkpointsCount.min &&
					route.checkpoints.length <= filters.checkpointsCount.max
			);
		}

		if (filters.categoryIds.length > 0) {
			filteredRoutes = filteredRoutes.filter((route) =>
				route.tags?.some((tag) => filters.categoryIds.includes(tag.id))
			);
		}

		setRecommendedRoutes(filteredRoutes);
	};

	const handleResetFilters = () => {
		setActiveFilters(null);
		setRecommendedRoutes(mockRoutes);
		console.log('Filters reset');
	};

	return (
		<section className={styles.container}>
			<Filter
				onApply={handleApplyFilters}
				onReset={handleResetFilters}
				tags={tags}
			/>

			{recommendedRoutes.length > 0 ? (
				<div className={styles.routesContainer}>
					<h2 className={styles.title}>
						{activeFilters
							? 'Отфильтрованные маршруты'
							: 'Рекомендованные маршруты'}
					</h2>
					<div className={styles.positionGrid}>
						{recommendedRoutes.map((route) => (
							<RouteCard
								key={route.id}
								route={route}
								variant='standard'
							/>
						))}
					</div>
				</div>
			) : (
				<div className={styles.noResults}>
					<h2 className={styles.title}>Маршруты не найдены</h2>
					<p>Попробуйте изменить параметры фильтрации</p>
				</div>
			)}
		</section>
	);
};