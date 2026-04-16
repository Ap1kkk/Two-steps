import React, { useState } from 'react';
import styles from './Statistic.module.scss';
import { StatisticCard } from '../StatisticCard';
import { Button } from '@ui';

const periods = [
	{ key: 'day', label: 'За день' },
	{ key: 'week', label: 'За неделю' },
	{ key: 'month', label: 'За месяц' },
	{ key: 'year', label: 'За год' },
];

interface StatisticCardData {
	title: string;
	value: string | number;
}

interface StatisticProps {
	title?: string;
	statisticData?: StatisticCardData[];
}

export const Statistic: React.FC<StatisticProps> = ({ statisticData = [] }) => {
	const [activePeriod, setActivePeriod] =
		useState<(typeof periods)[number]['key']>('day');

	const handlePeriodChange = (period: (typeof periods)[number]['key']) => {
		setActivePeriod(period);
		console.log(`Выбран период: ${period}`);
	};

	return (
		<div className={styles.statisticContainer}>
			<h2 className={styles.statisticTitle}>Статистика</h2>
			<div className={styles.statisticFilterContainer}>
				{periods.map((period) => (
					<Button
						key={period.key}
						variant='primary'
						className={`${styles.statisticButton} ${
							activePeriod === period.key ? styles.active : ''
						}`}
						onClick={() => handlePeriodChange(period.key)}
						children={period.label}
					/>
				))}
			</div>
			<div className={styles.statisticContent}>
				{statisticData.map((item, index) => (
					<StatisticCard key={index} title={item.title}>
						{item.value}
					</StatisticCard>
				))}
			</div>
		</div>
	);
};
