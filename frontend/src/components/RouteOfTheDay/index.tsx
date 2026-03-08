import React from 'react';
import styles from './RouteOfTheDay.module.scss';

interface RouteOfTheDayProps {
    onNavigate: () => void;
}

export const RouteOfTheDay: React.FC<RouteOfTheDayProps> = ({ onNavigate }) => {
    return (
        <div className={styles.mapNiNo}>
            <div className={styles.mapSection}>
                <div className={styles.mapOverlay}>
                    <h2 className={styles.mapTitle}>Маршрут дня</h2>
                    <button
                        className={styles.mapButton}
                        onClick={onNavigate}
                    >
                        Поехали
                    </button>
                </div>
            </div>
        </div>
    );
};