import React, { useRef, useEffect, useState } from 'react';
import styles from './Tag.module.scss';

type Variant = 'default' | 'small' | 'large' | 'selectable';

interface TagItem {
	label: string;
	id?: number | string;
}

interface TagProps {
	items: TagItem[] | string[];
	variant?: Variant;
	className?: string;
	selectedIds?: (number | string)[];
	onTagClick?: (id?: number | string) => void;
}

export const Tag: React.FC<TagProps> = ({
	items,
	variant = 'default',
	className,
	selectedIds = [],
	onTagClick,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState(0);

	// Нормализуем входные данные в массив объектов
	const normalizeItems = (): TagItem[] => {
		if (!items) return [];

		if (Array.isArray(items)) {
			return items.map((item, index) => {
				if (typeof item === 'string') {
					return { label: item, id: index };
				}
				return item;
			});
		}

		if (typeof items === 'string') {
			return [{ label: items, id: 0 }];
		}

		return [items];
	};

	const tagItems = normalizeItems();
	const isSelected = (id?: number | string) => {
		if (!id) return false;
		return selectedIds.includes(id);
	};

	useEffect(() => {
		if (!containerRef.current || tagItems.length <= 1) {
			setVisibleCount(tagItems.length);
			return;
		}

		const measure = () => {
			const container = containerRef.current;
			if (!container) return;

			const tagElements = Array.from(container.children) as HTMLElement[];
			const moreTagWidth = 48;
			let totalWidth = 0;
			let visible = 0;

			for (let i = 0; i < tagElements.length; i++) {
				const width = tagElements[i].offsetWidth;
				const gap = totalWidth === 0 ? 0 : 8;
				const widthWithGap = totalWidth + gap + width;

				const needMoreTagSpace = i !== tagElements.length - 1;
				const requiredWidth = needMoreTagSpace
					? widthWithGap + moreTagWidth
					: widthWithGap;

				if (requiredWidth <= container.clientWidth) {
					totalWidth = widthWithGap;
					visible = i + 1;
				} else {
					break;
				}
			}

			setVisibleCount(Math.max(visible, 1));
		};

		const timeoutId = setTimeout(measure, 0);
		window.addEventListener('resize', measure);

		return () => {
			clearTimeout(timeoutId);
			window.removeEventListener('resize', measure);
		};
	}, [tagItems]);

	if (tagItems.length === 0) return null;

	const remaining = tagItems.length - visibleCount;
	const visibleItems = tagItems.slice(0, visibleCount);
	const hiddenItems = tagItems.slice(visibleCount);

	return (
		<div
			ref={containerRef}
			className={`${styles.tags_container} ${className || ''}`}>
			{visibleItems.map((item, index) => (
				<button
					key={item.id ?? index}
					className={`${styles.tag_item} ${styles[variant]} ${
						isSelected(item.id) ? styles.selected : ''
					}`}
					onClick={() => onTagClick?.(item.id)}>
					<span className={styles.button_label}> {item.label} </span>
				</button>
			))}
			{remaining > 0 && (
				<div
					className={`${styles.moreTag} ${styles[variant]}`}
					title={hiddenItems.map((item) => item.label).join(', ')}>
					+{remaining}
				</div>
			)}
		</div>
	);
};

Tag.displayName = 'Tag';
