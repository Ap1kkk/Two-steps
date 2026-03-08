import React from 'react';
import { Link } from "react-router-dom";
import { Text } from 'src/ui/text/Text'

import Profile from 'src/assets/icons/profile.svg'
import Loupe from 'src/assets/icons/loupe.svg'

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <header>
            <nav className={styles.navigation}>
                <Link
                    to='/favourites'
                    className={styles.navigation__link}
                    aria-label="Поиск"
                >
                    <img
                        src={Loupe}
                        alt=''
                        className={styles.navigation__icons}
                        aria-hidden="true"
                    />
                </Link>

                <Link
                    to='/main_page'
                    className={`${styles.navigation__link} ${styles.navigation__logo}`}
                >
                    <Text
                        as='h1'
                        size={24}
                        weight={700}
                        family={'spotify'}
                    >
                        Sport Line
                    </Text>
                </Link>

                <Link
                    to='/profile_page'
                    className={styles.navigation__link}
                    aria-label="Профиль"
                >
                    <img
                        src={Profile}
                        alt=''
                        className={styles.navigation__icons}
                        aria-hidden="true"
                    />
                </Link>
            </nav>
        </header>
    );
};