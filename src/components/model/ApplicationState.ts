import {
	ApplicationStateInterface, // Интерфейс состояния приложения
	Item, // Тип для товара
	OrderInterface, // Интерфейс для информации о заказе
	OrderFormInterface, // Интерфейс для формы заказа
	ValidationErrors, // Тип для ошибок валидации
	PaymentMethod, // Тип для методов оплаты
} from '../../types'; // Импортируем необходимые типы из файлов типов

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

	// Возвращает количество товаров в корзине
	getCartItemCount(): number {
		return this.cart.length; // Возвращаем количество товаров в массиве корзины
	}

	// Вычисляет общую стоимость товаров в корзине
	calculateTotalCartCost(): number {
		return this.cart.reduce((total, item) => total + (item.price || 0), 0); // Суммируем цены всех товаров в корзине
	}

	// Добавляет товар в корзину
	addToCart(value: Item): void {
		this.cart.push(value); // Добавляем товар в массив корзины
	}

	// Удаляет товар из корзины по ID
	removeFromCart(id: string): void {
		this.cart = this.cart.filter((item) => item.id !== id); // Фильтруем массив, исключая товар с указанным ID
	}

	// Очищает корзину полностью
	clearCart(): void {
		this.cart = []; // Присваиваем пустой массив корзины
	}

	// Добавляет ID товаров в поле items для orderInfo
	setOrderItems(): void {
		this.orderInfo.items = this.cart.map((item) => item.id); // Заполняем поле items ID товаров из корзины
		this.orderInfo.total = this.calculateTotalCartCost(); // Устанавливаем общую стоимость заказа
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

	// Проверяет корректность контактной информации
	validateContactInfo(): boolean {
		const { email, phone, address } = this.orderInfo; // Деструктурируем поля email, phone и address из объекта orderInfo
		let isValid = true; // Флаг для отслеживания валидности данных
		this.formValidationErrors = {}; // Инициализируем объект для хранения ошибок валидации

		// Проверка на наличие email
		if (!email) {
			this.formValidationErrors.email = 'Email обязателен'; // Устанавливаем сообщение об ошибке, если email не указан
			isValid = false; // Устанавливаем флаг валидации в false
		}
		// Проверка на наличие номера телефона
		if (!phone) {
			this.formValidationErrors.phone = 'Номер телефона обязателен'; // Устанавливаем сообщение об ошибке, если телефон не указан
			isValid = false; // Устанавливаем флаг валидации в false
		}
		// Проверка на наличие адреса
		if (!address) {
			this.formValidationErrors.address = 'Адрес обязателен'; // Устанавливаем сообщение об ошибке, если адрес не указан
			isValid = false; // Устанавливаем флаг валидации в false
		}

		// Если есть ошибки валидации, обрабатываем их
		if (!isValid) {
			handleError(
				'Ошибки валидации: ' + JSON.stringify(this.formValidationErrors)
			); // Вызываем функцию для обработки ошибок и передаем список ошибок
		}

		return isValid; // Возвращаем результат валидации (true или false)
	}

	// Проверяет корректность деталей заказа
	validateOrderInfo(): boolean {
		return this.validateContactInfo(); // Вызываем метод validateContactInfo для проверки контактной информации
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
		return true; // Возвращаем true, указывая на успешное сброс
	}

	// Преобразует данные с сервера в формат приложения
	populateInventory(items: Item[]): void {
		this.inventory = items; // Заполняем массив inventory данными товаров, полученными с сервера
	}

	// Сбрасывает поле isSelected у всех товаров после покупки
	resetSelection(): void {
		this.inventory.forEach((item) => {
			item.selected = false; // Устанавливаем поле selected в false для каждого товара в inventory
		});
	}
}
