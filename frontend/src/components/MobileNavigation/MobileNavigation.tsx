import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MobileNavigation.module.scss';

import homeIcon from '../../assets/icons/home.svg';
import searchIcon from '../../assets/icons/search.svg';
import favouritesIcon from '../../assets/icons/like.svg';
import profileIcon from '../../assets/icons/user.svg';

export const MobileNavigation = () => {
	return (
		<nav className={styles.mobileNav}>
			<NavLink
				to='/'
				className={({ isActive }) =>
					`${styles.navItem} ${isActive ? styles.active : ''}`
				}>
				<img src={homeIcon} alt='Главная' />
				<span>Главная</span>
			</NavLink>

			<NavLink
				to='/search'
				className={({ isActive }) =>
					`${styles.navItem} ${isActive ? styles.active : ''}`
				}>
				<img src={searchIcon} alt='Поиск' />
				<span>Поиск</span>
			</NavLink>

			<NavLink
				to='/favourites'
				className={({ isActive }) =>
					`${styles.navItem} ${isActive ? styles.active : ''}`
				}>
				<img src={favouritesIcon} alt='Избранное' />
				<span>Избранное</span>
			</NavLink>

			<NavLink
				to='/profile_page'
				className={({ isActive }) =>
					`${styles.navItem} ${isActive ? styles.active : ''}`
				}>
				<img src={profileIcon} alt='Профиль' />
				<span>Профиль</span>
			</NavLink>
		</nav>
	);
};
