import { CartInterface } from '../../../types'; // Импортируем интерфейс CartInterface для определения структуры корзины
import { View } from '../../base/component'; // Импортируем базовый класс View для создания страницы корзины
import {
	cloneTemplate,
	createElement,
	ensureElement,
	handleError, // Импортируем функцию обработки ошибок для централизованной обработки исключений
} from '../../../utils/utils'; // Импортируем утилиты для работы с DOM и обработки ошибок
import { IEvents } from '../../base/events'; // Импортируем интерфейс для управления событиями

// Класс Cart, наследующий от View и реализующий интерфейс CartInterface
export class Cart extends View<CartInterface> {
	static template = ensureElement<HTMLTemplateElement>('#basket'); // Указываем шаблон для корзины, получая элемент по ID
	protected _list: HTMLElement; // Элемент для отображения списка товаров в корзине
	protected _total: HTMLElement; // Элемент для отображения общей суммы
	protected _button: HTMLElement; // Кнопка для оформления заказа

	constructor(protected events: IEvents) {
		// Вызываем конструктор базового класса с клонированным шаблоном корзины и событиями
		super(cloneTemplate(Cart.template), events);

		try {
			// Находим элементы корзины в DOM с помощью утилиты ensureElement
			this._list = ensureElement<HTMLElement>('.basket__list', this.container);
			this._total = this.container.querySelector('.basket__price'); // Ищем элемент для общей суммы
			this._button = this.container.querySelector('.button') as HTMLButtonElement | null; // Ищем кнопку оформления заказа

			// Если кнопка найдена, добавляем обработчик события на клик
			if (this._button) {
				this._button.addEventListener('click', () => {
					events.emit('order:open'); // Генерируем событие для открытия заказа
				});
			} else {
				handleError('Кнопка не найдена в корзине.'); // Обработка ошибки, если кнопка не найдена
			}
		} catch (error) {
			// Обработка ошибок инициализации корзины
			handleError(`Ошибка инициализации корзины: ${error.message}`);
		}

		this.items = []; // Инициализируем список товаров как пустой
	}

	// Сеттер для обновления списка товаров в корзине
	set items(items: HTMLElement[]) {
		if (items.length) {
			// Если есть товары, заменяем содержимое списка на новые элементы
			this._list.replaceChildren(...items);
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
			// Активируем или деактивируем кнопку в зависимости от наличия выбранных товаров
			this.setDisabled(this._button, items.length === 0);
		} else {
			handleError('Кнопка не найдена или не является HTMLButtonElement'); // Обработка ошибки
		}
	}

	// Сеттер для обновления общей суммы в корзине
	set total(total: number) {
		if (this._total) {
			// Обновляем текст элемента с общей суммой
			this.setText(this._total, `${total} синапсов`);
		} else {
			handleError('Элемент для отображения общей суммы не найден.'); // Обработка ошибки
		}
	}
}
