import React from 'react';
import styles from '../../components/Profile/Profile.module.scss';
import { Avatar, Button } from '@ui';
import { Circle } from '../../ui/Circle';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
	userName?: string;
	userEmail?: string;
	userNumber?: string;
	userAvatar?: string;
	userLevel?: number;
	userRoutes?: number;
	userGender?: string;
	userHeight?: number;
	userWeight?: number;
	friendsName?: string;
	friendsAvatar?: string;
}

export const Profile: React.FC<ProfileProps> = ({
	userName,
	userEmail,
	userNumber,
	userAvatar,
	userLevel,
	userRoutes,
	userGender,
	userHeight,
	userWeight,
	friendsName,
	friendsAvatar,
}) => {
	const navigate = useNavigate();

	return (
		<div className={styles.container}>
			<div className={styles.circlesContainer}>
				<div className={styles.circleContent}>
					<Circle children={userLevel} />
					<span className={styles.circleLabel}>Уровень</span>
				</div>
				<div className={styles.avatarContent}>
					<Avatar src={userAvatar} size={'large'} />
					<span className={styles.profileNickname}>{userName}</span>
				</div>
				<div className={styles.circleContent}>
					<Circle children={userRoutes} />
					<span className={styles.circleLabel}>Маршруты</span>
				</div>
			</div>
			<div className={styles.containerMenu}>
				<div className={styles.containerContext}>
					<span className={styles.containerContextTittle}>
						Информация
					</span>
					<div className={styles.infoContentBody}>
						<span>Email: {userEmail}</span>
						<span>Телефон: {userNumber}</span>
						<span>Пол: {userGender}</span>
						<span>Рост: {userHeight}</span>
						<span>Вес: {userWeight}</span>
					</div>
				</div>
				<div className={styles.containerContext}>
					<span className={styles.containerContextTittle}>
						Друзья
					</span>
					<div className={styles.friendsBody}>
						<Avatar src={friendsAvatar} size={'small'} />
						<span className={styles.friendsName}>
							{friendsName}
						</span>
					</div>
					<div className={styles.friendsBody}>
						<Avatar src={friendsAvatar} size={'small'} />
						<span className={styles.friendsName}>
							{friendsName}
						</span>
					</div>
					<div className={styles.friendsBody}>
						<Avatar src={friendsAvatar} size={'small'} />
						<span className={styles.friendsName}>
							{friendsName}
						</span>
					</div>
					<div className={styles.friendsBody}>
						<Avatar src={friendsAvatar} size={'small'} />
						<span className={styles.friendsName}>
							{friendsName}
						</span>
					</div>
				</div>
			</div>
			<div className={styles.containerButtons}>
				<Button variant='secondary' onClick={() => navigate('/statistic')} >
					Моя статистика
				</Button>
				<Button variant='secondary' onClick={() => navigate('/achievement')}>
					Мои достижения
				</Button>
			</div>
		</div>
	);
};
