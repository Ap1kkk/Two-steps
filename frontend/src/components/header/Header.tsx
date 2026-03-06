import React from 'react';
import { Link } from "react-router-dom";
import { Text } from 'src/ui/text/Text'

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <>
            <nav className={styles.navigation}>
                <Link to='/favourites' className={styles.navigation__link}>
                    <Text>Избранное</Text>
                </Link>
                <Link to='/main_page' className={styles.navigation__link}>
                    <Text>Sport Line</Text>
                </Link>
                <Link to='/profile_page' className={styles.navigation__link}>
                    <Text>Профиль</Text>
                </Link>
            </nav>
        </>
    );
};