import React from 'react';
import {Link} from 'react-router-dom';
import {Text} from '../UI/text/Text';

import Profile from '../../assets/images/icons/profile.svg';
import Loupe from '../../assets/images/icons/loupe.svg';

import styles from './header.module.scss';
import {Button} from "../UI/button/button";

export const Header = () => {
    const isAuthenticated = false;

    return (
        <header>
            <nav className={styles.navigation}>
                <Link to='/favourites' className={styles.link} aria-label='Поиск'>
                    <img src={Loupe} alt='' className={styles.icons} aria-hidden='true'/>
                </Link>

                <Link to='/main_page' className={`${styles.link} ${styles.logo}`}>
                    <Text as='h1' size={34} weight={700} family={'yandex'}>
                        Sport Line
                    </Text>
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
