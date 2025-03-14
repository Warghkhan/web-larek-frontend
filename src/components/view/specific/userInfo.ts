import { OrderFormInterface } from '../../../types'; // Импортируем интерфейс OrderFormInterface для определения структуры данных формы заказа
import { IEvents } from '../../base/events'; // Импортируем интерфейс для управления событиями
import { Form } from '../common/form'; // Импортируем базовый класс Form для создания формы
import { handleError } from '../../../utils/utils'; // Импортируем функцию обработки ошибок для централизованной обработки исключений

// Класс UserInfo, наследующий от Form и реализующий интерфейс OrderFormInterface
export class UserInfo extends Form<OrderFormInterface> {
	constructor(container: HTMLFormElement, events: IEvents) {
		// Вызываем конструктор базового класса с контейнером формы и событиями
		super(container, events);
	}

	// Сеттер для обновления значения поля email
	set email(value: string) {
		// Находим элемент input для email по имени
		const emailInput = this.container.elements.namedItem(
			'email'
		) as HTMLInputElement;
		if (emailInput) {
			emailInput.value = value; // Устанавливаем значение email
		} else {
			handleError('Элемент ввода email не найден в форме.'); // Использование функции обработки ошибок, если элемент не найден
		}
	}

	// Сеттер для обновления значения поля phone
	set phone(value: string) {
		// Находим элемент input для телефона по имени
		const phoneInput = this.container.elements.namedItem(
			'phone'
		) as HTMLInputElement;
		if (phoneInput) {
			phoneInput.value = value; // Устанавливаем значение телефона
		} else {
			handleError('Элемент ввода телефона не найден в форме.'); // Использование функции обработки ошибок, если элемент не найден
		}
	}
}
