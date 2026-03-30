import React from 'react';
import styles from './route-of-day.module.scss';
import {Button} from "../../UI/button/button";

interface RouteOfTheDayProps {
	onNavigate: () => void;
}

export const RouteOfTheDay: React.FC<RouteOfTheDayProps> = ({ onNavigate }) => {
	return (
		<div className={styles.mapNiNo}>
			<div className={styles.mapSection}>
				<div className={styles.mapOverlay}>
					<h2 className={styles.mapTitle}>Маршрут дня</h2>
					<Button
						variant='primary'
						onClick={onNavigate}
					>
						Поехали
					</Button>
				</div>
			</div>
		</div>
	);
};
