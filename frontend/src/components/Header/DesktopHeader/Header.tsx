import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Input } from '@ui';

import { ReactComponent as Search } from '../../../assets/icons/search.svg';
import { ReactComponent as Cross } from '../../../assets/icons/cross.svg';
import { ReactComponent as Compass } from '../../../assets/images/compass.svg';
import { ReactComponent as Dumbbells } from '../../../assets/icons/dumbells.svg';
import { ReactComponent as Global } from '../../../assets/icons/global.svg';
import { ReactComponent as Moon } from '../../../assets/icons/moon.svg';
import { ReactComponent as Sun } from '../../../assets/icons/sun.svg';

import { MOCK_USER } from '../../../mocks/mock';

import styles from './Header.module.scss';

type Mode = 'sport' | 'tourism';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isLightTheme, setIsLightTheme] = useState<boolean>(() => {
		const saved = localStorage.getItem('theme');
		if (saved === null) {
			return !window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return saved === 'light';
	});

	useEffect(() => {
		if (isLightTheme) {
			document.body.classList.remove('dark-theme');
			localStorage.setItem('theme', 'light');
		} else {
			document.body.classList.add('dark-theme');
			localStorage.setItem('theme', 'dark');
		}
	}, [isLightTheme]);

	const toggleTheme = () => {
		setIsLightTheme(!isLightTheme);
	};

	const [isAuthenticated, setIsAuthenticated] = useState(
		MOCK_USER.isAuthenticated
	);

	const [mode, setMode] = useState<Mode>(() => {
		const saved = localStorage.getItem('appMode');
		return saved === 'sport' ? 'sport' : 'tourism';
	});

	const toggleMode = () => {
		const newMode = mode === 'sport' ? 'tourism' : 'sport';
		setMode(newMode);
		localStorage.setItem('appMode', newMode);
	};

	const currentImage = mode === 'sport' ? <Dumbbells /> : <Global />;
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
				<Link to='/routie' className={styles.logoContainer}>
					<Compass
						className={
							isLightTheme ? styles.logoLight : styles.logoDark
						}
					/>
					<span className={styles.logoTitle}>Routie</span>
				</Link>
				<Button
					onClick={toggleMode}
					variant={'tertiary'}
					iconLeft={currentImage}
					children={currentText}
					className={styles.typeSelector}
				/>
				<Input
					className={styles.input}
					placeholder={'Введите название маршрута...'}
					iconLeft={<Search />}
				/>
				<div className={styles.themeButton} onClick={toggleTheme}>
					{isLightTheme ? <Moon /> : <Sun />}
				</div>
				{isAuthenticated ? (
					<Button
						type={'button'}
						variant={'tertiary'}
						iconRight={
							<Avatar src={MOCK_USER.avatar} size={'small'} />
						}
						children={MOCK_USER.name}
						onClick={() => navigate('/profile')}
						className={styles.userCard}
					/>
				) : (
					<div className={styles.authContainer}>
						<Button
							type={'button'}
							variant={'secondary'}
							className={styles.auth}
							onClick={() => navigate('/login')}
							children={'Войти'}
						/>
						<Button
							type={'button'}
							variant={'primary'}
							className={styles.registration}
							onClick={() => navigate('/registration')}
							children={'Зарегистрироваться'}
						/>
					</div>
				)}
			</nav>
		</header>
	);
};
