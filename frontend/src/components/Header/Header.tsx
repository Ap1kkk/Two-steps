import React, {useState} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';

import {Button} from "@ui/index";

import Profile from '../../assets/images/icons/profile.svg';
import Loupe from '../../assets/images/icons/loupe.svg';
import close from '../../assets/icons/cross.svg';

import styles from './Header.module.scss';


export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [isAuthenticated] = useState(false);

    const isAuthPage = location.pathname === '/login' || location.pathname === '/registration';

    if (isAuthPage) {
        return (
            <header className={styles.header}>
                <nav className={styles.nav}>
                    <Link to="/">
                        <Button
                            type={'button'}
                            variant={'outline'}
                            rightIcon={<img src={close} alt="Закрыть" />}
                            className={styles.closeButton}
                            onClick={() => navigate('/', { replace: true })}
                        >
                            Закрыть
                        </Button>
                    </Link>
                </nav>
            </header>
        );
    }

    return (
        <header className={styles.header}>
            <nav className={styles.navigation}>
                <Link to='/favourites' className={styles.link} aria-label='Поиск'>
                    <img src={Loupe} alt='' className={styles.icons} aria-hidden='true'/>
                </Link>

                <Link to='/main_page' className={`${styles.link} ${styles.logo}`}>
                    <h1>
                        Два шага
                    </h1>
                </Link>

                {isAuthenticated ? (
                    <Link to='/profile_page' className={styles.link} aria-label='Профиль'>
                        <img
                            src={Profile}
                            alt=''
                            className={styles.icons}
                            aria-hidden='true'
                        />
                    </Link>
                ) : (
                    <Link to='/login'>
                        <Button
                            variant='primary'
                            padding={20}
                        >
                            Войти
                        </Button>
                    </Link>
                )}
            </nav>
        </header>
    );
};
