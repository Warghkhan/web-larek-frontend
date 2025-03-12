import { CartInterface } from '../../../types'; // Импортируем интерфейс CartInterface для определения структуры корзины
import { View } from '../../base/component'; // Импортируем базовый класс View для создания страницы корзины
import {
	cloneTemplate,
	createElement,
	ensureElement,
} from '../../../utils/utils'; // Импортируем утилиты для работы с DOM
import { IEvents } from '../../base/events'; // Импортируем интерфейс для управления событиями

// Класс Cart, наследующий от View и реализующий интерфейс CartInterface
export class Cart extends View<CartInterface> {
	static template = ensureElement<HTMLTemplateElement>('#basket'); // Указываем шаблон для корзины
	protected _list: HTMLElement; // Элемент для отображения списка товаров в корзине
	protected _total: HTMLElement; // Элемент для отображения общей суммы
	protected _button: HTMLElement; // Кнопка для оформления заказа

	constructor(protected events: IEvents) {
		// Вызываем конструктор базового класса и клонируем шаблон корзины
		super(cloneTemplate(Cart.template), events);

		// Находим элементы корзины в DOM
		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector(
			'.button'
		) as HTMLButtonElement | null; // Приводим элемент к типу HTMLButtonElement или null

		// Если кнопка найдена, добавляем обработчик события на клик
		if (this._button) {
			this._button.addEventListener('click', () => {
				events.emit('order:open'); // Генерируем событие для открытия заказа
			});
		}

		// Инициализируем список товаров как пустой
		this.items = [];
	}

	// Сеттер для обновления списка товаров в корзине
	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items); // Заменяем содержимое списка на новые элементы
			if (this._button instanceof HTMLButtonElement) {
				this.setDisabled(this._button, false); // Активируем кнопку, если есть товары
			}
		} else {
			// Если список пуст, отображаем сообщение
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Самое время наполнить корзину...', // Сообщение для пользователя
				})
			);
			if (this._button instanceof HTMLButtonElement) {
				this.setDisabled(this._button, true); // Деактивируем кнопку, если нет товаров
			}
		}
	}

	// Сеттер для обновления состояния выбора товаров
	set selected(items: string[]) {
		if (this._button instanceof HTMLButtonElement) {
			if (items.length) {
				this.setDisabled(this._button, false); // Активируем кнопку, если есть выбранные товары
			} else {
				this.setDisabled(this._button, true); // Деактивируем кнопку, если нет выбранных товаров
			}
		} else {
			throw new Error('Кнопка не найдена или не является HTMLButtonElement'); // Ошибка, если кнопка не найдена
		}
	}

	// Сеттер для обновления общей суммы в корзине
	set total(total: number) {
		this.setText(this._total, `${total} синапсов`); // Обновляем текст элемента с общей суммой
	}
}
