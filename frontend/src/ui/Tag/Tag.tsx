import React, { useRef, useEffect, useState } from 'react';
import styles from './Tag.module.scss';
import { Category } from '../../types/route';

type Variant = 'default' | 'small' | 'large' | 'selectable';

interface TagsProps {
	categories: Category[];
	selectedIds?: number[];
	variant?: Variant;
	className?: string;
	onCategoryClick?: (id: number) => void;
}

export const Tag: React.FC<TagsProps> = ({
	categories,
	selectedIds = [],
	variant = 'default',
	className,
	onCategoryClick,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(categories.length);

	const isSelected = (id: number) => selectedIds.includes(id);

	useEffect(() => {
		if (!containerRef.current) return;

		const measure = () => {
			const container = containerRef.current;
			if (!container) return;

			const tags = Array.from(container.children) as HTMLElement[];
			const moreTagWidth = 48;
			let totalWidth = 0;
			let visible = 0;

			for (let i = 0; i < tags.length; i++) {
				const width = tags[i].offsetWidth;
				const widthWithGap = totalWidth + (totalWidth === 0 ? 0 : 8) + width;

				if (
					widthWithGap + (i === tags.length - 1 ? 0 : moreTagWidth) <=
					container.clientWidth
				) {
					totalWidth = widthWithGap;
					visible = i + 1;
				} else break;
			}

			setVisibleCount(visible || 1);
		};

		measure();
		window.addEventListener('resize', measure);
		return () => window.removeEventListener('resize', measure);
	}, [categories]);

	if (!categories.length) return null;

	const remaining = categories.length - visibleCount;

	return (
		<div
			ref={containerRef}
			className={styles.tagsGroup}>
			{categories.slice(0, visibleCount).map((category) => (
				<button
					key={category.id}
					className={`${styles.tag} ${styles[variant]} ${
						isSelected(category.id) ? styles.selected : ''
					}`}
					onClick={() => onCategoryClick?.(category.id)}>
					{category.name}
				</button>
			))}
			{remaining > 0 && (
				<div className={`${styles.moreTag} ${styles[variant]}`}>
					+{remaining}
				</div>
			)}
		</div>
	);
};

Tag.displayName = 'Tag';
