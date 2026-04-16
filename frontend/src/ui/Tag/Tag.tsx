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
	wrap?: boolean;
}

export const Tag: React.FC<TagProps> = ({
	items,
	variant = 'default',
	className,
	selectedIds = [],
	onTagClick,
	wrap = true,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const [visibleCount, setVisibleCount] = useState<number | null>(null);

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
		return [items];
	};

	const tagItems = normalizeItems();

	const isSelected = (id?: number | string) => {
		if (!id) return false;
		return selectedIds.includes(id);
	};

	useEffect(() => {
		if (wrap || tagItems.length === 0) {
			setVisibleCount(tagItems.length);
			return;
		}

		const calculateVisibleCount = () => {
			const container = containerRef.current;
			if (!container) return;

			const tempContainer = document.createElement('div');
			tempContainer.style.position = 'absolute';
			tempContainer.style.visibility = 'hidden';
			tempContainer.style.display = 'flex';
			tempContainer.style.gap = '8px';
			tempContainer.style.whiteSpace = 'nowrap';
			tempContainer.style.top = '-9999px';
			tempContainer.style.left = '-9999px';
			document.body.appendChild(tempContainer);

			const tagElements: HTMLElement[] = [];
			tagItems.forEach((item) => {
				const tag = document.createElement('button');
				tag.className = `${styles.tag_item} ${styles[variant]}`;
				tag.innerHTML = `<span class="${styles.button_label}">${item.label}</span>`;
				tempContainer.appendChild(tag);
				tagElements.push(tag);
			});

			const moreTag = document.createElement('div');
			moreTag.className = `${styles.moreTag} ${styles[variant]}`;
			moreTag.textContent = '+0';
			tempContainer.appendChild(moreTag);

			const containerWidth = container.clientWidth;
			let totalWidth = 0;
			let visible = 0;
			const gap = 8;
			const moreTagWidth = moreTag.offsetWidth;

			for (let i = 0; i < tagElements.length; i++) {
				const tagWidth = tagElements[i].offsetWidth;
				const currentWidth =
					totalWidth + (totalWidth === 0 ? 0 : gap) + tagWidth;

				const needMoreTagSpace = i < tagElements.length - 1;
				const requiredWidth = needMoreTagSpace
					? currentWidth + gap + moreTagWidth
					: currentWidth;

				if (requiredWidth <= containerWidth) {
					totalWidth = currentWidth;
					visible = i + 1;
				} else {
					break;
				}
			}

			if (visible === 0 && tagElements.length > 0) {
				visible = 1;
			}

			setVisibleCount(visible);

			document.body.removeChild(tempContainer);
		};

		const timeoutId = setTimeout(calculateVisibleCount, 10);

		const resizeObserver = new ResizeObserver(() => {
			calculateVisibleCount();
		});

		if (containerRef.current) {
			resizeObserver.observe(containerRef.current);
		}

		window.addEventListener('resize', calculateVisibleCount);

		return () => {
			clearTimeout(timeoutId);
			resizeObserver.disconnect();
			window.removeEventListener('resize', calculateVisibleCount);
		};
	}, [tagItems, variant, wrap]);

	if (tagItems.length === 0) return null;

	if (visibleCount === null) {
		return (
			<div
				ref={containerRef}
				className={`${styles.tags_container} ${styles.nowrap} ${
					className || ''
				}`}>
				<button className={`${styles.tag_item} ${styles[variant]}`}>
					<span className={styles.button_label}>
						{tagItems[0]?.label || ''}
					</span>
				</button>
			</div>
		);
	}

	const visibleItems = tagItems.slice(0, visibleCount);
	const remaining = tagItems.length - visibleCount;
	const hiddenItems = tagItems.slice(visibleCount);

	return (
		<div
			ref={containerRef}
			className={`${styles.tags_container} ${
				wrap ? styles.wrap : styles.nowrap
			} ${className || ''}`}>
			{visibleItems.map((item, index) => (
				<button
					type={'button'}
					key={item.id ?? index}
					className={`${styles.tag_item} ${styles[variant]} ${
						isSelected(item.id) ? styles.selected : ''
					}`}
					onClick={() => onTagClick?.(item.id)}>
					<span className={styles.button_label}>{item.label}</span>
				</button>
			))}
			{!wrap && remaining > 0 && (
				<div
					className={`${styles.moreTag} ${styles[variant]}`}
					title={hiddenItems.map((item) => item.label).join(', ')}>
					+{remaining}
				</div>
			)}
		</div>
	);
};
