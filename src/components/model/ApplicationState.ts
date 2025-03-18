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
		this.events.emit('basket:change');
		this.updateOrderItems();
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

	// Проверяет корректность контактной информации
	validateContactInfo(): boolean {
		const errors: ValidationErrors = {}; // Объект для хранения ошибок валидации
		const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/; // Регулярное выражение для проверки email

		// Проверяем корректность email
		if (!this.orderInfo.email || !emailRegex.test(this.orderInfo.email)) {
			errors.email = 'Некорректный email'; // Добавляем ошибку, если email некорректен
		}
		// Проверяем наличие телефона
		if (!this.orderInfo.phone) {
			errors.phone = 'Необходимо указать телефон'; // Добавляем ошибку, если телефон не указан
		}
		// Проверяем наличие адреса
		if (!this.orderInfo.address) {
			errors.address = 'Необходимо указать адрес'; // Добавляем ошибку, если адрес не указан
		}

		this.formValidationErrors = errors; // Сохраняем ошибки валидации в объекте formValidationErrors
		return Object.keys(errors).length === 0; // Возвращаем true, если ошибок нет, иначе false
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
