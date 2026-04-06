import React from 'react';
import styles from './RouteOfDay.module.scss';
import { Button } from '@ui';

interface RouteOfTheDayProps {
	onNavigate: () => void;
}

export const RouteOfTheDay: React.FC<RouteOfTheDayProps> = ({ onNavigate }) => {
	return (
		<div className={styles.background}>
				<div className={styles.overlay}>
					<h2 className={styles.title}>Маршрут дня</h2>
					<Button variant='primary' onClick={onNavigate} className={styles.button}>
						Поехали
					</Button>
				</div>
		</div>
	);
};
