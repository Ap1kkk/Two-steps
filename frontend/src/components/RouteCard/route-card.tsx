import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './route-card.module.scss';
import { Tag } from '@ui';
import { Route } from '../../types/route';

import like from '../../assets/icons/like.svg';
import likeActive from '../../assets/icons/like-green.svg';

type Difficulty = 'easy' | 'medium' | 'hard' | 'extreme';

interface RouteCardProps {
	route: Route;
	difficultyTranslation?: Record<Difficulty, string>;
	likedRoutes?: number[];
	onToggleLike?: (id: number) => void;
	variant?: 'standard' | 'compact';
	baseUrl?: string;
}

export const RouteCard: React.FC<RouteCardProps> = ({
	route,
	likedRoutes = [],
	onToggleLike,
	variant = 'standard',
	baseUrl = '',
}) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const formatDistance = (distance: number) => {
		if (distance >= 1000) {
			return `${(distance / 1000).toFixed(1)} км`;
		}
		return `${distance} м`;
	};

	const isLiked = likedRoutes.includes(route.id);

	const handleLikeClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 400);

		onToggleLike?.(route.id);
	};

	if (variant === 'standard') {
		return (
			<div className={styles.routeCard}>
				<Link to={`/map/${route.id}`} className={styles.routeLink}>
					<img
						src={`${baseUrl}${route.imagePath}`}
						alt={route.name}
						className={styles.routeImage}
						loading='lazy'
					/>
				</Link>

				{onToggleLike && (
					<button
						className={`${styles.likeButton} ${isLiked ? styles.liked : ''} ${
							isAnimating ? styles.animating : ''
						}`}
						onClick={handleLikeClick}
						aria-label={
							isLiked ? 'Убрать из избранного' : 'Добавить в избранное'
						}>
						<img
							src={isLiked ? likeActive : like}
							alt={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}
							className={styles.likeIcon}
						/>
					</button>
				)}

				<div className={styles.routeContent}>
					<Link to={`/map/${route.id}`} className={styles.routeLink}>
						{route.name}
					</Link>
					<span className={styles.distance}>
						Расстояние: {formatDistance(route.distance)}
					</span>
					{route.categories && route.categories.length > 0 && (
						<div className={styles.tagsWrapper}>
							<Tag categories={route.categories} variant='small' />
						</div>
					)}
				</div>
			</div>
		);
	}

	if (variant === 'compact') {
		return (
			<div className={styles.compactCard}>
				<Link to={`/map/${route.id}`} className={styles.compactLink}>
					<div className={styles.compactCardInner}>
						<img
							src={`${baseUrl}${route.imagePath}`}
							alt={route.name}
							className={styles.compactImage}
							loading='lazy'
						/>
						<div className={styles.compactContent}>
							<p className={styles.compactName}>{route.name}</p>
							<p className={styles.compactDistance}>
								{formatDistance(route.distance)}
							</p>
						</div>
						{onToggleLike && (
							<button
								className={`${styles.compactLikeButton} ${
									isLiked ? styles.liked : ''
								} ${isAnimating ? styles.animating : ''}`}
								onClick={handleLikeClick}
								aria-label={
									isLiked ? 'Убрать из избранного' : 'Добавить в избранное'
								}>
								<img
									src={isLiked ? likeActive : like}
									alt={
										isLiked ? 'Убрать из избранного' : 'Добавить в избранное'
									}
									className={styles.likeIcon}
								/>
							</button>
						)}
					</div>
				</Link>
			</div>
		);
	}

	return null;
};