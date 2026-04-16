import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '@ui';
import { Route } from '../../types/route';

import { ReactComponent as Like } from '../../assets/icons/like.svg';
import { ReactComponent as LikeActive } from '../../assets/icons/like-green.svg';

import styles from './RouteCard.module.scss';

interface TagItem {
	id: number;
	label: string;
}

interface RouteCardProps {
	route: Route;
	isLiked?: boolean;
	tags?: TagItem[];
	selectedTagIds?: number[];
	onToggleLike?: (id: number) => void;
	variant?: 'standard' | 'compact';
}

export const RouteCard: React.FC<RouteCardProps> = ({
	route,
	isLiked = false,
	tags = [],
	selectedTagIds = [],
	onToggleLike,
	variant = 'standard',
}) => {
	const [isAnimating, setIsAnimating] = useState(false);
	const [localLiked, setLocalLiked] = useState(isLiked);

	useEffect(() => {
		setLocalLiked(isLiked);
	}, [isLiked]);

	const formatDistance = (distance: number) => {
		if (distance >= 1000) {
			return `${(distance / 1000).toFixed(1)} км`;
		}
		return `${distance} м`;
	};

	const handleLikeClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		console.log('Клик по лайку');
		console.log('Текущее isLiked из пропсов:', isLiked);
		console.log('Локальное состояние:', localLiked);

		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 400);

		const newLikedState = !localLiked;
		setLocalLiked(newLikedState);

		if (onToggleLike) {
			onToggleLike(route.id);
		}
	};

	const getTagsToShow = (): TagItem[] => {
		if (tags && tags.length > 0) return tags;

		if (route.tags && route.tags.length > 0) {
			return route.tags.map((tag) => ({
				id: tag.id,
				label: tag.name,
			}));
		}

		return [];
	};

	const displayTags = getTagsToShow();

	if (variant === 'compact') {
		return (
			<Link className={styles.compactCard} to={`/map/${route.id}`}>
				<img
					src={route.imagePath || '/placeholder-image.jpg'}
					alt={route.name}
					className={styles.compactRouteImage}
					loading='lazy'
				/>
				{route.name}
			</Link>
		);
	}

	if (variant === 'standard') {
		return (
			<Link className={styles.standartCard} to={`/map/${route.id}`}>
				<img
					src={route.imagePath || '/placeholder-image.jpg'}
					alt={route.name}
					className={styles.standartImage}
					loading='lazy'
				/>
				<div className={styles.standartContent}>
					<h3 className={styles.standartCardTitle}>{route.name}</h3>
					<span className={styles.standartDistance}>
						{formatDistance(route.distance)}
					</span>
					{displayTags.length > 0 && (
						<div className={styles.compactTags}>
							<Tag
								items={displayTags}
								variant='small'
								wrap={false}
							/>
						</div>
					)}
				</div>
				{onToggleLike && (
					<button
						className={`${styles.standartLike} ${
							localLiked ? styles.liked : ''
						} ${isAnimating ? styles.animating : ''}`}
						onClick={handleLikeClick}
						aria-label='Добавить в избранное'
						type='button'>
						{localLiked ? <LikeActive /> : <Like />}
					</button>
				)}
			</Link>
		);
	}
	return null;
};
