import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { SyntheticEvent, useState } from 'react';
import clsx from 'clsx';

import { Text } from 'src/ui/text';
import { Select } from 'src/ui/select';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';

type ArticleProps = {
	setAppState: (type: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleProps) => {
	//Состояние формы - для хранения вне зависимости от того, была ли нажата кнопка "Применить"
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	//Признак открытой формы
	const [isFormOpened, setIsFormOpened] = useState<boolean>(false);

	//Стили для формы
	const containerStyle = clsx({
		[styles.container]: true,
		[styles.container_open]: isFormOpened,
	});

	//Стили для оверлея
	const overlayStyle = clsx({
		[styles.overlay]: true,
		[styles.overlay_open]: isFormOpened,
	});

	//Управление состоянием формы
	const switchFormState = () => {
		setIsFormOpened(isFormOpened === false ? true : false);
	};

	//При нажатии кнопки "Применить" обновляем состояние приложения
	function submit(e: SyntheticEvent) {
		e.preventDefault();
		props.setAppState(formState);
	}

	//При нажатии кнопки "Сбросить" обновляем состояние приложения к дефолтному
	function reset(e: SyntheticEvent) {
		e.preventDefault();
		props.setAppState(defaultArticleState);
		setFormState(defaultArticleState);
	}

	return (
		<>
			<ArrowButton isOpen={isFormOpened} onClick={switchFormState} />
			<div
				onClick={() => setIsFormOpened(false)}
				className={overlayStyle}></div>
			<aside className={containerStyle}>
				<form className={styles.form} onSubmit={submit} onReset={reset}>
					<Text size={31} weight={800} uppercase={true} align='left'>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(selected: OptionType) => {
							setFormState({
								fontFamilyOption: selected,
								fontColor: formState.fontColor,
								backgroundColor: formState.backgroundColor,
								contentWidth: formState.contentWidth,
								fontSizeOption: formState.fontSizeOption,
							});
						}}
					/>
					<RadioGroup
						title='размер шрифта'
						name='fontSize'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(selected: OptionType) => {
							setFormState({
								fontFamilyOption: formState.fontFamilyOption,
								fontColor: formState.fontColor,
								backgroundColor: formState.backgroundColor,
								contentWidth: formState.contentWidth,
								fontSizeOption: selected,
							});
						}}
					/>
					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(selected: OptionType) => {
							setFormState({
								fontFamilyOption: formState.fontFamilyOption,
								fontColor: selected,
								backgroundColor: formState.backgroundColor,
								contentWidth: formState.contentWidth,
								fontSizeOption: formState.fontSizeOption,
							});
						}}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(selected: OptionType) => {
							setFormState({
								fontFamilyOption: formState.fontFamilyOption,
								fontColor: formState.fontColor,
								backgroundColor: selected,
								contentWidth: formState.contentWidth,
								fontSizeOption: formState.fontSizeOption,
							});
						}}
					/>
					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(selected: OptionType) => {
							setFormState({
								fontFamilyOption: formState.fontFamilyOption,
								fontColor: formState.fontColor,
								backgroundColor: formState.backgroundColor,
								contentWidth: selected,
								fontSizeOption: formState.fontSizeOption,
							});
						}}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
