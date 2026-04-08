import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as Compass } from '../../assets/images/compass.svg';
import { ReactComponent as Dumbbells } from '../../assets/icons/dumbells-small.svg';
import { ReactComponent as Global } from '../../assets/icons/global-small.svg';

import styles from './MobileHeader.module.scss';
import { Button } from '@ui';

type Mode = 'sport' | 'tourism';

export const MobileHeader = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const [isLightTheme, setIsLightTheme] = useState<boolean>(() => {
		const saved = localStorage.getItem('theme');
		if (saved === null) {
			return !window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return saved === 'light';
	});

	const [mode, setMode] = useState<Mode>(() => {
		const saved = localStorage.getItem('appMode');
		return saved === 'sport' ? 'sport' : 'tourism';
	});

	const toggleMode = () => {
		const newMode = mode === 'sport' ? 'tourism' : 'sport';
		setMode(newMode);
		localStorage.setItem('appMode', newMode);
	};

	const currentImage =
		mode === 'sport' ? (
			<Dumbbells />
		) : (
			<Global />
		);
	const currentText = mode === 'sport' ? 'Спорт' : 'Туризм';

	const isAuthPage =
		location.pathname === '/login' || location.pathname === '/registration';

	if (isAuthPage) {
		return (
			<header className={styles.header}>
				<nav className={styles.navigation_auth}>
					<Link to='/routie' className={styles.logoContainer}>
						<Compass
							className={
								isLightTheme
									? styles.logoLight
									: styles.logoDark
							}
						/>
						<span className={styles.logoTitle}>Routie</span>
					</Link>
					<Button
						type={'button'}
						variant={'tertiary'}
						iconRight={<Cross />}
						onClick={() => navigate('/routie', { replace: true })}
						children={'Закрыть'}
						className={styles.closeButton}
					/>
				</nav>
			</header>
		);
	}

	return (
		<header className={styles.header}>
			<nav className={styles.navigation}>
				<Button
					onClick={toggleMode}
					variant={'tertiary'}
					iconLeft={currentImage}
					children={currentText}
					className={styles.resetPadding}
				/>
				<Link to='/routie' className={styles.logoContainer}>
					<Compass
						width={24}
						height={24}
						className={
							isLightTheme ? styles.logoLight : styles.logoDark
						}
					/>
					<span className={styles.logoTitle}>Routie</span>
				</Link>
				{isAuthenticated ? (
					<></>
				) : (
					<Button
						type={'button'}
						variant={'tertiary'}
						onClick={() => navigate('/login')}
						children={'Войти'}
						className={styles.resetPadding}
					/>
				)}
			</nav>
		</header>
	);
};
