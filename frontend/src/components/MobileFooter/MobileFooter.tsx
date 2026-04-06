import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Avatar } from '@ui';
import { MobileSettingsModal } from '../MobileSettingsModal';

import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Like } from '../../assets/icons/like.svg';

import styles from './MobileFooter.module.scss';

export const MobileFooter = () => {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

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

	const handleAvatarClick = () => {
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		navigate('/login');
		setIsModalOpen(false);
	};

	return (
		<>
			<footer className={styles.mobileFooter}>
				<nav className={styles.navigation}>
					<NavLink
						to='/'
						className={({ isActive }) =>
							`${styles.navItem} ${isActive ? styles.active : ''}`
						}>
						<Home />
						<span>Главная</span>
					</NavLink>

					<NavLink
						to='/search'
						className={({ isActive }) =>
							`${styles.navItem} ${isActive ? styles.active : ''}`
						}>
						<Search />
						<span>Поиск</span>
					</NavLink>

					<NavLink
						to='/favourites'
						className={({ isActive }) =>
							`${styles.navItem} ${isActive ? styles.active : ''}`
						}>
						<Like />
						<span>Избранное</span>
					</NavLink>

					<div
						className={styles.navItem}
						onClick={handleAvatarClick}
						style={{ cursor: 'pointer' }}>
						<Avatar alt={'avatar'} className={styles.avatar} />
						<span>Профиль</span>
					</div>
				</nav>
			</footer>

			<MobileSettingsModal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				isLightTheme={isLightTheme}
				onToggleTheme={toggleTheme}
				onLogout={handleLogout}
			/>
		</>
	);
};