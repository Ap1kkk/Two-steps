import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Avatar, Button, Input } from '@ui';
import { useDeviceType } from '../../utils/hooks/useDeviceType';

import search from '../../assets/icons/search.svg';
import cross from '../../assets/icons/cross.svg';
import compass from '../../assets/images/compass.svg';
import userExample from '../../assets/images/avatarProfile/avatar1.png';
import user from '../../assets/icons/user.svg';
import dumbbells from '../../assets/icons/dumbells.svg';
import global from '../../assets/icons/global.svg';

import styles from './Header.module.scss';

type Mode = 'sport' | 'tourism';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const deviceType = useDeviceType();
	const isMobile = deviceType === 'mobile';

	const [isAuthenticated] = useState(true);

	const [mode, setMode] = useState<Mode>(() => {
		const saved = localStorage.getItem('appMode');
		return saved === 'sport' ? 'sport' : 'tourism';
	});

	const toggleMode = () => {
		const newMode = mode === 'sport' ? 'tourism' : 'sport';
		setMode(newMode);
		localStorage.setItem('appMode', newMode);
	};

	const currentImage = mode === 'sport' ? dumbbells : global;
	const currentText = mode === 'sport' ? 'Спорт' : 'Туризм';

	const isAuthPage =
		location.pathname === '/login' || location.pathname === '/registration';

	if (isAuthPage) {
		return (
			<header className={styles.header}>
				<nav className={styles.navigation_auth}>
					<Link to='/' className={styles.logoContainer}>
						<img
							src={compass}
							alt='logo'
							className={styles.logoImage}
						/>
						<span className={styles.logoTitle}>Routie</span>
					</Link>
					<Button
						type={'button'}
						variant={'tertiary'}
						iconRight={
							<img
								src={cross}
								className={styles.closeIcon}
								alt='Закрыть'
							/>
						}
						onClick={() => navigate('/', { replace: true })}
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
				{isMobile ? (
					<>
						<img
							src={search}
							alt='Кнопка поиска'
							className={styles.icons}
							onClick={() => navigate('/favourites')}
						/>
						<Link to='/' className={styles.logoContainer}>
							<img
								src={compass}
								alt='Логотип'
								className={styles.logoImage}
							/>
							<span className={styles.logoTitle}>Routie</span>
						</Link>
						<div className={styles.mobileUserCard}>
							<Button
								onClick={toggleMode}
								variant={'tertiary'}
								iconLeft={
									<img src={currentImage} alt={currentText} />
								}
								children={currentText}
								className={styles.typeSelector}
							/>
							{isAuthenticated ? (
								<Button
									type={'button'}
									variant={'tertiary'}
									iconRight={
										<Avatar
											src={userExample}
											size={'small'}
										/>
									}
									children={'Евгений'}
									className={styles.userCard}
									onClick={() => navigate('/profile_page')}
								/>
							) : (
								<Link
									to='/login'
									className={styles.enterContainer}>
									<img
										src={user}
										className={styles.userIcon}
										alt={'Войти в аккаунт'}
									/>
									<span className={styles.enter}>Войти</span>
								</Link>
							)}
						</div>
					</>
				) : (
					<>
						<Link to='/' className={styles.logoContainer}>
							<img
								src={compass}
								alt='Логотип'
								className={styles.logoImage}
							/>
							<span className={styles.logoTitle}>Routie</span>
						</Link>
						<Button
							onClick={toggleMode}
							variant={'tertiary'}
							iconLeft={
								<img src={currentImage} alt={currentText} />
							}
							children={currentText}
							className={styles.typeSelector}
						/>
						<Input
							className={styles.input}
							placeholder={'Введите название маршрута...'}
							iconLeft={
								<img
									src={search}
									alt='Значок поиска'
									aria-hidden='true'
								/>
							}
						/>
						{isAuthenticated ? (
							<Button
								type={'button'}
								variant={'tertiary'}
								iconRight={
									<Avatar src={userExample} size={'small'} />
								}
								children={'Евгений'}
								onClick={() => navigate('/profile_page')}
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
					</>
				)}
			</nav>
		</header>
	);
};
