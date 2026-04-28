import styles from './ProfilePage.module.scss'
import { MOCK_USER } from '../../mocks/users';
import { Profile } from '@components';

export const ProfilePage = () => {
	return (
		<section className={styles.section}>
			<Profile
				username={MOCK_USER.username}
				name={MOCK_USER.name}
				email={MOCK_USER.email}
				phone={MOCK_USER.number}
				avatar={MOCK_USER.avatar}
				level={MOCK_USER.level}
				birthday={MOCK_USER.birthday}
				friends={[
					{
						id: '1',
						name: 'Анна Смирнова',
						avatar: '/avatars/anna.jpg',
					},
					{
						id: '2',
						name: 'Дмитрий Иванов',
						avatar: '/avatars/dima.jpg',
					},
					{
						id: '3', // Исправлен дубликат id
						name: 'Елена Петрова',
						avatar: '/avatars/elena.jpg',
					},
					{
						id: '4', // Исправлен дубликат id
						name: 'Сергей Сидоров',
						avatar: '/avatars/sergey.jpg',
					},
					{
						id: '5', // Исправлен дубликат id
						name: 'Мария Кузнецова',
						avatar: '/avatars/maria.jpg',
					},
					{
						id: '6', // Исправлен дубликат id
						name: 'Алексей Соколов',
						avatar: '/avatars/alexey.jpg',
					},
					{
						id: '7', // Исправлен дубликат id
						name: 'Ольга Новикова',
						avatar: '/avatars/olga.jpg',
					},
				]}
				recentRoutes={[
					{
						id: 1,
						name: 'Нижегородский Кремль',
						distance: 2100,
						imagePath: 'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF6CAqUw3vfiVrGaHxtOA4f9SgptgoFPe_BsrSaGPmYRKANvGlT83VY4PX5hsCpEl5NKkpuAQciLnuexNFC8C1qQV8ubl9yWjkY2ctFRo7xLkiHFPkvO-b4QLXb2fLi4hrIKftY=s680-w680-h510-rw',
						checkpoints: [
							{ latitude: 56.328, longitude: 44.002 },
							{ latitude: 56.329, longitude: 44.004 },
							{ latitude: 56.33, longitude: 44.003 },
							{ latitude: 56.331, longitude: 44.001 },
							{ latitude: 56.33, longitude: 43.998 },
							{ latitude: 56.328, longitude: 43.999 },
							{ latitude: 56.327, longitude: 44.0 },
							{ latitude: 56.327, longitude: 44.002 },
							{ latitude: 56.328, longitude: 44.002 },
						],
						tags: [
							{ id: 1, name: 'Кремль' },
							{ id: 2, name: 'История' },
							{ id: 3, name: 'Архитектура' },
							{ id: 4, name: 'Кремль' },
							{ id: 5, name: 'История' },
							{ id: 6, name: 'Архитектура' },
						],
					},
					{
						id: 2,
						name: 'Большая Покровская улица',
						distance: 1400,
						imagePath: 'https://nn-grad.ru/images/places/src/Ulica_Bol_shaya_Pokrovskaya_v_Nizhnem_Novgorode_(1).jpg',
						checkpoints: [
							{ latitude: 56.326, longitude: 44.007 },
							{ latitude: 56.325, longitude: 44.005 },
							{ latitude: 56.324, longitude: 44.003 },
							{ latitude: 56.323, longitude: 44.001 },
							{ latitude: 56.322, longitude: 43.999 },
							{ latitude: 56.321, longitude: 43.997 },
							{ latitude: 56.32, longitude: 43.995 },
							{ latitude: 56.319, longitude: 43.993 },
							{ latitude: 56.318, longitude: 43.991 },
						],
						tags: [
							{ id: 4, name: 'Пешеходный' },
							{ id: 5, name: 'Улица' },
							{ id: 6, name: 'Достопримечательности' },
						],
					},
					{
						id: 3,
						name: 'Набережная Федоровского',
						distance: 1800,
						imagePath: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6jBKQ6BIs_Y1plbAoR3ioY21jhTC0UKaLA&s',
						checkpoints: [
							{ latitude: 56.325, longitude: 44.021 },
							{ latitude: 56.324, longitude: 44.018 },
							{ latitude: 56.323, longitude: 44.015 },
							{ latitude: 56.322, longitude: 44.012 },
							{ latitude: 56.321, longitude: 44.009 },
							{ latitude: 56.32, longitude: 44.006 },
							{ latitude: 56.319, longitude: 44.003 },
						],
						tags: [
							{ id: 7, name: 'Набережная' },
							{ id: 8, name: 'Вид' },
							{ id: 9, name: 'Фото' },
						],
					},
				]}
			/>
		</section>
	);
};

export default ProfilePage;