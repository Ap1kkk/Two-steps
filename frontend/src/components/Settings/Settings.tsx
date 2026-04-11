import React, { useState, useEffect } from 'react';
import styles from './Settings.module.scss';
import { NavLink } from 'react-router-dom';

import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { ReactComponent as Sun } from '../../assets/icons/sun.svg';
import { ReactComponent as Moon } from '../../assets/icons/moon.svg';

export const Settings = () => {
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

	return (
		<div className={styles.modal}>
			<h3 className={styles.title}>Меню</h3>

			<div className={styles.content}>
				<NavLink to='/profile' className={styles.buttons}>
					<User />
					<span>Профиль</span>
				</NavLink>

				<button onClick={toggleTheme} className={styles.buttons}>
					{isLightTheme ? <Moon /> : <Sun />}
					<span>{isLightTheme ? 'Тёмная тема' : 'Светлая тема'}</span>
				</button>

				<button className={styles.buttons}>
					<Logout />
					<span>Выйти из аккаунта</span>
				</button>
			</div>
		</div>
	);
};