import styles from './ProfilePage.module.scss'
import { MOCK_FRIEND, MOCK_USER } from '../../mocks/mock';
import { Profile } from '@components';

export const ProfilePage = () => {
	return (
		<section className={styles.section}>
			<Profile
				userName={MOCK_USER.name}
				userEmail={MOCK_USER.email}
				userNumber={MOCK_USER.number}
				userAvatar={MOCK_USER.avatar}
				userLevel={MOCK_USER.level}
				userRoutes={MOCK_USER.routes}
				userGender={MOCK_USER.gender}
				userHeight={MOCK_USER.height}
				userWeight={MOCK_USER.weight}
				friendsName={MOCK_FRIEND.name}
				friendsAvatar={MOCK_FRIEND.avatar}
			/>
		</section>
	);
};

export default ProfilePage;
