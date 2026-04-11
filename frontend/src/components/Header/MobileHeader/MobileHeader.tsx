import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as Compass } from '../../../assets/images/compass.svg';
import { ReactComponent as Arrow } from '../../../assets/icons/chevron-right.svg';

import styles from './MobileHeader.module.scss';

export const MobileHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isLightTheme, setIsLightTheme] = useState<boolean>(() => {
		const saved = localStorage.getItem('theme');
		if (saved === null) {
			return !window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return saved === 'light';
	});

	const handleGoBack = () => {
		navigate(-1);
	};

	const isHomePage = location.pathname === '/routie';

	return (
		<header className={styles.header}>
			{!isHomePage && (
				<span onClick={handleGoBack} className={`${styles.button} ${styles.closeButton}`}>
					<Arrow  className={styles.arrowIcon} />
				</span>

			)}

			<Link to='/routie' className={`${styles.logoContainer} ${styles.button}`}>
				<Compass
					width={24}
					height={24}
					className={
						isLightTheme ? styles.logoLight : styles.logoDark
					}
				/>
				<span className={styles.logoTitle}>Routie</span>
			</Link>
		</header>
	);
};
