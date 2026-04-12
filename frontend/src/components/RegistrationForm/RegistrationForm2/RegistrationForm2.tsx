import React, { useState } from 'react';
import { validateName, formatName, sanitizeName } from '../../../utils/validator';
import styles from './RegistrationForm2.module.scss';

interface RegistrationForm2Props {
	onNext: (data: {
		avatar: string | null;
		name: string;
		gender: string;
		birthDate: string;
		weight: string;
		height: string
	}) => void;
	onBack: () => void;
	initialData?: {
		avatar: string | null;
		name: string;
		gender: string;
		birthDate: string;
		weight: string;
		height: string
	};
}

const RegistrationForm2: React.FC<RegistrationForm2Props> = ({ onNext, onBack, initialData }) => {
	const [avatar, setAvatar] = useState<string | null>(initialData?.avatar || null);
	const [name, setName] = useState(initialData?.name || '');
	const [gender, setGender] = useState(initialData?.gender || '');
	const [birthDate, setBirthDate] = useState(initialData?.birthDate || '');
	const [weight, setWeight] = useState(initialData?.weight || '');
	const [height, setHeight] = useState(initialData?.height || '');
	const [errors, setErrors] = useState<{ name?: string; gender?: string; birthDate?: string }>({});

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const rawName = e.target.value;

		// Очищаем от пробелов, дефисов и других символов
		const cleanedName = sanitizeName(rawName);

		// Форматируем имя (первая буква заглавная, остальные маленькие)
		const formattedName = formatName(cleanedName);

		setName(formattedName);

		// Очищаем ошибку при вводе
		if (errors.name) {
			setErrors(prev => ({ ...prev, name: undefined }));
		}
	};

	const handleNameBlur = () => {
		// Дополнительная валидация при потере фокуса
		if (name) {
			const validation = validateName(name);
			if (!validation.isValid) {
				setErrors(prev => ({ ...prev, name: validation.errorMessage }));
			}
		}
	};

	const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setAvatar(reader.result as string);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const newErrors: { name?: string; gender?: string; birthDate?: string } = {};

		// Валидация имени
		const nameValidation = validateName(name);
		if (!nameValidation.isValid) {
			newErrors.name = nameValidation.errorMessage;
		}

		if (!gender) newErrors.gender = 'Выберите пол';
		if (!birthDate) newErrors.birthDate = 'Укажите дату рождения';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
		} else {
			onNext({ avatar, name, gender, birthDate, weight, height });
		}
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<div className={styles.avatarContainer}>
				{avatar ? (
					<img src={avatar} alt="Avatar" className={styles.avatar} />
				) : (
					<div className={styles.avatarPlaceholder}>📷</div>
				)}
				<label className={styles.uploadButton}>
					Загрузить фото
					<input type="file" accept="image/*" onChange={handleAvatarUpload} hidden />
				</label>
			</div>

			<div className={styles.field}>
				<label>Имя</label>
				<input
					type="text"
					value={name}
					onChange={handleNameChange}
					onBlur={handleNameBlur}
					placeholder="Введите имя (только буквы)"
					maxLength={30}
				/>
				{errors.name && <span className={styles.error}>{errors.name}</span>}
				<span className={styles.hint}>Только буквы кириллицы, без пробелов и дефисов</span>
			</div>

			<div className={styles.field}>
				<label>Пол</label>
				<select value={gender} onChange={(e) => setGender(e.target.value)}>
					<option value="">Выберите пол</option>
					<option value="male">Мужской</option>
					<option value="female">Женский</option>
					<option value="other">Другой</option>
				</select>
				{errors.gender && <span className={styles.error}>{errors.gender}</span>}
			</div>

			<div className={styles.field}>
				<label>Дата рождения</label>
				<input
					type="date"
					value={birthDate}
					onChange={(e) => setBirthDate(e.target.value)}
				/>
				{errors.birthDate && <span className={styles.error}>{errors.birthDate}</span>}
			</div>

			<div className={styles.row}>
				<div className={styles.field}>
					<label>Вес (кг)</label>
					<input
						type="number"
						value={weight}
						onChange={(e) => setWeight(e.target.value)}
						placeholder="70"
					/>
				</div>

				<div className={styles.field}>
					<label>Рост (см)</label>
					<input
						type="number"
						value={height}
						onChange={(e) => setHeight(e.target.value)}
						placeholder="170"
					/>
				</div>
			</div>

			<div className={styles.buttons}>
				<button type="button" onClick={onBack} className={styles.backButton}>Назад</button>
				<button type="submit" className={styles.nextButton}>Далее</button>
			</div>
		</form>
	);
};

export default RegistrationForm2;