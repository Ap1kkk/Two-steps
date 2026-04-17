import React from 'react';
import styles from './StatisticCard.module.scss';


interface StatisticCardProps {
	children?: React.ReactNode;
	title?: string;
}

export const StatisticCard: React.FC<StatisticCardProps> = ({
	children,
	title = '',
}) => {
	return (
		<div className={styles.container}>
			<span className={styles.cardTitle}>{title}</span>
			<span className={styles.cardContent}>{children}</span>
		</div>
	)
}