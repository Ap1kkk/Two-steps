import styles from './AchievementPage.module.scss'
import { Achievement } from '@components';

import ach1 from '../../assets/images/achievmensPicture/medal.svg'
import ach2 from '../../assets/images/achievmensPicture/camera.svg'
import ach3 from '../../assets/images/achievmensPicture/dumbells.svg'
import ach4 from '../../assets/images/achievmensPicture/earth.svg'
import ach5 from '../../assets/images/achievmensPicture/ghost.svg'
import ach6 from '../../assets/images/achievmensPicture/office.svg';

const achievements = [
	{
		id: 1,
		title: 'Новичок',
		value: '12%',
		caption: 'Пройти свой первый маршрут',
		image: <img src={ach1} alt='speed' />,
	},
	{
		id: 2,
		title: 'Скорость',
		value: '25%',
		caption: 'Пройти маршрут повторно быстрее',
		image: <img src={ach2} alt='endurance' />,
	},
	{
		id: 3,
		title: 'Покоритель',
		value: '30%',
		caption: 'Пройти 20 маршрутов',
		image: <img src={ach3} alt='explorer' />,
	},
	{
		id: 4,
		title: 'Марафонец',
		value: '20%',
		caption: 'Пройти 42 км за всё время',
		image: <img src={ach4} alt='marathon' />,
	},
	{
		id: 5,
		title: 'Спидраннер',
		value: '50%',
		caption: 'Пройди 3 маршрута за один день',
		image: <img src={ach5} alt='earlybird' />,
	},
	{
		id: 6,
		title: 'Активный день',
		value: '150%',
		caption: 'Пройти 15 км за день',
		image: <img src={ach6} alt='earlybird' />,
	},
];

export const AchievementPage = () => {
	return (
		<section className={styles.section}>
			<Achievement achievementsData={achievements}/>
		</section>
	);
}

export default AchievementPage;