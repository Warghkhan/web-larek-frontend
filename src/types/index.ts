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
export type PaymentMethod =
	| 'карта'
	| 'наличные'
	| 'платежная система'
	| 'криптовалюта'
	| 'бартер'
	| 'крышки'
	| 'иное';

// Сопоставление методов оплаты с их строковыми представлениями
export type PaymentMapping = {
	[Key in PaymentMethod]: string;
};

// Ответ API, содержащий массив элементов
export interface ApiResponse {
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

/*
Интерфейс для описания контактной информации пользователя.
Адрес доставки не включен в этот интерфейс, так как он может варьироваться в зависимости от текущих пожеланий пользователя.
*/
export interface UserContactInfo {
	// Электронная почта пользователя
	email: string;
	// Номер телефона пользователя
	phoneNumber: string;
}

/*
Интерфейс для описания атрибутов заказа товара.
Наследует контактную информацию пользователя и включает детали, специфичные для заказа.
*/
export interface Order extends UserContactInfo {
	// Массив идентификаторов купленных товаров
	items: string[];
	// Метод оплаты для заказа
	paymentMethod: PaymentMethod;
	// Общая стоимость заказа в валюте
	totalCost: number;
	// Адрес доставки для заказа (может отличаться от контактной информации)
	deliveryAddress: string;
}

/*
Интерфейс для описания формы заказа.
Наследует контактную информацию пользователя и содержит поля для метода оплаты и адреса доставки.
*/
export interface OrderForm extends UserContactInfo {
	// Метод оплаты для заказа
	paymentMethod: PaymentMethod;
	// Адрес доставки для заказа
	deliveryAddress: string;
}

/*
Интерфейс для определения свойств товара в магазине
*/
export interface Item {
	// ID товара
	idItem: string;
	// название товара
	titleItem: string;
	// ссылка на картинку товара
	imageItem: string;
	// описание товара
	descriptionItem: string;
	// категория товара
	categoryItem: Categories;
	// цена товара
	costItem: number;
	// выбран ли товар
	isItemSelected: boolean;
}
