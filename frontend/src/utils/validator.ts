export interface ValidationResult {
	isValid: boolean;
	errorMessage?: string;
}

export interface LoginFormData {
	email: string;
	password: string;
}

export interface RegisterFormData {
	email: string;
	password: string;
	confirmPassword: string;
	name: string;
	birthDate?: Date;
}

/**
 * Валидация email
 * @param email - email для проверки
 * @returns ValidationResult
 */
export const validateEmail = (email: string): ValidationResult => {
	if (!email || email.trim() === '') {
		return {
			isValid: false,
			errorMessage: 'Email обязателен для заполнения',
		};
	}

	const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;

	if (!emailRegex.test(email)) {
		return {
			isValid: false,
			errorMessage: 'Введите корректный email (пример: user@domain.com)',
		};
	}

	const allowedCharsRegex =
		/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	if (!allowedCharsRegex.test(email)) {
		return {
			isValid: false,
			errorMessage: 'Email содержит недопустимые символы',
		};
	}

	return {
		isValid: true,
	};
};

/**
 * Валидация пароля
 * @param password - пароль для проверки
 * @returns ValidationResult
 */
export const validatePassword = (password: string): ValidationResult => {
	if (!password || password.trim() === '') {
		return {
			isValid: false,
			errorMessage: 'Пароль обязателен для заполнения',
		};
	}

	if (password.length < 8) {
		return {
			isValid: false,
			errorMessage: 'Пароль должен содержать минимум 8 символов',
		};
	}

	if (password.length > 50) {
		return {
			isValid: false,
			errorMessage: 'Пароль не должен превышать 50 символов',
		};
	}

	const hasUpperCase = /[A-ZА-Я]/.test(password);
	if (!hasUpperCase) {
		return {
			isValid: false,
			errorMessage:
				'Пароль должен содержать хотя бы одну заглавную букву (A-Z или А-Я)',
		};
	}

	const hasNumber = /\d/.test(password);
	if (!hasNumber) {
		return {
			isValid: false,
			errorMessage: 'Пароль должен содержать хотя бы одну цифру (0-9)',
		};
	}

	const allowedCharsRegex =
		/^[A-Za-zА-Яа-я0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/;
	if (!allowedCharsRegex.test(password)) {
		return {
			isValid: false,
			errorMessage: 'Пароль содержит недопустимые символы',
		};
	}

	return {
		isValid: true,
	};
};

/**
 * Валидация подтверждения пароля
 * @param password - пароль
 * @param confirmPassword - подтверждение пароля
 * @returns ValidationResult
 */
export const validateConfirmPassword = (
	password: string,
	confirmPassword: string
): ValidationResult => {
	if (!confirmPassword || confirmPassword.trim() === '') {
		return {
			isValid: false,
			errorMessage: 'Подтверждение пароля обязательно',
		};
	}

	if (password !== confirmPassword) {
		return {
			isValid: false,
			errorMessage: 'Пароли не совпадают',
		};
	}

	return {
		isValid: true,
	};
};

/**
 * Валидация имени пользователя
 * @param name - имя для проверки
 * @returns ValidationResult
 */
export const validateName = (name: string): ValidationResult => {
	if (!name || name.trim() === '') {
		return {
			isValid: false,
			errorMessage: 'Имя обязательно для заполнения',
		};
	}

	if (name.length < 2) {
		return {
			isValid: false,
			errorMessage: 'Имя должно содержать минимум 2 символа',
		};
	}

	if (name.length > 30) {
		return {
			isValid: false,
			errorMessage: 'Имя не должно превышать 30 символов',
		};
	}

	const allowedCharsRegex = /^[a-zA-Zа-яА-ЯёЁ0-9\s-]+$/;
	if (!allowedCharsRegex.test(name)) {
		return {
			isValid: false,
			errorMessage:
				'Имя может содержать только буквы, цифры, пробелы и дефисы',
		};
	}

	if (/^\d+$/.test(name)) {
		return {
			isValid: false,
			errorMessage: 'Имя не может состоять только из цифр',
		};
	}

	return {
		isValid: true,
	};
};

/**
 * Валидация возраста
 * @param birthDate - дата рождения
 * @param minAge - минимальный возраст (по умолчанию 13)
 * @param maxAge - максимальный возраст (по умолчанию 100)
 * @returns ValidationResult
 */
export const validateAge = (
	birthDate: Date,
	minAge: number = 13,
	maxAge: number = 100
): ValidationResult => {
	if (!birthDate) {
		return {
			isValid: false,
			errorMessage: 'Дата рождения обязательна',
		};
	}

	const today = new Date();
	const birthDateObj = new Date(birthDate);

	if (isNaN(birthDateObj.getTime())) {
		return {
			isValid: false,
			errorMessage: 'Некорректная дата рождения',
		};
	}

	if (birthDateObj > today) {
		return {
			isValid: false,
			errorMessage: 'Дата рождения не может быть в будущем',
		};
	}

	let age = today.getFullYear() - birthDateObj.getFullYear();
	const monthDiff = today.getMonth() - birthDateObj.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDateObj.getDate())
	) {
		age--;
	}

	if (age < minAge) {
		return {
			isValid: false,
			errorMessage: `Вам должно быть минимум ${minAge} лет`,
		};
	}

	if (age > maxAge) {
		return {
			isValid: false,
			errorMessage: `Возраст не может превышать ${maxAge} лет`,
		};
	}

	return {
		isValid: true,
	};
};

/**
 * Полный расчет возраста из даты рождения
 * @param birthDate - дата рождения
 * @returns возраст в годах или null
 */
export const calculateAge = (birthDate: Date): number | null => {
	if (!birthDate) return null;

	const today = new Date();
	const birthDateObj = new Date(birthDate);

	if (isNaN(birthDateObj.getTime())) return null;

	let age = today.getFullYear() - birthDateObj.getFullYear();
	const monthDiff = today.getMonth() - birthDateObj.getMonth();

	if (
		monthDiff < 0 ||
		(monthDiff === 0 && today.getDate() < birthDateObj.getDate())
	) {
		age--;
	}

	return age;
};

/**
 * Валидация формы авторизации
 * @param data - данные формы авторизации
 * @returns ValidationResult
 */
export const validateLoginForm = (data: LoginFormData): ValidationResult => {
	const emailValidation = validateEmail(data.email);
	if (!emailValidation.isValid) {
		return emailValidation;
	}

	const passwordValidation = validatePassword(data.password);
	if (!passwordValidation.isValid) {
		return passwordValidation;
	}

	return {
		isValid: true,
	};
};

/**
 * Валидация формы регистрации
 * @param data - данные формы регистрации
 * @param minAge - минимальный возраст
 * @returns ValidationResult
 */
export const validateRegisterForm = (
	data: RegisterFormData,
	minAge: number = 13
): ValidationResult => {
	const emailValidation = validateEmail(data.email);
	if (!emailValidation.isValid) {
		return emailValidation;
	}

	const passwordValidation = validatePassword(data.password);
	if (!passwordValidation.isValid) {
		return passwordValidation;
	}

	const confirmPasswordValidation = validateConfirmPassword(
		data.password,
		data.confirmPassword
	);
	if (!confirmPasswordValidation.isValid) {
		return confirmPasswordValidation;
	}

	const nameValidation = validateName(data.name);
	if (!nameValidation.isValid) {
		return nameValidation;
	}

	if (data.birthDate) {
		const ageValidation = validateAge(data.birthDate, minAge);
		if (!ageValidation.isValid) {
			return ageValidation;
		}
	}

	return {
		isValid: true,
	};
};

/**
 * Вспомогательные функции для проверки сложности пароля
 */
export const getPasswordStrength = (
	password: string
): {
	score: number;
	label: string;
	color: string;
} => {
	let score = 0;

	if (!password) {
		return { score: 0, label: 'Очень слабый', color: '#ff4444' };
	}

	// Длина
	if (password.length >= 8) score++;
	if (password.length >= 12) score++;

	if (/[A-ZА-Я]/.test(password)) score++;

	if (/[a-zа-я]/.test(password)) score++;

	if (/\d/.test(password)) score++;

	if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) score++;

	if (score <= 2) {
		return { score, label: 'Очень слабый', color: '#ff4444' };
	} else if (score <= 3) {
		return { score, label: 'Слабый', color: '#ff8800' };
	} else if (score <= 4) {
		return { score, label: 'Средний', color: '#ffcc00' };
	} else if (score <= 5) {
		return { score, label: 'Хороший', color: '#88cc00' };
	} else {
		return { score, label: 'Отличный', color: '#00cc44' };
	}
};

/**
 * Форматирование даты рождения для отображения
 */
export const formatBirthDate = (date: Date): string => {
	if (!date) return '';

	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

/**
 * Проверка на валидность даты рождения (не в будущем и не слишком старая)
 */
export const isValidBirthDate = (date: Date, maxAge: number = 100): boolean => {
	const ageValidation = validateAge(date, 0, maxAge);
	return ageValidation.isValid;
};
