import styles from './Achievement.module.scss';
import { AchievementCard } from '../AchievementCard';
import React from 'react';

export interface AchievementItem {
	id: number;
	title: string;
	value: string;
	caption: string;
	image?: React.ReactNode;
	progress?: number;
	isLocked?: boolean;
}

interface AchievementProps {
	achievementsData?: AchievementItem[];
}

export const Achievement: React.FC<AchievementProps> = ({
	achievementsData = [],
}) => {
	return (
		<div className={styles.container}>
			<h2 className={styles.achievementTitle}>Достижения</h2>
			<div className={styles.achievementContent}>
				{achievementsData.map((achievement) => (
					<AchievementCard
						key={achievement.id}
						title={achievement.title}
						image={achievement.image}
						caption={achievement.caption}>
						{achievement.value}
					</AchievementCard>
				))}
			</div>
		</div>
	);
};
