export const fontFamilyClasses = ['roboto', 'yandex'] as const;

export type FontFamiliesClasses = (typeof fontFamilyClasses)[number];

export type OptionType = {
	title: string;
	value: string;
	className: string;
	optionClassName?: string;
};

export const fontFamilyOptions: OptionType[] & {
	optionClassName?: FontFamiliesClasses;
} = [
	{ title: 'Roboto', value: 'Roboto', className: fontFamilyClasses[0] },
	{ title: 'yandex', value: 'yandex', className: fontFamilyClasses[1] },
];

export const defaultArticleState = {
	fontFamilyOption: fontFamilyOptions[0],
};
