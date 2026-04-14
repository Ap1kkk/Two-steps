import { Link } from 'react-router-dom';
import './ProfilePage.module.scss';
import { MOCK_USER } from '../../mocks/mock';

export const ProfilePage = () => {
	return (
		<div className='profile-container'>
			<div className='header_menu'>
				<div></div>
				<h1>Профиль</h1>
				<div>
					<Link
						to='/profile_page/edit_profile_page'
						className='edit-button'>
						Ред
					</Link>
				</div>
			</div>
			<div className='profile-info'>
				<div className='circle small-circle'></div>
				<div className='circle large-circle'>{MOCK_USER.avatar}</div>
				<div className='circle small-circle'>
					<p className='circle-label'>
						достижений
						<br />
						получено
					</p>
				</div>
			</div>
			<h2>{MOCK_USER.name}</h2>
			<div className='block-email'>
				<div></div>
				<p className='email'>{MOCK_USER.email}</p>
			</div>

			<div className='menu'>
				<Link
					to='/profile_page/statistics_page'
					className='menu-button'>
					статистика
				</Link>
				<Link
					to='/profile_page/achievements_page'
					className='menu-button'>
					достижения
				</Link>
				<Link
					to='/profile_page/route_history_page'
					className='menu-button'>
					история
				</Link>
			</div>
		</div>
	);
};

export default ProfilePage;
