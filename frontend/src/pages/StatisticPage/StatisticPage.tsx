import styles from './StatisticPage.module.scss';
import { Statistic } from '@components';

const statistics = [
	{ title: 'Всего пройдено метров', value: '145 209' },
	{ title: 'Всего пройдено шагов', value: '1 208 132' },
	{ title: 'Общее время пройденных маршрутов', value: '5д 18ч 47мин' },
	{ title: 'Пройдено точек маршрута', value: '23 789' },
	{ title: 'Средняя длина маршрутов', value: '3 605м' },
	{ title: 'Среднее время пройденных маршрутов', value: '2ч 25мин' },
];

export const StatisticPage = () => {
	return (
		<section className={styles.section}>
			<Statistic statisticData={statistics} />
		</section>
	);
};

export default StatisticPage;
