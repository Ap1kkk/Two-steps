import React from 'react';
import styles from './Settings.module.scss';
import { NavLink } from 'react-router-dom';

import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

export const Settings = () => {
	return (
		<div className={styles.modal}>
			<h3 className={styles.title}>Меню</h3>

			<div className={styles.content}>
				<NavLink to='/profile' className={styles.buttons}>
					<User />
					<span>Профиль</span>
				</NavLink>

				<button className={styles.buttons}>
					<Logout />
					<span> Выйти из аккаунта</span>
				</button>
			</div>
		</div>
	);
};
