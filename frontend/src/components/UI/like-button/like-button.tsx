import React from 'react';
import styles from './like-button.module.scss';

interface LikeButtonProps {
	routeId: number;
	isLiked: boolean;
	onToggle: (routeId: number) => void;
}

export const LikeButton: React.FC<LikeButtonProps> = ({
	routeId,
	isLiked,
	onToggle,
}) => {
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onToggle(routeId);
	};

	return (
		<button
			className={styles.likeButton}
			onClick={handleClick}
			aria-label={isLiked ? 'Убрать из избранного' : 'Добавить в избранное'}>
			<img
				src={isLiked ? '/icons/liked.svg' : '/icons/like.svg'}
				alt=''
				className={styles.likeIcon}
			/>
		</button>
	);
};
