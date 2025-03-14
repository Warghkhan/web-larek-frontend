// Импорт типов CategoryMapping и PaymentMapping из файла '../types'
import { CategoryMapping, PaymentMapping } from '../types';

// Константа для базового URL API, формируется из переменной окружения API_ORIGIN
export const API_URL = `${process.env.API_ORIGIN}/api/weblarek`;

// Константа для URL контента, формируется из той же переменной окружения
export const CDN_URL = `${process.env.API_ORIGIN}/content/weblarek`;

// Объект для сопоставления категорий, соответствующий типу CategoryMapping
export const categoryMapping: CategoryMapping = {
	'софт-скил': 'card__category_soft',           // Сопоставление категории "софт-скил" с CSS классом
	'другое': 'card__category_other',               // Сопоставление категории "другое" с CSS классом
	'дополнительное': 'card__category_additional', // Сопоставление категории "дополнительное" с CSS классом
	'кнопка': 'card__category_button',              // Сопоставление категории "кнопка" с CSS классом
	'хард-скил': 'card__category_hard',            // Сопоставление категории "хард-скил" с CSS классом
};

// Объект для сопоставления методов оплаты, соответствующий типу PaymentMapping
export const paymentMapping: PaymentMapping = {
	'card': 'Онлайн',                              // Сопоставление метода оплаты "card" с текстом "Онлайн"
	'cash': 'При получении',                       // Сопоставление метода оплаты "cash" с текстом "При получении"
	'other': 'По-другому ¯\\_( ͡° ͜ʖ ͡°)_/¯',    // Сопоставление метода оплаты "other" с текстом и эмодзи
};
