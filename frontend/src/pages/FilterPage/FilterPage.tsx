import React, { useState } from 'react';
import { FilterModal } from '../../components/FilterModal';
import { Tag } from '../../types/route';
import styles from './FilterPage.module.scss';
import { Button } from '@ui';

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

export const FilterPage: React.FC = () => {
	const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
	const [activeFilters, setActiveFilters] = useState<Filters | null>(null);

	const tags: Tag[] = [
		{ id: 1, name: 'Исторический' },
		{ id: 2, name: 'Природный' },
		{ id: 3, name: 'Городской' },
		{ id: 4, name: 'Водный' },
		{ id: 5, name: 'Горный' },
		{ id: 6, name: 'Архитектурный' },
		{ id: 7, name: 'Религиозный' },
		{ id: 8, name: 'Современный' },
	];

	const handleApplyFilters = (filters: Filters) => {
		setActiveFilters(filters);
		console.log('Applied filters:', filters);
	};

	const handleResetFilters = () => {
		setActiveFilters(null);
		console.log('Filters reset');
	};

	return (
		<div className={styles.filterPage}>
			<Button
				variant='secondary'
				onClick={() => setIsFilterModalOpen(true)}
			>
				Открыть фильтры
			</Button>

			<FilterModal
				isOpen={isFilterModalOpen}
				onClose={() => setIsFilterModalOpen(false)}
				onApply={handleApplyFilters}
				onReset={handleResetFilters}
				tags={tags}
			/>
		</div>
	);
};