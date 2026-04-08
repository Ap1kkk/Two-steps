import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '@ui';

import { ReactComponent as Home } from '../../assets/icons/home.svg';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Like } from '../../assets/icons/like.svg';

import styles from './MobileFooter.module.scss';

export const MobileFooter = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const indicatorRef = useRef<HTMLDivElement>(null);
	const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

	const paths = ['/', '/filter', '/favourites', '/settings'];

	const updateIndicator = () => {
		const activeIndex = paths.findIndex(
			(path) => location.pathname === path
		);
		if (activeIndex === -1 || !indicatorRef.current) return;

		const activeButton = buttonsRef.current[activeIndex];
		if (!activeButton) return;

		const buttonRect = activeButton.getBoundingClientRect();
		const navRect = activeButton.parentElement?.getBoundingClientRect();

		if (navRect) {
			const left = buttonRect.left - navRect.left;
			const width = buttonRect.width;

			indicatorRef.current.style.transform = `translateX(${left}px)`;
			indicatorRef.current.style.width = `${width}px`;
		}
	};

	useEffect(() => {
		updateIndicator();
		window.addEventListener('resize', updateIndicator);
		return () => window.removeEventListener('resize', updateIndicator);
	}, [location.pathname]);

	const handleNavigation = (path: string) => {
		navigate(path);
	};

	const [isLightTheme, setIsLightTheme] = useState<boolean>(() => {
		const saved = localStorage.getItem('theme');
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

	return (
		<footer className={styles.footer}>
			<div className={styles.footerWrapper}>
				<nav className={styles.navigation}>
					<div ref={indicatorRef} className={styles.indicator} />
					<button
						ref={(el) => (buttonsRef.current[0] = el)}
						onClick={() => handleNavigation('/routie')}
						className={`${styles.link} ${
							location.pathname === '/routie'
						}`}>
						<Home />
						<span className={styles.title}>Главная</span>
					</button>

					<button
						ref={(el) => (buttonsRef.current[1] = el)}
						onClick={() => handleNavigation('/filter')}
						className={`${styles.link} ${
							location.pathname === '/filter' ? styles.active : ''
						}`}>
						<Search />
						<span className={styles.title}>Поиск</span>
					</button>

					<button
						ref={(el) => (buttonsRef.current[2] = el)}
						onClick={() => handleNavigation('/favourites')}
						className={`${styles.link} ${
							location.pathname === '/favourites'
								? styles.active
								: ''
						}`}>
						<Like />
						<span className={styles.title}>Избранное</span>
					</button>

					<button
						ref={(el) => (buttonsRef.current[3] = el)}
						onClick={() => handleNavigation('/settings')}
						className={`${styles.link} ${
							location.pathname === '/settings'
								? styles.active
								: ''
						}`}>
						<Avatar alt={'avatar'} className={styles.avatar} />
						<span className={styles.title}>Профиль</span>
					</button>
				</nav>
			</div>
		</footer>
	);
};