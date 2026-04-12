import React, { useState } from 'react';
import RegistrationForm1 from './RegistrationForm1/RegistrationForm1';
import RegistrationForm2 from './RegistrationForm2/RegistrationForm2';
import RegistrationForm3 from './RegistrationForm3/RegistrationForm3';
import styles from './RegistrationForm.module.scss';

interface RegistrationData {
	email: string;
	password: string;
	avatar: string | null;
	name: string;
	gender: string;
	birthDate: string;
	weight: string;
	height: string;
	tags: string[];
}

const RegistrationForm: React.FC = () => {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState<RegistrationData>({
		email: '',
		password: '',
		avatar: null,
		name: '',
		gender: '',
		birthDate: '',
		weight: '',
		height: '',
		tags: [],
	});

	const handleNextStep1 = (data: { email: string; password: string }) => {
		setFormData(prev => ({ ...prev, ...data }));
		setStep(2);
	};

	const handleNextStep2 = (data: {
		avatar: string | null;
		name: string;
		gender: string;
		birthDate: string;
		weight: string;
		height: string
	}) => {
		setFormData(prev => ({ ...prev, ...data }));
		setStep(3);
	};

	const handleComplete = (data: { tags: string[] }) => {
		const completeData = { ...formData, ...data };
		console.log('Регистрация завершена:', completeData);
		alert('Регистрация успешно завершена!');
	};

	const handleBack = () => {
		setStep(prev => prev - 1);
	};

	return (
		<>
			{step === 1 && (
				<RegistrationForm1
					onNext={handleNextStep1}
					initialData={{ email: formData.email, password: formData.password }}
				/>
			)}

			{step === 2 && (
				<RegistrationForm2
					onNext={handleNextStep2}
					onBack={handleBack}
					initialData={{
						avatar: formData.avatar,
						name: formData.name,
						gender: formData.gender,
						birthDate: formData.birthDate,
						weight: formData.weight,
						height: formData.height,
					}}
				/>
			)}

			{step === 3 && (
				<RegistrationForm3
					onComplete={handleComplete}
					onBack={handleBack}
					initialData={{ tags: formData.tags }}
				/>
			)}
		</>
	);
};

export default RegistrationForm;