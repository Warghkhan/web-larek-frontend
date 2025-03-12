/*
Тип для описания категорий
 */
export type Categories =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

// Сопоставление категорий, где ключи - это категории, а значения - строки
export type CategoryMapping = {
	[Key in Categories]: string;
};

// Ошибки валидации, представленные как частичное сопоставление полей формы заказа с сообщениями об ошибках
export type ValidationErrors = Partial<Record<keyof OrderForm, string>>;

// Доступные методы оплаты
export type PaymentMethod = 'online' | 'offline' | 'other';

// Сопоставление методов оплаты с их строковыми представлениями
export type PaymentMapping = {
	[Key in PaymentMethod]: string;
};

// Ответ API, содержащий массив элементов
export interface ApiResponse {
	// общее количество элементов
	total: number; 
	// массив всех элементов
	items: Item[];
}

/*
Интерфейс для описания внутреннего состояния приложения
Хранит информацию о карточках, корзине, заказах пользователей и ошибках
при заполнении форм и содержит методы для управления карточками и корзиной
*/
export interface ApplicationState {
	// Хранит массив карточек товара
	inventory: Item[];
	// Содержит товары в корзине
	cart: Item[];
	// Содержит информацию о заказе
	orderInfo: Order;
	// Содержит ошибки валидации, возникающие при заполнении форм
	formValidationErrors: ValidationErrors;
	// Возвращает количество товаров в корзине
	getCartItemCount(): number;
	// Вычисляет общую стоимость товаров в корзине
	calculateTotalCartCost(): number;
	// Добавляет товар в корзину
	addToCart(value: Item): void;
	// Удаляет товар из корзины по ID
	removeFromCart(id: string): void;
	// Очищает корзину полностью
	clearCart(): void;
	// Добавляет ID товаров в поле items для orderInfo
	setOrderItems(): void;
	// Обновляет поля email, phoneNumber, address и payment в orderInfo
	updateOrderField(field: keyof OrderForm, value: string): void;
	// Проверяет корректность контактной информации
	validateContactInfo(): boolean;
	// Проверяет корректность деталей заказа
	validateOrderInfo(): boolean;
	// Сбрасывает orderInfo после завершения покупки
	resetOrderInfo(): boolean;
	// Преобразует данные с сервера в формат приложения
	populateInventory(items: Item[]): void;
	// Сбрасывает поле isSelected у всех товаров после покупки
	resetSelection(): void;
}

// Интерфейс для формы заказа
export interface OrderForm {
	// Электронная почта пользователя
	email: string;
	// Номер телефона пользователя
	phone: string;
	// Адрес доставки для заказа
	address: string;
	// Метод оплаты для заказа
	payment: PaymentMethod;
}

// Интерфейс для заказа
export interface Order extends OrderForm {
	// Массив идентификаторов купленных товаров
	items: string[];
	// Общая стоимость заказа в валюте
	total: number;
}

// Интерфейс для успешного ответа при оформлении заказа
export interface OrderResponse {
	// Уникальный идентификатор заказа
	id: string;
	// Общая стоимость заказа
	total: number;
}

// Интерфейс для обработки ошибок
export interface ErrorResponse {
	// Сообщение об ошибке
	error: string;
}

/*
Интерфейс для определения свойств товара в магазине
*/
export interface Item {
	// ID товара
	id: string; 
	// название товара
	title: string; 
	// ссылка на картинку товара
	image: string; 
	// описание товара
	description: string; 
	// категория товара
	category: Categories; 
	// цена товара
	price: number | null; // изменено с costItem на price
}
