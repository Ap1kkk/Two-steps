import { ElementType, ReactNode } from 'react';
import { clsx } from 'clsx';

import styles from './index.module.scss';
import {FontFamiliesClasses} from "../UI-constants/articleProps";

type TextProps = {
    children: ReactNode;
    as?: ElementType;
    size?: 12 | 18 | 22 | 24 | 26 | 30 | 34 | 36 | 38 | 42 | 46 | 48 | 50 | 54 | 58 | 60;
    weight?: 300 | 400 | 700;
    fontStyle?: 'italic' | 'normal';
    color?: 'black' | 'white';
    uppercase?: boolean;
    align?: 'center' | 'left' | 'right';
    family?: FontFamiliesClasses;
    className?: string;
};

export const Text = ({
                         children,
                         as: Tag = 'div',
                         size = 18,
                         weight = 400,
                         fontStyle = 'normal',
                         color = 'black',
                         uppercase = false,
                         align = 'left',
                         family = 'spotify',
                         className,
                     }: TextProps) => {
    const classes = clsx(
        styles[`size${size}`],
        styles[`weight${weight}`],
        styles[fontStyle],
        styles[color],
        styles[align],
        { [styles.uppercase]: uppercase },
        styles[family],
        className
    );

    return <Tag className={classes}>{children}</Tag>;
};

export default Text;
