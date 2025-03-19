import { View } from '../../base/component'; // Импортируем базовый класс View для создания страницы
import { ModalInterface } from '../../../types/index'; // Импортируем интерфейс ModalInterface для определения структуры страницы
import { ensureElement } from '../../../utils/utils'; // Импортируем функцию для безопасного получения DOM-элементов
import { IEvents } from '../../base/events'; // Импортируем интерфейс для управления событиями

// Класс Modal наследует функциональность от базового класса View
export class Modal extends View<ModalInterface> {
	protected _closeButton: HTMLButtonElement; // Кнопка закрытия модального окна
	protected _content: HTMLElement; // Элемент, содержащий контент модального окна

	// Конструктор принимает контейнер для модального окна и объект событий
	constructor(container: HTMLElement, protected events: IEvents) {
		super(container, events); // Вызываем конструктор родительского класса

		// Находим кнопку закрытия и контент модального окна с помощью функции ensureElement
		this._closeButton = ensureElement<HTMLButtonElement>(
			'.modal__close',
			container
		);
		this._content = ensureElement<HTMLElement>('.modal__content', container);

		// Добавляем обработчик события для кнопки закрытия
		this._closeButton.addEventListener('click', this.close.bind(this));
		// Добавляем обработчик события для контейнера, чтобы закрыть модал при клике
		this.container.addEventListener('click', this.close.bind(this));
		// Предотвращаем закрытие модалки при клике внутри контента
		this._content.addEventListener('click', (event) => event.stopPropagation());
	}

	// Сеттер для установки содержимого модального окна
	set content(value: HTMLElement) {
		this._content.replaceChildren(value); // Заменяем текущее содержимое на новое
	}

	// Метод для открытия модального окна
	open() {
		this.toggleClass(this.container, 'modal_active', true); // Добавляем класс для отображения модалки
		this.events.emit('modal:open'); // Генерируем событие открытия модалки
	}

	// Метод для закрытия модального окна
	close() {
		this.toggleClass(this.container, 'modal_active', false); // Убираем класс отображения
		this.content = null; // Очищаем содержимое модалки
		this.events.emit('modal:close'); // Генерируем событие закрытия модалки
	}

	// Метод для рендеринга модального окна
	render(data: ModalInterface): HTMLElement {
		super.render(data); // Вызываем рендер родительского класса
		this.open(); // Открываем модальное окно
		return this.container; // Возвращаем контейнер модалки
	}
}
