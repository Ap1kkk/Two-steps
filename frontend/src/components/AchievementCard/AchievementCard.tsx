import styles from './AchievementCard.module.scss'
import React from 'react';

interface AchievementCardProps {
	children?: React.ReactNode;
	title?: string;
	caption?: string;
	image?: React.ReactNode;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
	children,
	title = '',
	caption = '',
	image,
}) => {
	return (
		<article className={styles.container}>
			<span className={styles.cardImage}>{image}</span>
			<span className={styles.cardTitle}>{title}</span>
			<p className={styles.cardCaption}>{caption}</p>
			<span className={styles.cardContent}>
				<span className={styles.cardContentValue}>{children}</span>
			</span>
		</article>
	);
};