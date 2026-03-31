// category-tags-group.tsx
import React from 'react';
import { CategoryTag } from '../category-tag/category-tag';
import styles from './category-tags-group.module.scss';
import { Category } from '../../types/route';

interface CategoryTagsGroupProps {
	categories: Category[];
	selectedIds?: number[];
	variant?: 'default' | 'small' | 'large' | 'selectable';
	onCategoryClick?: (id: number) => void;
	className?: string;
	maxDisplay?: number;
	showAll?: boolean;
	justify?: 'flex-start' | 'center' | 'flex-end';
}

export const CategoryTagsGroup: React.FC<CategoryTagsGroupProps> = ({
	categories,
	selectedIds = [],
	variant = 'default',
	onCategoryClick,
	className,
	maxDisplay,
	showAll = false,
	justify = 'flex-start',
}) => {
	const displayCategories =
		maxDisplay && !showAll ? categories.slice(0, maxDisplay) : categories;

	const remainingCount =
		maxDisplay && !showAll && categories.length > maxDisplay
			? categories.length - maxDisplay
			: 0;

	if (!categories.length) {
		return null;
	}

	return (
		<div
			className={`${styles.tagsGroup} ${className || ''}`}
			style={{ justifyContent: justify }}>
			{displayCategories.map((category) => (
				<CategoryTag
					key={category.id}
					category={category}
					variant={variant}
					isActive={selectedIds.includes(category.id)}
					onClick={onCategoryClick}
				/>
			))}
			{remainingCount > 0 && (
				<span className={`${styles.moreTag} ${styles[variant]}`}>
					+{remainingCount}
				</span>
			)}
		</div>
	);
};

CategoryTagsGroup.displayName = 'CategoryTagsGroup';
