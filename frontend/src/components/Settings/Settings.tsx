import React, { useState, useEffect } from 'react';
import styles from './Settings.module.scss';
import { useNavigate } from 'react-router-dom';
import { Avatar, Button } from '@ui';

import { ReactComponent as User } from '../../assets/icons/user-circle.svg';
import { ReactComponent as Edit } from '../../assets/icons/edit.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';
import { ReactComponent as Sun } from '../../assets/icons/sun.svg';
import { ReactComponent as Moon } from '../../assets/icons/moon.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/chevron-right.svg';

interface SettingsProps {
	onLogout?: () => void;
	className?: string;
}

export const Settings: React.FC<SettingsProps> = ({
	onLogout,
	className = '',
}) => {
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

	const handleLogout = () => {
		if (onLogout) {
			onLogout();
		}
	};

	return (
		<div className={`${styles.container} ${className}`}>
			<div className={styles.content}>
				<article className={styles.headerContent}>
					<Avatar size={'big'} />
					<p className={styles.profileUsername}>
						Eвгений
						<span className={styles.level}>100</span>
					</p>
					<p className={styles.profileEmail}>
						evgeniinaumov04@gmail.com
					</p>
				</article>
				<article className={styles.card}>
					<div className={styles.buttonCard}>
						<User />
						<Button
							children={'Профиль'}
							iconRight={<ArrowRight />}
							variant={'tertiary'}
							className={styles.buttonMenu}
							onClick={() => navigate('/profile')}
						/>
					</div>
					<div className={styles.buttonCard}>
						<Edit />
						<Button
							children={'Редактирование профиля'}
							iconRight={<ArrowRight />}
							variant={'tertiary'}
							className={styles.buttonMenu}
							onClick={() => navigate('/')}
						/>
					</div>
				</article>
				<article className={styles.card}>
					<button onClick={toggleTheme} className={styles.buttons}>
						{isLightTheme ? <Moon /> : <Sun />}
						<span>
							{isLightTheme ? 'Тёмная тема' : 'Светлая тема'}
						</span>
					</button>
				</article>

				<article className={styles.card}>
					<button
						onClick={handleLogout}
						className={`${styles.buttons} ${styles.exit}`}>
						<Logout />
						<span>Выйти из аккаунта</span>
					</button>
				</article>
			</div>
		</div>
	);
};
