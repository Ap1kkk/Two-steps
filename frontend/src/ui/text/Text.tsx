import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './index.module.scss';
import {FontFamiliesClasses} from "src/constants/articleProps";

type TextProps = {
	children: ReactNode;
	as?: ElementType;
	size?: 12 | 18 | 22 | 24 | 32 | 38 | 44;
	weight?: 400 | 600 | 800;
	fontStyle?: 'italic' | 'normal';
	color?: 'light' | 'dark' | 'white';
	uppercase?: boolean;
	align?: 'center' | 'left' | 'right';
	family?: FontFamiliesClasses;
	dynamic?: boolean;
	dynamicLite?: boolean;
	className?: string;
};

export const Text = ({
	children,
	as: Tag = 'div',
	size = 18,
	weight = 400,
	fontStyle = 'normal',
	color = 'light',
	uppercase = false,
	align = 'left',
	family = 'roboto',
	dynamic = false,
	dynamicLite = false,
}: TextProps) => {
	const className = clsx(
		styles.text,
		styles[`size${size}`],
		styles[`weight${weight}`],
		styles[`${fontStyle}`],
		styles[`color-${color}`],
		{ [styles.uppercase]: uppercase },
		styles[`${align}`],
		styles[`${family}`],
		{ [styles.dynamic]: dynamic },
		{ [styles.dynamicLite]: dynamicLite }
	);
	return <Tag className={className}>{children}</Tag>;
};
