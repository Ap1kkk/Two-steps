import React, { useState } from 'react';
import styles from './Statistic.module.scss';
import { StatisticCard } from '../StatisticCard';
import { Button } from '@ui';

interface StatisticProps {
	title?: string;
}

type Period = 'day' | 'week' | 'month' | 'year';

export const Statistic: React.FC<StatisticProps> = ({ title = '' }) => {
	const [activePeriod, setActivePeriod] = useState<Period>('day');

	const handlePeriodChange = (period: Period) => {
		setActivePeriod(period);
		console.log(`Выбран период: ${period}`);
	};

	return (
		<div className={styles.statisticContainer}>
			<span className={styles.statisticTitle}>{title}</span>
			<div className={styles.statisticButtons}>
				<Button
					variant='primary'
					className={`${styles.statisticButton} ${
						activePeriod === 'day' ? styles.active : ''
					}`}
					onClick={() => handlePeriodChange('day')}>
					<p>За день</p>
				</Button>
				<Button
					variant='primary'
					className={`${styles.statisticButton} ${
						activePeriod === 'week' ? styles.active : ''
					}`}
					onClick={() => handlePeriodChange('week')}>
					<p>За неделю</p>
				</Button>
				<Button
					variant='primary'
					className={`${styles.statisticButton} ${
						activePeriod === 'month' ? styles.active : ''
					}`}
					onClick={() => handlePeriodChange('month')}>
					<p>За месяц</p>
				</Button>
				<Button
					variant='primary'
					className={`${styles.statisticButton} ${
						activePeriod === 'year' ? styles.active : ''
					}`}
					onClick={() => handlePeriodChange('year')}>
					<p>За год</p>
				</Button>
			</div>
			<div className={styles.statisticContent}>
				<StatisticCard title='Всего пройдено метров'>
					145 209
				</StatisticCard>
				<StatisticCard title='Всего пройдено шагов'>
					1 208 132
				</StatisticCard>
				<StatisticCard title='Общее время пройденных маршрутов'>
					5д 18ч 47мин
				</StatisticCard>
				<StatisticCard title='Пройдено точек маршрута'>
					23 789
				</StatisticCard>
				<StatisticCard title='Средняя длина маршрутов'>
					3 605м
				</StatisticCard>
				<StatisticCard title='Среднее время пройденных маршрутов'>
					2ч 25мин
				</StatisticCard>
			</div>
		</div>
	);
};
