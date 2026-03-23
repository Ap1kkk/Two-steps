import { RouteData } from 'src/types';

export const mockRouteKremlin: RouteData = {
	id: 1,
	nameRoute: 'Нижегородский Кремль',
	distance: 2100,
	difficulty: 'EASY',
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
	categories: [
		{ id: 1, name: 'Кремль' },
		{ id: 2, name: 'История' },
		{ id: 3, name: 'Архитектура' },
	],
};

// Большая Покровская улица
export const mockRoutePokrovskaya: RouteData = {
	id: 2,
	nameRoute: 'Большая Покровская улица',
	distance: 1400,
	difficulty: 'EASY',
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
	categories: [
		{ id: 4, name: 'Пешеходный' },
		{ id: 5, name: 'Улица' },
		{ id: 6, name: 'Достопримечательности' },
	],
};

// Набережная Федоровского
export const mockRouteFedorovskogo: RouteData = {
	id: 3,
	nameRoute: 'Набережная Федоровского',
	distance: 1800,
	difficulty: 'MEDIUM',
	checkpoints: [
		{ latitude: 56.325, longitude: 44.021 }, // Канавинский мост
		{ latitude: 56.324, longitude: 44.018 }, // Рождественская церковь
		{ latitude: 56.323, longitude: 44.015 }, // Смотровая площадка
		{ latitude: 56.322, longitude: 44.012 }, // Памятник Александру Невскому
		{ latitude: 56.321, longitude: 44.009 }, // Речной вокзал
		{ latitude: 56.32, longitude: 44.006 }, // Чкаловская лестница (вид сверху)
		{ latitude: 56.319, longitude: 44.003 }, // Александровский сад
	],
	categories: [
		{ id: 7, name: 'Набережная' },
		{ id: 8, name: 'Вид' },
		{ id: 9, name: 'Фото' },
	],
};

// Чкаловская лестница
export const mockRouteChkalovStairs: RouteData = {
	id: 4,
	nameRoute: 'Чкаловская лестница',
	distance: 800,
	difficulty: 'HARD', // Много ступенек
	checkpoints: [
		{ latitude: 56.32, longitude: 44.006 }, // Верхняя точка (памятник Чкалову)
		{ latitude: 56.321, longitude: 44.005 }, // Спуск (левая сторона)
		{ latitude: 56.322, longitude: 44.004 }, // Промежуточная площадка
		{ latitude: 56.323, longitude: 44.003 }, // Нижняя точка (набережная)
		{ latitude: 56.322, longitude: 44.002 }, // Подъем (правая сторона)
		{ latitude: 56.321, longitude: 44.004 }, // Верхняя площадка
		{ latitude: 56.32, longitude: 44.006 }, // Возврат к памятнику
	],
	categories: [
		{ id: 10, name: 'Лестница' },
		{ id: 11, name: 'Монумент' },
		{ id: 12, name: 'История' },
	],
};

// Стрелка (место слияния Оки и Волги)
export const mockRouteStrelka: RouteData = {
	id: 5,
	nameRoute: 'Стрелка',
	distance: 3200,
	difficulty: 'MEDIUM',
	checkpoints: [
		{ latitude: 56.334, longitude: 43.972 }, // Стадион Нижний Новгород
		{ latitude: 56.336, longitude: 43.975 }, // Собор Александра Невского
		{ latitude: 56.338, longitude: 43.978 }, // Пакгаузы
		{ latitude: 56.34, longitude: 43.982 }, // Причал
		{ latitude: 56.342, longitude: 43.986 }, // Смотровая площадка
		{ latitude: 56.341, longitude: 43.99 }, // Парк
		{ latitude: 56.339, longitude: 43.985 }, // Возврат к стадиону
	],
	categories: [
		{ id: 13, name: 'Современный' },
		{ id: 14, name: 'Река' },
		{ id: 15, name: 'Спорт' },
	],
};

// Александровский сад
export const mockRouteAlexandrovskyGarden: RouteData = {
	id: 6,
	nameRoute: 'Александровский сад',
	distance: 1500,
	difficulty: 'EASY',
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
	categories: [
		{ id: 16, name: 'Парк' },
		{ id: 17, name: 'Отдых' },
		{ id: 18, name: 'Прогулка' },
	],
};

// Парк Швейцария
export const mockRouteSwitzerlandPark: RouteData = {
	id: 7,
	nameRoute: 'Парк Швейцария',
	distance: 4500,
	difficulty: 'MEDIUM',
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
	categories: [
		{ id: 19, name: 'Парк' },
		{ id: 20, name: 'Природа' },
		{ id: 21, name: 'Активный отдых' },
	],
};

// Канатная дорога (через Волгу)
export const mockRouteCableCar: RouteData = {
	id: 8,
	nameRoute: 'Канатная дорога',
	distance: 3700,
	difficulty: 'EASY',
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
	categories: [
		{ id: 22, name: 'Вид' },
		{ id: 23, name: 'Транспорт' },
		{ id: 24, name: 'Экскурсия' },
	],
};

// Рождественская улица
export const mockRouteRozhdestvenskaya: RouteData = {
	id: 9,
	nameRoute: 'Рождественская улица',
	distance: 1300,
	difficulty: 'EASY',
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
	categories: [
		{ id: 25, name: 'История' },
		{ id: 26, name: 'Культура' },
		{ id: 27, name: 'Рестораны' },
	],
};

// Печерский Вознесенский монастырь
export const mockRoutePecherskyMonastery: RouteData = {
	id: 10,
	nameRoute: 'Печерский монастырь',
	distance: 2800,
	difficulty: 'MEDIUM',
	checkpoints: [
		{ latitude: 56.305, longitude: 44.045 }, // Вход в монастырь
		{ latitude: 56.306, longitude: 44.044 }, // Вознесенский собор
		{ latitude: 56.307, longitude: 44.043 }, // Колокольня
		{ latitude: 56.308, longitude: 44.042 }, // Монастырские стены
		{ latitude: 56.309, longitude: 44.044 }, // Смотровая площадка
		{ latitude: 56.307, longitude: 44.046 }, // Святые ворота
		{ latitude: 56.305, longitude: 44.045 }, // Возврат
	],
	categories: [
		{ id: 28, name: 'Монастырь' },
		{ id: 29, name: 'Духовное' },
		{ id: 30, name: 'Архитектура' },
	],
};

// Сормовский парк
export const mockRouteSormovskyPark: RouteData = {
	id: 11,
	nameRoute: 'Сормовский парк',
	distance: 3800,
	difficulty: 'EASY',
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
	categories: [
		{ id: 31, name: 'Парк' },
		{ id: 32, name: 'Развлечения' },
		{ id: 33, name: 'Семейный' },
	],
};

// Мыза (лесопарк)
export const mockRouteMyza: RouteData = {
	id: 12,
	nameRoute: 'Лесопарк Мыза',
	distance: 5200,
	difficulty: 'HARD',
	checkpoints: [
		{ latitude: 56.282, longitude: 43.97 }, // Вход
		{ latitude: 56.285, longitude: 43.975 }, // Лесная тропа
		{ latitude: 56.289, longitude: 43.98 }, // Родник
		{ latitude: 56.293, longitude: 43.985 }, // Поляна
		{ latitude: 56.297, longitude: 43.99 }, // Смотровая
		{ latitude: 56.293, longitude: 43.995 }, // Овраг
		{ latitude: 56.288, longitude: 43.985 }, // Возврат
	],
	categories: [
		{ id: 34, name: 'Лес' },
		{ id: 35, name: 'Природа' },
		{ id: 36, name: 'Треккинг' },
	],
};

// Массив всех маршрутов Нижнего Новгорода
export const mockRoutes: RouteData[] = [
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

// Функция для получения маршрута по ID
export const getMockRouteById = (id: number): RouteData | undefined => {
	return mockRoutes.find((route) => route.id === id);
};

// Функция для получения случайного маршрута
export const getRandomMockRoute = (): RouteData => {
	const randomIndex = Math.floor(Math.random() * mockRoutes.length);
	return mockRoutes[randomIndex];
};

// Функция для получения маршрутов по категории
export const getMockRoutesByCategory = (categoryName: string): RouteData[] => {
	return mockRoutes.filter((route) =>
		route.categories?.some((cat) =>
			cat.name.toLowerCase().includes(categoryName.toLowerCase())
		)
	);
};

// Функция для поиска маршрутов по названию
export const searchMockRoutes = (query: string): RouteData[] => {
	const lowerQuery = query.toLowerCase();
	return mockRoutes.filter((route) =>
		route.nameRoute.toLowerCase().includes(lowerQuery)
	);
};
