import React from 'react';
import { Link } from 'react-router-dom';
import { LikeButton } from '../LikeButton';
import { Route } from 'src/types';
import { BASE_STATIC_URL } from 'src/constants/globals';
import styles from './RecommendedRoutes.module.scss';

interface RecommendedRoutesProps {
    routes: Route[];
    likedRoutes: Record<number, boolean>;
    onToggleLike: (routeId: number) => void;
}

export const RecommendedRoutes: React.FC<RecommendedRoutesProps> = ({
                                                                        routes,
                                                                        likedRoutes,
                                                                        onToggleLike
                                                                    }) => {
    return (
        <section className={styles.recommendedSection}>
            <div className={styles.header}>
                <h3 className={styles.title}>Рекомендуемые</h3>
            </div>

            <div className={styles.scrollContainer}>
                <div className={styles.cardsRow}>
                    {routes.map((route) => (
                        <div key={route.id} className={styles.cardWrapper}>
                            <Link to={`/map/${route.id}`} className={styles.cardLink}>
                                <div className={styles.card}>
                                    <img
                                        src={BASE_STATIC_URL + route.imagePath}
                                        alt={route.name}
                                        className={styles.image}
                                    />
                                    <p className={styles.name}>{route.name}</p>
                                    <LikeButton
                                        routeId={route.id}
                                        isLiked={!!likedRoutes[route.id]}
                                        onToggle={onToggleLike}
                                    />
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};