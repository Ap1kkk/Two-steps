import { useNavigate } from 'react-router-dom';
import { Button } from '@ui';
import styles from './NotFoundPage.module.scss';
import errorImage from '../../assets/images/error404.svg';

export const NotFoundPage = () => {
	const navigate = useNavigate();
	return (
		<div className={styles.pageWrapper}>
			<div className={styles.content}>
				<img
					src={errorImage}
					alt='404 Error'
					className={styles.illustration}
				/>

				<h1 className={styles.title}>Страница не найдена</h1>

				<p className={styles.description}>
					К сожалению, эта страница недоступна. Вернитесь на главную
					страницу или попробуйте позже
				</p>

				<div className={styles.actions}>
					<Button className={styles.buttonError} variant='secondary'>
						Сообщить об ошибке
					</Button>
					<Button
						className={styles.button}
						variant='primary'
						onClick={() => navigate('/')}>
						На главную
					</Button>
				</div>
			</div>
		</div>
	);
};
export default NotFoundPage;
