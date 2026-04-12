import React from 'react';
import { Settings } from '../../components/Settings/Settings';
import styles from './SettingsPage.module.scss';

export const SettingsPage = () => {
	return (
		<Settings className={styles.settingsContent}/>
	);
};
