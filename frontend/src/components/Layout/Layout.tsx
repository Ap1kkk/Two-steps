import { Outlet } from 'react-router-dom';
import { useDeviceType } from '../../utils/hooks/useDeviceType';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MobileNavigation } from '../MobileNavigation/MobileNavigation';

import styles from './Layout.module.scss';

export const Layout = () => {
	const deviceType = useDeviceType();
	const isMobile = deviceType === 'mobile';

	return (
		<div className={styles.layout}>
			<Header />
			<main className={styles.content}>
				<Outlet />
			</main>
			{isMobile ? <MobileNavigation /> : <Footer />}
		</div>
	);
};
