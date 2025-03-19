import { View } from '../../base/component'; // Импортируем базовый класс View для создания страницы
import { PageInterface } from '../../../types/index'; // Импортируем интерфейс PageInterface для определения структуры страницы
import { ensureElement } from '../../../utils/utils'; // Импортируем функцию для безопасного получения DOM-элементов
import { IEvents } from '../../base/events'; // Импортируем интерфейс для управления событиями

// Определяем класс Page, который расширяет функциональность класса View с использованием интерфейса PageInterface
export class Page extends View<PageInterface> {
	protected _counter: HTMLElement; // Элемент для отображения количества товаров в корзине
	protected _gallery: HTMLElement; // Элемент для отображения галереи товаров
	protected _wrapper: HTMLElement; // Обертка для всей страницы
	protected _cart: HTMLElement; // Элемент, представляющий корзину покупок

	// Конструктор класса Page
	constructor(container: HTMLElement, events: IEvents) {
		super(container, events); // Вызываем конструктор родительского класса View
		// Инициализируем элементы с помощью функции ensureElement
		this._counter = ensureElement<HTMLElement>('.header__basket-counter'); // Получаем элемент счётчика
		this._gallery = ensureElement<HTMLElement>('.gallery'); // Получаем элемент галереи
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper'); // Получаем обертку страницы
		this._cart = ensureElement<HTMLElement>('.header__basket'); // Получаем элемент корзины
		// Добавляем обработчик события для клика на корзину
		this._cart.addEventListener('click', () => {
			this.events.emit('basket:open'); // Генерируем событие открытия корзины
		});
	}

	// Сеттер для обновления счётчика товаров в корзине
	set counter(value: number) {
		this.setText(this._counter, String(value)); // Устанавливаем текст счётчика
	}

	// Сеттер для обновления карточек товаров в галерее
	set gallery(items: HTMLElement[]) {
		this._gallery.replaceChildren(...items); // Заменяем содержимое галереи на новые карточки товаров
	}

	// Сеттер для управления блокировкой прокрутки страницы
	set locked(value: boolean) {
		this.toggleClass(this._wrapper, 'page__wrapper_locked', value);
	}
}
