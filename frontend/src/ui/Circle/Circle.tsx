import React from 'react';
import styles from '../../ui/Circle/Circle.module.scss';

interface CircleProps {
	children?: React.ReactNode;
}

export const Circle: React.FC<CircleProps> = ({
										   children,
									   }) => {
	return (
		<span className={styles.smallCircle}>{children}</span>
	);
};

export default Circle;