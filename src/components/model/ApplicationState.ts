import {
	ApplicationStateInterface, // Интерфейс состояния приложения
	Item, // Тип для товара
	OrderInterface, // Интерфейс для информации о заказе
	OrderFormInterface, // Интерфейс для формы заказа
	ValidationErrors, // Тип для ошибок валидации
	PaymentMethod, // Тип для методов оплаты
} from '../../types'; // Импортируем необходимые типы из файлов типов
import { IEvents } from '../base/events'; // Импортируем интерфейс событий
import { paymentMapping } from '../../utils/constants'; // Импортируем маппинг методов оплаты из констант
import { handleError } from '../../utils/utils'; // Импортируем функцию для обработки ошибок из утилит

// Класс ApplicationState реализует интерфейс ApplicationStateInterface
export class ApplicationState implements ApplicationStateInterface {
	inventory: Item[] = []; // Массив товаров, доступных для покупки
	cart: Item[] = []; // Массив товаров, добавленных в корзину
	orderInfo: OrderInterface = {
		// Объект с информацией о заказе
		email: '', // Email покупателя
		phone: '', // Номер телефона покупателя
		address: '', // Адрес доставки
		payment: 'card', // Метод оплаты по умолчанию
		items: [], // Список ID товаров в заказе
		total: 0, // Общая стоимость заказа
	};
	formValidationErrors: ValidationErrors = {}; // Объект для хранения ошибок валидации формы
	preview: Item | null = null; // Изменяем тип на Item
	// Конструктор, принимающий объект событий
	constructor(protected events: IEvents) {}

	// Преобразует данные с сервера в формат приложения
	populateInventory(items: Item[]): void {
		this.inventory = items; // Заполняем массив inventory данными товаров, полученными с сервера
		this.events.emit('items:change', items);
	}

	// Добавляет товар в корзину
	addToCart(value: Item): void {
		this.cart.push(value); // Добавляем товар в массив корзины
		this.events.emit('basket:change', value);
	}

	// Проверяем, находится ли продукт в корзине
	isItemInCart(item: Item): boolean {
		return this.cart.some((cartItem) => cartItem.id === item.id); // Проверяем наличие товара по его ID
	}

	// Удаляет товар из корзины по ID
	removeFromCart(id: string): void {
		this.cart = this.cart.filter((item) => item.id !== id); // Фильтруем массив, исключая товар с указанным ID
		this.updateOrderItems(); // Обновляем информацию о заказе после изменения корзины
		this.events.emit('basket:change'); // Эмитируем событие изменения корзины
	}

	// Очищает корзину полностью
	clearCart(): void {
		this.cart = []; // Присваиваем пустой массив корзины
		this.events.emit('basket:change');
	}

	// Обновляем информацию о заказе
	updateOrderItems() {
		this.orderInfo.items = this.cart.map((item) => item.id); // Заполняем массив ID товаров в заказе
		this.orderInfo.total = this.calculateTotalCartCost(); // Вычисляем общую сумму заказа
	}

	// Возвращает количество товаров в корзине
	getCartItemCount(): number {
		return this.cart.length; // Возвращаем количество товаров в массиве корзины
	}

	// Вычисляет общую стоимость товаров в корзине
	calculateTotalCartCost(): number {
		return this.cart.reduce((total, item) => total + (item.price || 0), 0); // Суммируем цены всех товаров в корзине
	}

	// Устанавливаем превью продукта
	setPreview(item: Item) {
		this.preview = item; // Устанавливаем текущее превью продукта
		this.events.emit('preview:change', item); // Эмитируем событие изменения превью, чтобы уведомить слушателей об обновлении
	}

	// Обновляет поля email, phoneNumber, address и payment в orderInfo
	updateOrderField(field: keyof OrderFormInterface, value: string): void {
		if (field === 'payment') {
			// Проверяем, обновляется ли метод оплаты
			const validPayments = Object.keys(paymentMapping) as PaymentMethod[]; // Получаем список допустимых методов оплаты
			if (validPayments.includes(value as PaymentMethod)) {
				// Проверяем, является ли введенный метод допустимым
				this.orderInfo[field] = value as PaymentMethod; // Устанавливаем значение для метода оплаты
			} else {
				const errorMessage = 'Недопустимый метод оплаты'; // Сообщение об ошибке
				handleError(errorMessage); // Обработка ошибки
				throw new Error(errorMessage); // Генерация исключения
			}
		} else {
			this.orderInfo[field] = value; // Устанавливаем значение для остальных полей
		}
	}

	// Отдельные методы для валидации полей

	// Проверяет корректность email
	validateEmail(email: string): string | null {
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/;
		if (!email) {
			return 'Email не может быть пустым';
		}
		if (!emailRegex.test(email)) {
			return 'Некорректный формат email. Пример: example@example.com';
		}
		return null;
	}

	// Проверяет корректность телефона
	validatePhone(phone: string): string | null {
		const phoneRegex =
			/^\+?[0-9]{1,3}[-\s]?\(?[0-9]{3}\)?[-\s]?[0-9]{3}[-\s]?[0-9]{2}[-\s]?[0-9]{2}$/;
		if (!phone) {
			return 'Телефон не может быть пустым';
		}
		if (!phoneRegex.test(phone)) {
			return 'Некорректный формат телефона. Пример: +7 (123) 456-78-90';
		}
		return null;
	}

	// Проверяет корректность адреса
	validateAddress(address: string): string | null {
		if (!address || address.trim() === '') {
			return 'Адрес не может быть пустым';
		}
		if (address.trim().length < 10) {
			return 'Адрес должен содержать не менее 10 символов';
		}
		return null;
	}

	// Проверяет корректность метода оплаты
	validatePayment(payment: string): string | null {
		const validPayments = Object.keys(paymentMapping);
		if (!validPayments.includes(payment)) {
			return 'Выберите корректный метод оплаты';
		}
		return null;
	}

	// Обновленный метод валидации контактной информации с использованием новых методов
	validateContactInfo(): boolean {
		const errors: ValidationErrors = {};

		// Используем отдельные методы валидации для каждого поля
		const emailError = this.validateEmail(this.orderInfo.email);
		if (emailError) {
			errors.email = emailError;
		}

		const phoneError = this.validatePhone(this.orderInfo.phone);
		if (phoneError) {
			errors.phone = phoneError;
		}

		const addressError = this.validateAddress(this.orderInfo.address);
		if (addressError) {
			errors.address = addressError;
		}

		const paymentError = this.validatePayment(this.orderInfo.payment);
		if (paymentError) {
			errors.payment = paymentError;
		}

		this.formValidationErrors = errors;
		return Object.keys(errors).length === 0;
	}

	// Сбрасывает orderInfo после завершения покупки
	resetOrderInfo(): boolean {
		this.orderInfo = {
			// Сбрасываем orderInfo к начальному состоянию
			email: '', // Пустой email
			phone: '', // Пустой номер телефона
			address: '', // Пустой адрес
			payment: 'card', // Метод оплаты по умолчанию
			items: [], // Пустой массив товаров
			total: 0, // Общая стоимость заказа равна 0
		};
		this.clearCart(); // Очищаем корзину после завершения покупки
		this.updateOrderField;
		return true; // Возвращаем true, указывая на успешное сброс
	}

	// Проверяет корректность деталей заказа
	validateOrderInfo(): boolean {
		return this.validateContactInfo(); // Вызываем метод validateContactInfo для проверки контактной информации
	}

	// Сбрасывает поле isSelected у всех товаров после покупки
	resetSelection(): void {
		this.inventory.forEach((item) => {
			item.selected = false; // Устанавливаем поле selected в false для каждого товара в inventory
		});
	}
}
