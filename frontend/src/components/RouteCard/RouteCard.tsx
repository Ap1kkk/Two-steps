import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tag } from '@ui';
import { Route } from '../../types/route';

import like from '../../assets/icons/like.svg';
import likeActive from '../../assets/icons/like-green.svg';

import styles from './RouteCard.module.scss';

interface RouteCardProps {
	route: Route;
	tags?: string[];
	onToggleLike?: (id: number) => void;
	variant?: 'standard' | 'compact';
}

export const RouteCard: React.FC<RouteCardProps> = ({
	route,
	tags,
	onToggleLike,
	variant = 'standard',
}) => {
	const [isAnimating, setIsAnimating] = useState(false);

	const formatDistance = (distance: number) => {
		if (distance >= 1000) {
			return `${(distance / 1000).toFixed(1)} км`;
		}
		return `${distance} м`;
	};

	const handleLikeClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();

		setIsAnimating(true);
		setTimeout(() => setIsAnimating(false), 400);
		onToggleLike?.(route.id);
	};

	const getTagsToShow = (): string[] => {
		if (tags && tags.length > 0) return tags;
		if (route.categories && route.categories.length > 0) {
			return route.categories.map(cat => cat.name);
		}
		return [];
	};


	if (variant === 'standard') {
		return (
			<div className={styles.route_card}>
				<Link to={`/map/${route.id}`} className={styles.route_link}>
					<img
						src={route.imagePath}
						alt={route.name}
						className={styles.route_image}
						loading='lazy'
					/>
				</Link>
				<div className={styles.route_content}>
					<Link to={`/map/${route.id}`} className={styles.route_link}>
						{route.name}
					</Link>
					<span className={styles.route_distance}>
						Расстояние: {formatDistance(route.distance)}
					</span>
					{getTagsToShow().length > 0 && (
						<div className={styles.route_tags}>
							<Tag items={getTagsToShow()} variant='small' />
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
							src={route.imagePath}
							alt={route.name}
							className={styles.compactImage}
							loading='lazy'
						/>
						<div className={styles.compactContent}>
							<p className={styles.compactName}>{route.name}</p>
							<p className={styles.compactDistance}>
								{formatDistance(route.distance)}
							</p>
							{getTagsToShow().length > 0 && (
								<div className={styles.compactTags}>
									<Tag
										items={getTagsToShow()}
										variant='small'
									/>
								</div>
							)}
						</div>
						{onToggleLike && (
							<button
								className={styles.compactLikeButton}
								onClick={handleLikeClick}
								aria-label='Добавить в избранное'>
								<img
									src={like}
									alt='Добавить в избранное'
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
