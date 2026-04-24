import React from 'react';
import styles from '../../ui/Circle/Circle.module.scss';

interface CircleProps {
	inCircle?: React.ReactNode;
	label?: string;
}

export const Circle: React.FC<CircleProps> = ({ inCircle, label }) => {
	return (
		<div className={styles.circleContainer}>
			<span className={styles.circle}>{inCircle}</span>
			<span className={styles.circleLabel}>{label}</span>
		</div>
	);
};

export default Circle;
