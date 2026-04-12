// RegistrationForm3.tsx
import React, { useState } from 'react';
import styles from './RegistrationForm3.module.scss';

interface Tag {
	id: string;
	name: string;
	emoji: string;
}

const availableTags: Tag[] = [
	{ id: '1', name: 'Фитнес', emoji: '💪' },
	{ id: '2', name: 'Бег', emoji: '🏃' },
	{ id: '3', name: 'Йога', emoji: '🧘' },
	{ id: '4', name: 'Велоспорт', emoji: '🚴' },
	{ id: '5', name: 'Плавание', emoji: '🏊' },
	{ id: '6', name: 'Тренажёрный зал', emoji: '🏋️' },
	{ id: '7', name: 'Кроссфит', emoji: '⚡' },
	{ id: '8', name: 'Танцы', emoji: '💃' },
	{ id: '9', name: 'Футбол', emoji: '⚽' },
	{ id: '10', name: 'Баскетбол', emoji: '🏀' },
];

interface RegistrationForm3Props {
	onComplete: (data: { tags: string[] }) => void;
	onBack: () => void;
	initialData?: { tags: string[] };
}

const RegistrationForm3: React.FC<RegistrationForm3Props> = ({ onComplete, onBack, initialData }) => {
	const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);

	const toggleTag = (tagId: string) => {
		setSelectedTags(prev =>
			prev.includes(tagId)
				? prev.filter(id => id !== tagId)
				: [...prev, tagId]
		);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onComplete({ tags: selectedTags });
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<p className={styles.tagHint}>Выберите теги, которые вам нравятся (можно несколько)</p>

			<div className={styles.tagsGrid}>
				{availableTags.map(tag => (
					<button
						key={tag.id}
						type="button"
						onClick={() => toggleTag(tag.id)}
						className={`${styles.tag} ${selectedTags.includes(tag.id) ? styles.tagSelected : ''}`}
					>
						<span>{tag.emoji}</span>
						<span>{tag.name}</span>
					</button>
				))}
			</div>

			<div className={styles.buttons}>
				<button type="button" onClick={onBack} className={styles.backButton}>Назад</button>
				<button type="submit" className={styles.nextButton}>Завершить регистрацию</button>
			</div>
		</form>
	);
};

export default RegistrationForm3;