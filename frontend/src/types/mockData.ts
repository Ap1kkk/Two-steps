import { Route } from './route';

export const mockRouteKremlin: Route = {
	id: 1,
	name: 'Нижегородский Кремль',
	distance: 2100,
	imagePath: '',
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
	],
};

// Большая Покровская улица
export const mockRoutePokrovskaya: Route = {
	id: 2,
	name: 'Большая Покровская улица',
	distance: 1400,
	imagePath: 'pokrovskaya.png',
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
	imagePath: '',
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
	imagePath: 'HARD',
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
	imagePath: 'MEDIUM',
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
	imagePath: 'EASY',
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
	imagePath: 'MEDIUM',
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
	imagePath: 'EASY',
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
	imagePath: 'EASY',
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
	imagePath: 'MEDIUM',
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
	imagePath: 'EASY',
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
	imagePath: 'HARD',
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
