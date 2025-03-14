import { Component } from '../../base/component'; // Импортируем базовый класс Component
import { OrderResponse, Action } from '../../../types'; // Импортируем интерфейсы OrderResponse и SuccesAction для определения структуры ответа заказа и действий.
import { ensureElement } from '../../../utils/utils'; // Импортируем утилиты для безопасного получения элементов DOM.

export class Success extends Component<OrderResponse> {
	protected _total: HTMLElement; // Элемент для отображения общей суммы заказа.
	protected _close: HTMLButtonElement; // Кнопка закрытия

	constructor(protected container: HTMLFormElement, actions?: Action) {
		super(container); // Вызываем конструктор родительского класса Component.

		// Ищем элемент для отображения общей суммы заказа в контейнере.
		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);

		// Ищем кнопку закрытия в контейнере.
		this._close = ensureElement<HTMLButtonElement>(
			'.order-success__close',
			this.container
		);

		// Если переданы действия, добавляем обработчик события click на кнопку закрытия или на контейнер.
		if (actions?.onClick) {
			if (this._close) {
				this._close.addEventListener('click', actions.onClick); // Добавляем обработчик на кнопку закрытия.
			} else {
				container.addEventListener('click', actions.onClick); // Добавляем обработчик на контейнер, если кнопка отсутствует.
			}
		}
	}

	// Сеттер для свойства total, который обновляет текст общей суммы заказа.
	set total(value: number) {
		this.setText(this._total, `Списано ${value} синапсов`); // Устанавливаем текст с общей суммой.
	}
}
