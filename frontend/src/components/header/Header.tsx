import React from 'react';
import { Link } from "react-router-dom";
import { Text } from 'src/ui/text/Text'

import styles from './Header.module.scss';

export const Header = () => {
    return (
        <>
            <nav className={styles.navigation}>
                <Link to='/favourites' className={styles.navigation__link}>
                    <Text as='h2' size={22} family='spotify'>Избранное</Text>
                </Link>
                <Link to='/main_page' className={styles.navigation__link}>
                    <Text as='h1' size={24} weight={700} family={'spotify'}>Sport Line</Text>
                </Link>
                <Link to='/profile_page' className={styles.navigation__link}>
                    <Text as='h2' size={22} family={'spotify'}>Профиль</Text>
                </Link>
            </nav>
        </>
    );
};