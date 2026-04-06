import { useState, useEffect } from 'react';

type DeviceType = 'mobile' | 'desktop';

export const useDeviceType = () => {
	const [deviceType, setDeviceType] = useState<DeviceType>('desktop');

	useEffect(() => {
		const checkDevice = () => {
			const width = window.innerWidth;
			if (width <= 925) {
				setDeviceType('mobile');
			} else {
				setDeviceType('desktop');
			}
		};

		checkDevice();
		window.addEventListener('resize', checkDevice);
		return () => window.removeEventListener('resize', checkDevice);
	}, []);

	return deviceType;
};
