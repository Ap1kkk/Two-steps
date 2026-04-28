import React from 'react';
import styles from './Avatar.module.scss';

type AvatarSize = 'tiny' | 'small' | 'medium' | 'big' | 'large';

interface AvatarProps {
	src?: string | null;
	alt?: string;
	size?: AvatarSize;
	className?: string;
}

const sizeMap = {
	tiny: 24,
	small: 32,
	medium: 48,
	big: 72,
	large: 150,
};

export const Avatar: React.FC<AvatarProps> = ({
	src,
	alt = 'avatar',
	size = 'medium',
	className = '',
}) => {
	const sizePx = sizeMap[size];

	const initial =
		alt !== 'avatar' && alt.length > 0 ? alt[0].toUpperCase() : '?';

	return (
		<div
			className={`${styles.avatar} ${styles[size]} ${className}`}
			style={{ width: sizePx, height: sizePx }}>
			{src ? (
				<img src={src} alt={alt} className={styles.image} />
			) : (
				<span className={styles.placeholder}>{initial}</span>
			)}
		</div>
	);
};
