import { Component } from '../../base/component'; // Импорт базового класса Component
import { CardInterface, Action, Categories } from '../../../types'; // Импорт интерфейсов и типов
import { ensureElement, handlePrice } from '../../../utils/utils'; // Импорт утилит для обеспечения элементов и обработки цен
import { categoryMapping, CDN_URL } from '../../../utils/constants'; // Импорт констант для категорий и CDN URL

// Класс Card, представляющий карточку товара
export class Card extends Component<CardInterface> {
	protected _title: HTMLElement; // Элемент заголовка карточки
	protected _image: HTMLImageElement; // Элемент изображения карточки
	protected _category: HTMLElement; // Элемент категории карточки
	protected _price: HTMLElement; // Элемент цены карточки
	protected _button: HTMLButtonElement; // Элемент кнопки карточки

	constructor(
		protected blockName: string, // Имя блока для CSS классов
		container: HTMLElement, // Контейнер, в котором находится карточка
		action?: Action // Действие, которое будет выполнено по клику
	) {
		super(container); // Вызов конструктора родительского класса

		// Инициализация элементов карточки с помощью утилиты ensureElement
		this._title = ensureElement<HTMLElement>(`.${blockName}__title`, container);
		this._image = ensureElement<HTMLImageElement>(
			`.${blockName}__image`,
			container
		);
		this._button = container.querySelector(
			`.${blockName}__button`
		) as HTMLButtonElement;
		this._category = container.querySelector(
			`.${blockName}__category`
		) as HTMLElement;
		console.log(this._category);
		this._price = container.querySelector(
			`.${blockName}__price`
		) as HTMLElement;

		// Добавление обработчика события клика
		if (action?.onClick) {
			const clickTarget = this._button || container; // Цель клика - кнопка или контейнер
			clickTarget.addEventListener('click', action.onClick); // Добавление обработчика клика
		}
	}

	// Геттер и сеттер для id карточки
	set id(value: string) {
		this.container.dataset.id = value; // Установка id в data-атрибут контейнера
	}
	get id(): string {
		return this.container.dataset.id || ''; // Получение id из data-атрибута
	}

	// Геттер и сеттер для title карточки
	set title(value: string) {
		this.setText(this._title, value); // Установка текста заголовка
	}
	get title(): string {
		return this._title.textContent || ''; // Получение текста заголовка
	}

	// Сеттер для изображения карточки
	set image(value: string) {
		this.setImage(this._image, `${CDN_URL}${value}`); // Установка источника изображения
	}

	// Сеттер для изменения текста кнопки
	set button(value: string) {
		this.setText(this._button, value);
	}

	// Сеттер для состояния выбора карточки
	set selected(value: boolean) {
		this.setDisabled(this._button, value); // Установка состояния кнопки (активна/неактивна)
	}

	// Сеттер для цены карточки
	set price(value: number | null) {
		if (value !== null) {
			this.setText(this._price, `${handlePrice(value)} синапсов`); // Форматирование цены
		} else {
			this.setText(this._price, 'Бесценно'); // Если цена отсутствует
		}
		this.setDisabled(this._button, value === null); // Дизаблизация кнопки, если цена отсутствует
	}
	/*
	set category(value: Categories) {
		this.setText(this._category, value); // Установка текста категории
		//this._category.className = categoryMapping[value]; // Заменяем все классы на новый
	}
*/
	// Сеттер для категории карточки
	set category(value: Categories) {
		this.setText(this._category, value); // Установка текста категории
		// Удаляем все классы, связанные с категориями
		Object.values(categoryMapping).forEach((className) => {
			this._category.classList.remove(className);
		});
		// Добавляем новый класс
		this._category.classList.add(categoryMapping[value]);
	}
}

// Класс Product, наследующий от Card
export class Product extends Card {
	constructor(container: HTMLElement, action?: Action) {
		super('card', container, action); // Вызов конструктора родительского класса с именем блока 'card'
	}
}

// Класс ProductPreview, наследующий от Card
export class ProductPreview extends Card {
	protected _description: HTMLElement; // Элемент описания карточки

	constructor(container: HTMLElement, action?: Action) {
		super('card', container, action); // Вызов конструктора родительского класса
		this._description = container.querySelector(
			`.${this.blockName}__text`
		) as HTMLElement; // Инициализация элемента описания
	}

	// Сеттер для описания карточки
	set description(value: string) {
		this.setText(this._description, value); // Установка текста описания
	}
}
