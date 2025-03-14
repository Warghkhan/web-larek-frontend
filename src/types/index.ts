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
export type ValidationErrors = Partial<
	Record<keyof OrderFormInterface, string>
>;

// Доступные методы оплаты
export type PaymentMethod = 'card' | 'cash' | 'other';

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

// Интерфейс для обработки ошибок
export interface ErrorResponse {
	// Сообщение об ошибке
	error: string;
}

// Интерфейс Action с обработчиком события клика.
export interface Action {
	// Обработчик клика, который будет вызван при нажатии на элемент.
	onClick: (event: MouseEvent) => void;
}

/*
Интерфейс для описания внутреннего состояния приложения
Хранит информацию о карточках, корзине, заказах пользователей и ошибках
при заполнении форм и содержит методы для управления карточками и корзиной
*/
export interface ApplicationStateInterface {
	// Хранит массив карточек товара
	inventory: Item[];
	// Содержит товары в корзине
	cart: Item[];
	// Содержит информацию о заказе
	orderInfo: OrderInterface;
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
	updateOrderField(field: keyof OrderFormInterface, value: string): void;
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
export interface OrderFormInterface {
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
export interface OrderInterface extends OrderFormInterface {
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

/*
Интерфейс для определения свойств товара в магазине
*/
export interface Item {
	selected: boolean;
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
	price: number | null;
}

/*
Интерфейс для компонента page
*/
export interface PageInterface {
	// счетчик корзины
	counter: number;
	// массив товаров
	gallery: HTMLElement[];
	// блокировка прокрутки страницы
	locked: boolean;
}

/*
Интерфейс для компонента modal
*/
export interface ModalInterface {
	// показываемое содержимое
	content: HTMLElement;
}

/*
Интерфейс для компонента cart
*/
export interface CartInterface {
	// Массив товаров в корзине
	items: string[];
	// Общая стоимость
	total: number;
}

/*
Интерфейс для компонента form
*/
export interface FormInterface {
	// Указывает, является ли форма валидной.
	valid: boolean;
	// Список ошибок валидации, если таковые имеются.
	errors: string[];
}

// Интерфейс CardInterface представляет собой структуру данных для карточки товара
export interface CardInterface {
	id: string; // Уникальный идентификатор карточки, который позволяет различать разные карточки.
	title: string; // Заголовок карточки, который обычно отображает название товара.
	category: string; // Категория, к которой относится карточка, что помогает в организации и фильтрации карточек.
	description: string; // Описание карточки, предоставляющее дополнительную информацию о товаре.
	image: string; // URL или путь к изображению, которое будет отображаться на карточке.
	price: number | null; // Цена товара; может быть числом или null, если цена не указана.
	selected: boolean; // Флаг, указывающий, выбрана ли карточка пользователем (например, для добавления в корзину).
}
