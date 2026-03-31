import React from 'react';
import styles from './avatar.module.scss';

type AvatarSize = 'small' | 'medium' | 'large';

interface AvatarProps {
	src?: string;
	alt?: string;
	size?: AvatarSize;
	className?: string;
}

const sizeMap = {
	small: 32,
	medium: 48,
	large: 100,
};

export const Avatar: React.FC<AvatarProps> = ({
	src,
	alt = 'avatar',
	size = 'medium',
	className = '',
}) => {
	const sizePx = sizeMap[size];

	const initial = alt !== 'avatar' && alt.length > 0 ? alt[0].toUpperCase() : '?';

	return (
		<div
			className={`${styles.avatar} ${styles[size]} ${className}`}
			style={{ width: sizePx, height: sizePx }}
		>
			{src ? (
				<img src={src} alt={alt} className={styles.image} />
			) : (
				<span className={styles.placeholder}>{initial}</span>
			)}
		</div>
	);
};
