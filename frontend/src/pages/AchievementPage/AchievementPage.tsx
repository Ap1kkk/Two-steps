import styles from './AchievementPage.module.scss'
import { Achievement } from '@components';
import {ACHI_MOCK} from '../../mocks/achievments';

export const AchievementPage = () => {
	return (
		<section className={styles.section}>
			<Achievement achievementsData={ACHI_MOCK}/>
		</section>
	);
}

export default AchievementPage;