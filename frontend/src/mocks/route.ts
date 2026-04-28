import { Route } from '../types/route';

export const mockRouteKremlin: Route = {
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
};

// Большая Покровская улица
export const mockRoutePokrovskaya: Route = {
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
};

// Набережная Федоровского
export const mockRouteFedorovskogo: Route = {
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
};

// Чкаловская лестница
export const mockRouteChkalovStairs: Route = {
	id: 4,
	name: 'Чкаловская лестница',
	distance: 800,
	imagePath:
		'data:image/jpeg;base64,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',
	checkpoints: [
		{ latitude: 56.32, longitude: 44.006 }, // Верхняя точка (памятник Чкалову)
		{ latitude: 56.321, longitude: 44.005 }, // Спуск (левая сторона)
		{ latitude: 56.322, longitude: 44.004 }, // Промежуточная площадка
		{ latitude: 56.323, longitude: 44.003 }, // Нижняя точка (набережная)
		{ latitude: 56.322, longitude: 44.002 }, // Подъем (правая сторона)
		{ latitude: 56.321, longitude: 44.004 }, // Верхняя площадка
		{ latitude: 56.32, longitude: 44.006 }, // Возврат к памятнику
	],
	tags: [
		{ id: 10, name: 'Лестница' },
		{ id: 11, name: 'Монумент' },
		{ id: 12, name: 'История' },
	],
};

// Стрелка (место слияния Оки и Волги)
export const mockRouteStrelka: Route = {
	id: 5,
	name: 'Стрелка',
	distance: 3200,
	imagePath:
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLyIheudmsmvwmCS5NQ6syxVyt79RkB_hwWQ&s',
	checkpoints: [
		{ latitude: 56.334, longitude: 43.972 }, // Стадион Нижний Новгород
		{ latitude: 56.336, longitude: 43.975 }, // Собор Александра Невского
		{ latitude: 56.338, longitude: 43.978 }, // Пакгаузы
		{ latitude: 56.34, longitude: 43.982 }, // Причал
		{ latitude: 56.342, longitude: 43.986 }, // Смотровая площадка
		{ latitude: 56.341, longitude: 43.99 }, // Парк
		{ latitude: 56.339, longitude: 43.985 }, // Возврат к стадиону
	],
	tags: [
		{ id: 13, name: 'Современный' },
		{ id: 14, name: 'Река' },
		{ id: 15, name: 'Спорт' },
	],
};

// Александровский сад
export const mockRouteAlexandrovskyGarden: Route = {
	id: 6,
	name: 'Александровский сад',
	distance: 1500,
	imagePath:
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSs0BX_Xl6HB86vpbAauF0caAtmnipM3sfOHg&s',
	checkpoints: [
		{ latitude: 56.323, longitude: 44.001 }, // Вход со стороны Кремля
		{ latitude: 56.322, longitude: 44.0 }, // Фонтан
		{ latitude: 56.321, longitude: 43.999 }, // Детская площадка
		{ latitude: 56.32, longitude: 43.998 }, // Скамейки у воды
		{ latitude: 56.319, longitude: 43.997 }, // Ротонда
		{ latitude: 56.32, longitude: 43.996 }, // Мостик
		{ latitude: 56.321, longitude: 43.998 }, // Аллея
		{ latitude: 56.322, longitude: 44.0 }, // Возврат к фонтану
	],
	tags: [
		{ id: 16, name: 'Парк' },
		{ id: 17, name: 'Отдых' },
		{ id: 18, name: 'Прогулка' },
	],
};

// Парк Швейцария
export const mockRouteSwitzerlandPark: Route = {
	id: 7,
	name: 'Парк Швейцария',
	distance: 4500,
	imagePath:
		'https://www.niann.ru/_data/objects/0059/7115/icon.jpg?1696256476',
	checkpoints: [
		{ latitude: 56.295, longitude: 43.993 }, // Главный вход (пр. Гагарина)
		{ latitude: 56.298, longitude: 43.995 }, // Канатная дорога
		{ latitude: 56.302, longitude: 43.998 }, // Зеленый театр
		{ latitude: 56.306, longitude: 44.002 }, // Спортивные площадки
		{ latitude: 56.31, longitude: 44.005 }, // Детский городок
		{ latitude: 56.308, longitude: 44.008 }, // Кафе
		{ latitude: 56.303, longitude: 44.003 }, // Смотровая площадка
		{ latitude: 56.298, longitude: 43.998 }, // Обратно к канатной дороге
	],
	tags: [
		{ id: 19, name: 'Парк' },
		{ id: 20, name: 'Природа' },
		{ id: 21, name: 'Активный отдых' },
	],
};

// Канатная дорога (через Волгу)
export const mockRouteCableCar: Route = {
	id: 8,
	name: 'Канатная дорога',
	distance: 3700,
	imagePath:
		'https://s0.rbk.ru/v6_top_pics/media/img/1/77/346842208473771.jpg',
	checkpoints: [
		{ latitude: 56.326, longitude: 44.041 }, // Нижняя станция (Нижний Новгород)
		{ latitude: 56.331, longitude: 44.034 }, // Опора 1
		{ latitude: 56.336, longitude: 44.027 }, // Опора 2
		{ latitude: 56.341, longitude: 44.02 }, // Опора 3
		{ latitude: 56.346, longitude: 44.013 }, // Над Волгой
		{ latitude: 56.351, longitude: 44.006 }, // Опора 4
		{ latitude: 56.356, longitude: 43.999 }, // Верхняя станция (Бор)
		{ latitude: 56.351, longitude: 44.006 }, // Обратный путь
	],
	tags: [
		{ id: 22, name: 'Вид' },
		{ id: 23, name: 'Транспорт' },
		{ id: 24, name: 'Экскурсия' },
	],
};

// Рождественская улица
export const mockRouteRozhdestvenskaya: Route = {
	id: 9,
	name: 'Рождественская улица',
	distance: 1300,
	imagePath: 'https://nn-grad.ru/images/places/big/8rozhdestv.jpg',
	checkpoints: [
		{ latitude: 56.327, longitude: 44.01 }, // Площадь Народного Единства
		{ latitude: 56.326, longitude: 44.008 }, // Церковь Рождества Иоанна Предтечи
		{ latitude: 56.325, longitude: 44.006 }, // Особняки купцов
		{ latitude: 56.324, longitude: 44.004 }, // Ресторанная улица
		{ latitude: 56.323, longitude: 44.002 }, // Музей Добролюбова
		{ latitude: 56.322, longitude: 44.0 }, // Блиновский пассаж
		{ latitude: 56.321, longitude: 43.998 }, // Смотровая площадка
		{ latitude: 56.322, longitude: 44.001 }, // Возврат
	],
	tags: [
		{ id: 25, name: 'История' },
		{ id: 26, name: 'Культура' },
		{ id: 27, name: 'Рестораны' },
	],
};

// Печерский Вознесенский монастырь
export const mockRoutePecherskyMonastery: Route = {
	id: 10,
	name: 'Печерский монастырь',
	distance: 2800,
	imagePath:
		'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3dBq9z2MYMaxEp7JcwWCsJhDRvwjx5GnQDw&s',
	checkpoints: [
		{ latitude: 56.305, longitude: 44.045 }, // Вход в монастырь
		{ latitude: 56.306, longitude: 44.044 }, // Вознесенский собор
		{ latitude: 56.307, longitude: 44.043 }, // Колокольня
		{ latitude: 56.308, longitude: 44.042 }, // Монастырские стены
		{ latitude: 56.309, longitude: 44.044 }, // Смотровая площадка
		{ latitude: 56.307, longitude: 44.046 }, // Святые ворота
		{ latitude: 56.305, longitude: 44.045 }, // Возврат
	],
	tags: [
		{ id: 28, name: 'Монастырь' },
		{ id: 29, name: 'Духовное' },
		{ id: 30, name: 'Архитектура' },
	],
};

// Сормовский парк
export const mockRouteSormovskyPark: Route = {
	id: 11,
	name: 'Сормовский парк',
	distance: 3800,
	imagePath:
		'https://avatars.mds.yandex.net/get-altay/9742646/2a0000018903708f459ea059b28152d8eea1/L_height',
	checkpoints: [
		{ latitude: 56.354, longitude: 43.869 }, // Главный вход
		{ latitude: 56.356, longitude: 43.872 }, // Колесо обозрения
		{ latitude: 56.358, longitude: 43.875 }, // Пруды
		{ latitude: 56.36, longitude: 43.878 }, // Аттракционы
		{ latitude: 56.358, longitude: 43.882 }, // Спортивная зона
		{ latitude: 56.355, longitude: 43.88 }, // Кафе
		{ latitude: 56.353, longitude: 43.875 }, // Аллея
		{ latitude: 56.354, longitude: 43.871 }, // Возврат
	],
	tags: [
		{ id: 31, name: 'Парк' },
		{ id: 32, name: 'Развлечения' },
		{ id: 33, name: 'Семейный' },
	],
};

// Мыза (лесопарк)
export const mockRouteMyza: Route = {
	id: 12,
	name: 'Лесопарк Мыза',
	distance: 5200,
	imagePath:
		'https://cdn.culture.ru/images/8be1f520-6c45-5820-aec2-39574779a0db',
	checkpoints: [
		{ latitude: 56.282, longitude: 43.97 }, // Вход
		{ latitude: 56.285, longitude: 43.975 }, // Лесная тропа
		{ latitude: 56.289, longitude: 43.98 }, // Родник
		{ latitude: 56.293, longitude: 43.985 }, // Поляна
		{ latitude: 56.297, longitude: 43.99 }, // Смотровая
		{ latitude: 56.293, longitude: 43.995 }, // Овраг
		{ latitude: 56.288, longitude: 43.985 }, // Возврат
	],
	tags: [
		{ id: 34, name: 'Лес' },
		{ id: 35, name: 'Природа' },
		{ id: 36, name: 'Треккинг' },
	],
};

export const mockRoutes: Route[] = [
	mockRouteKremlin,
	mockRoutePokrovskaya,
	mockRouteFedorovskogo,
	mockRouteChkalovStairs,
	mockRouteStrelka,
	mockRouteAlexandrovskyGarden,
	mockRouteSwitzerlandPark,
	mockRouteCableCar,
	mockRouteRozhdestvenskaya,
	mockRoutePecherskyMonastery,
	mockRouteSormovskyPark,
	mockRouteMyza,
];

export const getMockRouteById = (id: number): Route | undefined => {
	return mockRoutes.find((route) => route.id === id);
};

export const getRandomMockRoute = (): Route => {
	const randomIndex = Math.floor(Math.random() * mockRoutes.length);
	return mockRoutes[randomIndex];
};

export const getMockRoutesByCategory = (categoryName: string): Route[] => {
	return mockRoutes.filter((route) =>
		route.tags?.some((cat) =>
			cat.name.toLowerCase().includes(categoryName.toLowerCase())
		)
	);
};

export const searchMockRoutes = (query: string): Route[] => {
	const lowerQuery = query.toLowerCase();
	return mockRoutes.filter((route) =>
		route.name.toLowerCase().includes(lowerQuery)
	);
};
