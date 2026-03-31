import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { Button } from '@ui';

import user from '../../assets/icons/user.svg';
import search from '../../assets/icons/search.svg';
import cross from '../../assets/icons/cross.svg';
import logo from '../../assets/images/logo.svg';
import compass from '../../assets/images/compass.svg';

import styles from './Header.module.scss';

export const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();

	const [isAuthenticated] = useState(false);

	const isAuthPage =
		location.pathname === '/login' || location.pathname === '/registration';

	if (isAuthPage) {
		return (
			<header className={styles.header}>
				<nav className={styles.navigation}>
					<Link to='/' className={styles.logo}>
						<img src={compass} alt='logo' className={styles.logo_image} />
						<span className={styles.title}>Routie</span>
					</Link>
					<Link to='/'>
						<Button
							type={'button'}
							variant={'outline'}
							rightIcon={<img src={cross} alt='Закрыть' />}
							className={styles.closeButton}
							onClick={() => navigate('/', { replace: true })}>
							Закрыть
						</Button>
					</Link>
				</nav>
			</header>
		);
	}

	return (
		<header className={styles.header}>
			<nav className={styles.navigation}>
				<Link to='/favourites' className={styles.link} aria-label='Поиск'>
					<img
						src={search}
						alt=''
						className={styles.icons}
						aria-hidden='true'
					/>
				</Link>

				<Link to='/main_page' className={`${styles.link} ${styles.logo}`}>
					<h1>Два шага</h1>
				</Link>

				{isAuthenticated ? (
					<Link to='/profile_page' className={styles.link} aria-label='Профиль'>
						<img
							src={user}
							alt=''
							className={styles.icons}
							aria-hidden='true'
						/>
					</Link>
				) : (
					<Link to='/login'>
						<Button variant='primary' padding={20}>
							Войти
						</Button>
					</Link>
				)}
			</nav>
		</header>
	);
};
