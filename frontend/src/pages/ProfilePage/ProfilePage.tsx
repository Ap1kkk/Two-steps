import styles from './ProfilePage.module.scss'
import { MOCK_USER } from '../../mocks/mock';
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
				routesCounter={MOCK_USER.routes}
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
						id: '2',
						name: 'Дмитрий Иванов',
						avatar: '/avatars/dima.jpg',
					},
					{
						id: '2',
						name: 'Дмитрий Иванов',
						avatar: '/avatars/dima.jpg',
					},
					{
						id: '2',
						name: 'Дмитрий Иванов',
						avatar: '/avatars/dima.jpg',
					},
					{
						id: '2',
						name: 'Дмитрий Иванов',
						avatar: '/avatars/dima.jpg',
					},
					{
						id: '2',
						name: 'Дмитрий Иванов',
						avatar: '/avatars/dima.jpg',
					},
				]}
				recentRoutes={[
					{
						id: 1,
						name: 'Нижегородский Кремль',
						distance: 2100,
						imagePath:
							'https://lh3.googleusercontent.com/gps-cs-s/APNQkAF6CAqUw3vfiVrGaHxtOA4f9SgptgoFPe_BsrSaGPmYRKANvGlT83VY4PX5hsCpEl5NKkpuAQciLnuexNFC8C1qQV8ubl9yWjkY2ctFRo7xLkiHFPkvO-b4QLXb2fLi4hrIKftY=s680-w680-h510-rw',
						checkpoints: [
							{ latitude: 56.328, longitude: 44.002 }, // Дмитриевская башня (главный вход)
							{ latitude: 56.329, longitude: 44.004 }, // Кладовая башня
							{ latitude: 56.33, longitude: 44.003 }, // Никольская башня
							{ latitude: 56.331, longitude: 44.001 }, // Коромыслова башня
							{ latitude: 56.33, longitude: 43.998 }, // Тайницкая башня
							{ latitude: 56.328, longitude: 43.999 }, // Северная башня
							{ latitude: 56.327, longitude: 44.0 }, // Ивановская башня
							{ latitude: 56.327, longitude: 44.002 }, // Часовой двор
							{ latitude: 56.328, longitude: 44.002 }, // Возврат к Дмитриевской башне
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
						imagePath:
							'https://nn-grad.ru/images/places/src/Ulica_Bol_shaya_Pokrovskaya_v_Nizhnem_Novgorode_(1).jpg',
						checkpoints: [
							{ latitude: 56.326, longitude: 44.007 }, // Площадь Горького (начало)
							{ latitude: 56.325, longitude: 44.005 }, // Театр драмы
							{ latitude: 56.324, longitude: 44.003 }, // Дом связи
							{ latitude: 56.323, longitude: 44.001 }, // Кинотеатр Октябрь
							{ latitude: 56.322, longitude: 43.999 }, // Центральный универмаг
							{ latitude: 56.321, longitude: 43.997 }, // Памятник Чкалову
							{ latitude: 56.32, longitude: 43.995 }, // Здание Государственного банка
							{ latitude: 56.319, longitude: 43.993 }, // Мининский сквер
							{ latitude: 56.318, longitude: 43.991 }, // Площадь Минина (конец)
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
						imagePath:
							'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQj6jBKQ6BIs_Y1plbAoR3ioY21jhTC0UKaLA&s',
						checkpoints: [
							{ latitude: 56.325, longitude: 44.021 }, // Канавинский мост
							{ latitude: 56.324, longitude: 44.018 }, // Рождественская церковь
							{ latitude: 56.323, longitude: 44.015 }, // Смотровая площадка
							{ latitude: 56.322, longitude: 44.012 }, // Памятник Александру Невскому
							{ latitude: 56.321, longitude: 44.009 }, // Речной вокзал
							{ latitude: 56.32, longitude: 44.006 }, // Чкаловская лестница (вид сверху)
							{ latitude: 56.319, longitude: 44.003 }, // Александровский сад
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
