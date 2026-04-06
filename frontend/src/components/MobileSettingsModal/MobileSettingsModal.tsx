import React from 'react';
import styles from './MobileSettingsModal.module.scss';
import { NavLink } from 'react-router-dom';

import userExample from '../../assets/images/avatarProfile/avatar1.png';
import { ReactComponent as Search } from '../../assets/icons/search.svg';
import { ReactComponent as Cross } from '../../assets/icons/cross.svg';
import { ReactComponent as Compass } from '../../assets/images/compass.svg';
import { ReactComponent as Dumbbells } from '../../assets/icons/dumbells.svg';
import { ReactComponent as Global } from '../../assets/icons/global.svg';
import { ReactComponent as Moon } from '../../assets/icons/moon.svg';
import { ReactComponent as Sun } from '../../assets/icons/sun.svg';
import { ReactComponent as User } from '../../assets/icons/user.svg';
import { ReactComponent as Logout } from '../../assets/icons/logout.svg';

interface MobileSettingsModalProps {
	isOpen: boolean;
	onClose: () => void;
	isLightTheme: boolean;
	onToggleTheme: () => void;
	onLogout: () => void;
}

export const MobileSettingsModal: React.FC<MobileSettingsModalProps> = ({
	isOpen,
	onClose,
	isLightTheme,
	onToggleTheme,
	onLogout,
}) => {
	if (!isOpen) return null;

	return (
		<>
			<div className={styles.overlay} onClick={onClose} />
			<div className={styles.modal}>
				<div className={styles.header}>
					<h3 className={styles.title}>Меню</h3>
					<Cross onClick={onClose} className={styles.closeButton} />
				</div>

				<div className={styles.content}>
					{isLightTheme ? (
						<div className={styles.buttons} onClick={onToggleTheme}>
							<Sun />
							<span>Светлая</span>
						</div>
					) : (
						<div className={styles.buttons} onClick={onToggleTheme}>
							<Moon />
							<span>Тёмная</span>
						</div>
					)}

					<NavLink
						to='/profile_page'
						className={styles.buttons}
						onClick={onClose}>
						<User />
						<span>Профиль</span>
					</NavLink>

					<button className={styles.buttons} onClick={onLogout}>
						<Logout />
						<span> Выйти из аккаунта</span>
					</button>
				</div>
			</div>
		</>
	);
};
