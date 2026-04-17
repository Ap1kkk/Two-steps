import React, { useState } from 'react';
import { Tag } from '../../types/route';
import { Button, Input } from '@ui';

import { ReactComponent as Cross } from '../../assets/icons/cross.svg';

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
		setTempFilters((prev) => ({
			...prev,
			distance: { ...prev.distance, [type]: value },
		}));
	};

	const handleCheckpointsChange = (type: 'min' | 'max', value: number) => {
		setTempFilters((prev) => ({
			...prev,
			checkpointsCount: { ...prev.checkpointsCount, [type]: value },
		}));
	};

	const handleDurationChange = (type: 'min' | 'max', value: number) => {
		setTempFilters((prev) => ({
			...prev,
			duration: { ...prev.duration, [type]: value },
		}));
	};

	const handleCategoryToggle = (categoryId: number) => {
		setTempFilters((prev) => ({
			...prev,
			categoryIds: prev.categoryIds.includes(categoryId)
				? prev.categoryIds.filter((id) => id !== categoryId)
				: [...prev.categoryIds, categoryId],
		}));
	};

	const handleDifficultyToggle = (difficultyId: string) => {
		setTempFilters((prev) => ({
			...prev,
			difficulty: prev.difficulty.includes(difficultyId)
				? prev.difficulty.filter((d) => d !== difficultyId)
				: [...prev.difficulty, difficultyId],
		}));
	};

	const handleRatingChange = (rating: number) => {
		setTempFilters((prev) => ({ ...prev, rating }));
	};

	const handleApply = () => {
		setFilters(tempFilters);
		onApply(tempFilters);
		onClose();
	};

	const handleReset = () => {
		const defaultFilters: Filters = {
			distance: { min: 0, max: 6000 },
			checkpointsCount: { min: 0, max: 20 },
			categoryIds: [],
			duration: { min: 0, max: 2 },
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
			<div
				className={styles.filterModal}
				onClick={(e) => e.stopPropagation()}>
				<div className={styles.filterModalHeader}>
					<h2 className={styles.filterModalTitle}>
						Фильтрация маршрутов
					</h2>
					<Button
						variant='tertiary'
						onClick={onClose}
						children={<Cross />}
						className={styles.crossButton}
					/>
				</div>

				<div className={styles.filterModalBody}>
					<div className={styles.filterSection}>
						<span className={styles.filterTitle}>
							Расстояние (метры)
						</span>
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
						<span className={styles.filterTitle}>
							Количество точек маршрута
						</span>
						<div className={styles.rangeInputs}>
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

					<div className={styles.filterSection}>
						<span className={styles.filterTitle}>
							Время прохождения (часы)
						</span>
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

					{tags.length > 0 && (
						<div className={styles.filterSection}>
							<span className={styles.filterTitle}>
								Категории
							</span>
							<div className={styles.categoriesList}>
								{tags.map((tag) => (
									<Input
										type='checkbox'
										checked={tempFilters.categoryIds.includes(
											tag.id
										)}
										onChange={() =>
											handleCategoryToggle(tag.id)
										}

									/>
								))}
							</div>
						</div>
					)}

					<div className={styles.filterSection}>
						<span className={styles.filterTitle}>Рейтинг</span>
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
					<Button
						className={styles.resetBtn}
						onClick={handleReset}
						children='Сбросить все'
						variant='secondary'
					/>
					<div className={styles.actionButtons}>
						<Button
							className={styles.cancelBtn}
							onClick={onClose}
							children='Отмена'
							variant='secondary'
						/>
						<Button
							variant='primary'
							onClick={handleApply}
							children='Применить'
						/>
					</div>
				</div>
			</div>
		</div>
	);
};
