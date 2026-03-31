import React from 'react';
import styles from './category-tag.module.scss';
import { Category } from '../../types/route';

interface CategoryTagProps {
	category: Category | { id: number; name: string };
	variant?: 'default' | 'small' | 'large' | 'selectable';
	isActive?: boolean;
	onClick?: (id: number) => void;
	className?: string;
}

export const CategoryTag: React.FC<CategoryTagProps> = ({
	category,
	variant = 'default',
	isActive = false,
	onClick,
	className,
}) => {
	const displayText = category.name|| '';

	const handleClick = () => {
		if (onClick) {
			onClick(category.id);
		}
	};

	const tagClasses = [
		styles.categoryTag,
		styles[variant],
		isActive && styles.active,
		onClick && styles.clickable,
		className,
	]
		.filter(Boolean)
		.join(' ');

	return (
		<span
			className={tagClasses}
			onClick={handleClick}
			role={onClick ? 'button' : undefined}
			tabIndex={onClick ? 0 : undefined}>
			{displayText}
		</span>
	);
};

CategoryTag.displayName = 'CategoryTag';
