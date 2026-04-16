import styles from "./StatisticPage.module.scss";
import { Statistic } from '@components';

export const StatisticPage = () => {
	return (
		<section className={styles.section}>
			<Statistic title="Статистика"/>
		</section>
	)
}

export default StatisticPage;