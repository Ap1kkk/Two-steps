import React, { useState } from 'react';
import { Tag } from '@ui';

import styles from './RegistrationForm3.module.scss';
import s from '../RegistrationForm.module.scss';

interface Tag {
	id: string;
	name: string;
}

const availableTags: Tag[] = [
	{ id: '1', name: 'Фитнес' },
	{ id: '2', name: 'Бег' },
	{ id: '3', name: 'Йога' },
	{ id: '4', name: 'Велоспорт' },
	{ id: '5', name: 'Плавание' },
	{ id: '6', name: 'Тренажёрный зал' },
	{ id: '7', name: 'Кроссфит' },
	{ id: '8', name: 'Танцы' },
	{ id: '9', name: 'Футбол' },
	{ id: '10', name: 'Баскетбол' },
];

interface RegistrationForm3Props {
	onComplete: (data: { tags: string[] }) => void;
	onBack: () => void;
	initialData?: { tags: string[] };
}

export const RegistrationForm3: React.FC<RegistrationForm3Props> = ({
	onComplete,
	onBack,
	initialData,
}) => {
	const [selectedTags, setSelectedTags] = useState<string[]>(
		initialData?.tags || []
	);

	const tagItems = availableTags.map((tag) => ({
		id: tag.id,
		label: tag.name,
	}));


	const handleTagClick = (tagId?: string | number) => {
		if (tagId) {
			setSelectedTags((prev) =>
				prev.includes(tagId as string)
					? prev.filter((id) => id !== tagId)
					: [...prev, tagId as string]
			);
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onComplete({ tags: selectedTags });
	};

	return (
		<div className={styles.container}>
			<div className={s.stepCounter}>
				<div className={s.stepIndicator}>Шаг 2 из 3</div>
				<div className={s.progressSteps}>
					<div className={`${s.stepDot} ${s.active}`} />
					<div className={`${s.stepDot} ${s.active}`} />
					<div className={`${s.stepDot} ${s.active}`} />
				</div>
			</div>
			<form onSubmit={handleSubmit} className={styles.form}>
				<p className={styles.tagHint}>
					Выберите теги, которые вам нравятся (можно несколько)
				</p>

				<Tag
					items={tagItems}
					variant='selectable'
					selectedIds={selectedTags}
					onTagClick={handleTagClick}
				/>

				<div className={styles.buttons}>
					<button
						type='button'
						onClick={onBack}
						className={styles.backButton}>
						Назад
					</button>
					<button type='submit' className={styles.nextButton}>
						Завершить регистрацию
					</button>
				</div>
			</form>
		</div>
	);
};