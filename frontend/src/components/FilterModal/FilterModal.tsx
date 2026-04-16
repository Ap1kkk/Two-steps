import React, { useState } from 'react';
import { Tag } from '../../types/route';

import styles from './FilterModal.module.scss';

interface FilterModalProps {
	isOpen: boolean;
	onClose: () => void;
	onApply: (filters: Filters) => void;
	onReset: () => void;
	tags?: Tag[];
}

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

export const FilterModal: React.FC<FilterModalProps> = ({
															isOpen,
															onClose,
															onApply,
															onReset,
															tags = [],
														}) => {
	const [filters, setFilters] = useState<Filters>({
		distance: { min: 0, max: 20000 },
		checkpointsCount: { min: 0, max: 20 },
		categoryIds: [],
		duration: { min: 0, max: 8 },
		difficulty: [],
		rating: 0,
	});

	const [tempFilters, setTempFilters] = useState<Filters>(filters);

	const handleDistanceChange = (type: 'min' | 'max', value: number) => {
		setTempFilters(prev => ({
			...prev,
			distance: { ...prev.distance, [type]: value }
		}));
	};

	const handleCheckpointsChange = (type: 'min' | 'max', value: number) => {
		setTempFilters(prev => ({
			...prev,
			checkpointsCount: { ...prev.checkpointsCount, [type]: value }
		}));
	};

	const handleDurationChange = (type: 'min' | 'max', value: number) => {
		setTempFilters(prev => ({
			...prev,
			duration: { ...prev.duration, [type]: value }
		}));
	};

	const handleCategoryToggle = (categoryId: number) => {
		setTempFilters(prev => ({
			...prev,
			categoryIds: prev.categoryIds.includes(categoryId)
				? prev.categoryIds.filter(id => id !== categoryId)
				: [...prev.categoryIds, categoryId]
		}));
	};

	const handleDifficultyToggle = (difficultyId: string) => {
		setTempFilters(prev => ({
			...prev,
			difficulty: prev.difficulty.includes(difficultyId)
				? prev.difficulty.filter(d => d !== difficultyId)
				: [...prev.difficulty, difficultyId]
		}));
	};

	const handleRatingChange = (rating: number) => {
		setTempFilters(prev => ({ ...prev, rating }));
	};

	const handleApply = () => {
		setFilters(tempFilters);
		onApply(tempFilters);
		onClose();
	};

	const handleReset = () => {
		const defaultFilters: Filters = {
			distance: { min: 0, max: 20000 },
			checkpointsCount: { min: 0, max: 20 },
			categoryIds: [],
			duration: { min: 0, max: 8 },
			difficulty: [],
			rating: 0,
		};
		setTempFilters(defaultFilters);
		setFilters(defaultFilters);
		onReset();
	};

	if (!isOpen) return null;

	return (
		<div className={styles.filterModalOverlay} onClick={onClose}>
			<div className={styles.filterModal} onClick={(e) => e.stopPropagation()}>
				<div className={styles.filterModalHeader}>
					<h2>Фильтрация маршрутов</h2>
					<button className={styles.closeBtn} onClick={onClose}>
						×
					</button>
				</div>

				<div className={styles.filterModalBody}>
					<div className={styles.filterSection}>
						<h3>📏 Расстояние (метры)</h3>
						<div className={styles.rangeInputs}>
							<div className={styles.inputGroup}>
								<label>От</label>
								<input
									type='number'
									value={tempFilters.distance.min}
									onChange={(e) =>
										handleDistanceChange(
											'min',
											Number(e.target.value)
										)
									}
									min={0}
									max={tempFilters.distance.max}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label>До</label>
								<input
									type='number'
									value={tempFilters.distance.max}
									onChange={(e) =>
										handleDistanceChange(
											'max',
											Number(e.target.value)
										)
									}
									min={tempFilters.distance.min}
									max={50000}
								/>
							</div>
						</div>
						<input
							type='range'
							min={0}
							max={50000}
							value={tempFilters.distance.max}
							onChange={(e) =>
								handleDistanceChange(
									'max',
									Number(e.target.value)
								)
							}
							className={styles.rangeSlider}
						/>
						<div className={styles.rangeValue}>
							{tempFilters.distance.min}м -{' '}
							{tempFilters.distance.max}м
						</div>
					</div>

					{/* Количество точек */}
					<div className={styles.filterSection}>
						<h3>📍 Количество точек маршрута</h3>
						<div className={styles.rangeInputs} >
							<div className={styles.inputGroup}>
								<label>От</label>
								<input
									type='number'
									value={tempFilters.checkpointsCount.min}
									onChange={(e) =>
										handleCheckpointsChange(
											'min',
											Number(e.target.value)
										)
									}
									min={0}
									max={tempFilters.checkpointsCount.max}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label>До</label>
								<input
									type='number'
									value={tempFilters.checkpointsCount.max}
									onChange={(e) =>
										handleCheckpointsChange(
											'max',
											Number(e.target.value)
										)
									}
									min={tempFilters.checkpointsCount.min}
									max={50}
								/>
							</div>
						</div>
						<input
							type='range'
							min={0}
							max={50}
							value={tempFilters.checkpointsCount.max}
							onChange={(e) =>
								handleCheckpointsChange(
									'max',
									Number(e.target.value)
								)
							}
							className={styles.rangeSlider}
						/>
						<div className={styles.rangeValue}>
							{tempFilters.checkpointsCount.min} -{' '}
							{tempFilters.checkpointsCount.max} точек
						</div>
					</div>

					{/* Время прохождения */}
					<div className={styles.filterSection}>
						<h3>⏱️ Время прохождения (часы)</h3>
						<div className={styles.rangeInputs}>
							<div className={styles.inputGroup}>
								<label>От</label>
								<input
									type='number'
									step={0.5}
									value={tempFilters.duration.min}
									onChange={(e) =>
										handleDurationChange(
											'min',
											Number(e.target.value)
										)
									}
									min={0}
									max={tempFilters.duration.max}
								/>
							</div>
							<div className={styles.inputGroup}>
								<label>До</label>
								<input
									type='number'
									step={0.5}
									value={tempFilters.duration.max}
									onChange={(e) =>
										handleDurationChange(
											'max',
											Number(e.target.value)
										)
									}
									min={tempFilters.duration.min}
									max={24}
								/>
							</div>
						</div>
						<div className={styles.rangeValue}>
							{tempFilters.duration.min}ч -{' '}
							{tempFilters.duration.max}ч
						</div>
					</div>

					{/* Категории */}
					{tags.length > 0 && (
						<div className={styles.filterSection}>
							<h3>🏷️ Категории</h3>
							<div className={styles.categoriesList}>
								{tags.map((tag) => (
									<label
										key={tag.id}
										className={styles.categoryCheckbox}>
										<input
											type='checkbox'
											checked={tempFilters.categoryIds.includes(
												tag.id
											)}
											onChange={() =>
												handleCategoryToggle(tag.id)
											}
										/>
										<span>{tag.name}</span>
									</label>
								))}
							</div>
						</div>
					)}

					{/* Рейтинг */}
					<div className={styles.filterSection}>
						<h3>⭐ Рейтинг</h3>
						<div className={styles.ratingButtons}>
							{[1, 2, 3, 4, 5].map((star) => (
								<button
									key={star}
									className={`${styles.ratingStar} ${
										tempFilters.rating >= star
											? 'active'
											: ''
									}`}
									onClick={() => handleRatingChange(star)}>
									{star}★
								</button>
							))}
							{tempFilters.rating > 0 && (
								<button
									className={styles.ratingClear}
									onClick={() => handleRatingChange(0)}>
									Сбросить
								</button>
							)}
						</div>
					</div>
				</div>

				<div className={styles.filterModalFooter}>
					<button className={styles.resetBtn} onClick={handleReset}>
						🔄 Сбросить все
					</button>
					<div className={styles.actionButtons}>
						<button className={styles.cancelBtn} onClick={onClose}>
							Отмена
						</button>
						<button className={styles.applyBtn} onClick={handleApply}>
							Применить
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};