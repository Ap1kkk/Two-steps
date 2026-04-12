import React from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';

import styles from './RegistrationPage.module.scss';

export const RegistrationPage: React.FC = () => {
	return (
		<section className={styles.container}>
			<RegistrationForm />
		</section>
	);
};

export default RegistrationPage;