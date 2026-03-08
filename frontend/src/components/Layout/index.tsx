import { Outlet } from 'react-router-dom';
import { Header } from '../Header/index';
import {Footer} from "components/Footer";

import styles from './Layout.module.scss';

export const Layout = () => {
    return (
        <div className={styles.layout}>
            <Header />
            <main className={styles.content}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

// Не трогать!!!