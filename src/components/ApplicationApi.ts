// Импортируем базовый класс Api и необходимые типы из других файлов
import { Api } from './base/api';
import { ApiResponse, Item, OrderInterface, OrderResponse } from '../types';

// Определяем класс AApplicationApi, который наследуется от класса Api
export class ApplicationApi extends Api {
	readonly cdn: string; // Переменная для хранения базового URL для изображений

	// Конструктор класса принимает URL для CDN, базовый URL API и опциональные параметры запроса
	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options); // Вызываем конструктор родительского класса
		this.cdn = cdn; // Инициализируем переменную cdn
	}

	getProductList(): Promise<Item[]> {
		return this.get('/product') // Выполняем GET-запрос к API для получения списка продуктов
			.then((data: ApiResponse) => {
				return data.items.map((item) => ({
					...item, // Копируем все свойства товара
					image: /*this.cdn + */ item.image, // Формируем полный URL для изображения, добавляя cdn к пути
				}));
			});
	}

	// Метод для получения конкретного продукта по его ID
	getProductItem(id: string): Promise<Item> {
		return this.get(`/product/${id}`) // Выполняем GET-запрос к API для получения продукта по ID
			.then((item: Item) => ({
				...item, // Копируем все свойства продукта
				image: /*this.cdn +*/ item.image, // Формируем полный URL для изображения
			}));
	}

	// Метод для оформления заказа продуктов
	orderProducts(order: OrderInterface): Promise<OrderResponse> {
		return this.post('/order', order) // Выполняем POST-запрос к API для оформления заказа
			.then((data: OrderResponse) => data); // Возвращаем результат заказа
	}
}
