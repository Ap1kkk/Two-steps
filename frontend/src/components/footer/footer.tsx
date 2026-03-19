import React from 'react';
import { Link } from 'react-router-dom';
import styles from './footer.module.scss';
import { Text } from '../UI/text';

export const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<div className={styles.content}>
					<Text
						className={styles.copyright}
						size={18}
						family={'spotify'}
						weight={400}>
						© {currentYear} Sport Line. Все права защищены
					</Text>

					<div className={styles.links}>
						<Link to='/about' className={styles.link}>
							О нас
						</Link>
						<Link to='/contacts' className={styles.link}>
							Контакты
						</Link>
						<Link to='/privacy' className={styles.link}>
							Политика конфиденциальности
						</Link>
					</div>

					<div className={styles.version}>Версия 1.0.0</div>
				</div>
			</div>
		</footer>
	);
};
