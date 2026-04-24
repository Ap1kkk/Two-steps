import userExample from '../assets/images/avatarProfile/avatar2.png';

export const MOCK_USER = {
	id: 1,
	username: '@evgeniy020304',
	name: 'Евгений',
	email: 'evgeny@example.com',
	number: '+79081553950',
	password: '123456',
	avatar: userExample,
	level: 42,
	routes: 52,
	gender: 'male',
	height: 192,
	weight: 90,
	birthday: '15.03.1990',
	role: 'USER',
	isAuthenticated: true,
	friends: [
		{
			id: 2,
			name: 'Анна Смирнова',
			username: '@anna_smirnova',
			avatar: 'path/to/avatar.jpg',
		},
		{
			id: 3,
			name: 'Дмитрий Иванов',
			username: '@dima_ivanov',
			avatar: 'path/to/avatar2.jpg',
		},
	],
	recentRoutes: [
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
	],
};
