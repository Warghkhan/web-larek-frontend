import { IEvents } from '../components/base/events'; // Импортируем интерфейс событий
import {
	Categories,
	Item,
	OrderFormInterface,
	PaymentMethod,
	ValidationErrors,
	OrderInterface,
} from '../types'; // Импортируем необходимые типы из определенных типов
import { paymentMapping } from './constants'; // Импортируем маппинг методов оплаты
import { handleError } from './utils'; // Импортируем функцию для обработки ошибок

// Класс CartHandler управляет корзиной покупок и информацией о заказе
export class CartHandler {
	// Массив для хранения всех доступных товаров
	items: Item[] = [];
	// Массив для хранения товаров в корзине
	cart: Item[] = [];
	// Объект для хранения информации о заказе
	orderInfo: OrderInterface = {
		email: '',
		phone: '',
		address: '',
		payment: 'card', // Метод оплаты по умолчанию
		items: [],
		total: 0, // Общая сумма заказа
	};
	// Объект для хранения ошибок валидации формы
	formValidationErrors: ValidationErrors = {};
	// Переменная для хранения текущего превью продукта
	preview: Item | null = null; // Изменяем тип на Item

	// Конструктор, принимающий объект событий
	constructor(protected events: IEvents) {}

	// Устанавливаем список продуктов
	setItems(items: Item[]) {
		this.items = items; // Сохраняем переданные товары в массив items
	}

	// Добавляем продукт в корзину
	addToCart(item: Item) {
		this.cart.push(item); // Добавляем товар в корзину
		this.updateOrderItems(); // Обновляем информацию о заказе
	}

	// Проверяем, находится ли продукт в корзине
	isItemInCart(item: Item): boolean {
		return this.cart.some((cartItem) => cartItem.id === item.id); // Проверяем наличие товара по его ID
	}

	// Удаляем продукт из корзины
	removeFromCart(id: string) {
		this.cart = this.cart.filter((item) => item.id !== id); // Фильтруем корзину, исключая товар с указанным ID
		this.updateOrderItems(); // Обновляем информацию о заказе
	}

	// Очищаем корзину
	clearCart() {
		this.cart = []; // Устанавливаем корзину как пустую
		this.updateOrderItems(); // Обновляем информацию о заказе
	}

	// Обновляем информацию о заказе
	updateOrderItems() {
		this.orderInfo.items = this.cart.map((item) => item.id); // Заполняем массив ID товаров в заказе
		this.orderInfo.total = this.calculateTotalCartCost(); // Вычисляем общую сумму заказа
	}

	// Вычисляем общую стоимость товаров в корзине
	calculateTotalCartCost(): number {
		return this.cart.reduce((total, item) => total + (item.price || 0), 0); // Суммируем стоимость всех товаров в корзине
	}

	// Обновляем поля заказа
	updateOrderField(field: keyof OrderFormInterface, value: string) {
    if (field === 'payment') {
        if (value in paymentMapping) {
            this.orderInfo[field] = value as PaymentMethod; // Устанавливаем метод оплаты, если он корректен
        } else {
            handleError('Некорректный метод оплаты'); // Обрабатываем ошибку, если метод оплаты некорректен
        }
    } else {
        this.orderInfo[field] = value; // Обновляем другие поля заказа
    }
}

	// Проверяем корректность контактной информации
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

	// Сбрасываем информацию о заказе до значений по умолчанию
	resetOrderInfo() {
		this.orderInfo = {
			email: '', // Сбрасываем email
			phone: '', // Сбрасываем телефон
			address: '', // Сбрасываем адрес
			payment: 'card', // Сбрасываем метод оплаты на 'card'
			items: [], // Очищаем список товаров в заказе
			total: 0, // Сбрасываем общую сумму на 0
		};
	}

	// Преобразуем данные с сервера в формат приложения
	populateInventory(items: Item[]) {
		this.items = items; // Заполняем массив доступных товаров данными, полученными с сервера
	}

	// Устанавливаем превью продукта
	setPreview(item: Item) {
		this.preview = item; // Устанавливаем текущее превью продукта
		this.events.emit('preview:change', item); // Эмитируем событие изменения превью, чтобы уведомить слушателей об обновлении
	}
}
