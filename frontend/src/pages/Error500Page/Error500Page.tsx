import { useNavigate } from 'react-router-dom';
import errorImage from '../../assets/images/error500.svg';
import { Button } from '@ui';
import styles from './Error500Page.module.css';

export const Error500Page = () => {
	const navigate = useNavigate();

	return (
		<div className={styles.pageWrapper}>
			<img
				src={errorImage}
				alt='500 Error'
				className={styles.illustration}
			/>
			<h1 className={styles.title}>На сервере произошла ошибка</h1>
			<p className={styles.description}>
				Попробуйте позже или вернитесь на главную страницу
			</p>
			<div className={styles.actions}>
				<Button variant='secondary'>Сообщить об ошибке</Button>
				<Button variant='primary' onClick={() => navigate('/')}>
					На главную
				</Button>
			</div>
		</div>
	);
};

export default Error500Page;
