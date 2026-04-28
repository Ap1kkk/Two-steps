import { EditProfileForm } from '@components';
import { MOCK_USER } from '../../mocks/mock';
import styles from './EditProfilePage.module.scss'

const AVAILABLE_PREFERENCES = [
	{ id: 1, label: 'Спорт' },
	{ id: 2, label: 'Туризм' },
	{ id: 3, label: 'Велоспорт' },
	{ id: 4, label: 'Бег' },
	{ id: 5, label: 'Плавание' },
	{ id: 6, label: 'Йога' },
	{ id: 7, label: 'Фитнес' },
	{ id: 8, label: 'Скандинавская ходьба' },
	{ id: 9, label: 'Альпинизм' },
	{ id: 10, label: 'Лыжи' },
];

export const EditProfilePage = () => {
	return (
		<section className={styles.container}>
			<EditProfileForm
				data={{
					name: MOCK_USER.name,
					weight: MOCK_USER.weight,
					height: MOCK_USER.height,
					avatarUrl: MOCK_USER.avatar,
					preferences: MOCK_USER.preferences
				}}
				availablePreferences={AVAILABLE_PREFERENCES}
			/>
		</section>
	);
};

export default EditProfilePage;