import { Outlet } from 'react-router-dom';
import { useDeviceType } from '../../utils/hooks/useDeviceType';
import { Header } from '../DesktopHeader';
import { Footer } from '../DesktopFooter';
import { MobileFooter } from '../MobileFooter';
import { MobileHeader } from '../MobileHeader';

import styles from './Layout.module.scss';

export const Layout = () => {
	const deviceType = useDeviceType();
	const isMobile = deviceType === 'mobile';

	return (
		<div className={styles.layout}>
			{isMobile ? <MobileHeader/> : <Header />}
			<main className={styles.content}>
				<Outlet />
			</main>
			{isMobile ? <MobileFooter /> : <Footer />}
		</div>
	);
};
