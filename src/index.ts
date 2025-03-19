// Импорт необходимых модулей и компонентов
import { ApplicationApi } from './components/ApplicationApi'; // Модуль для работы с API
import { EventEmitter } from './components/base/events'; // Модуль для управления событиями
import { Page } from './components/view/specific/page'; // Компонент страницы
import { Modal } from './components/view/common/modal'; // Компонент модального окна
import { Card } from './components/view/specific/card'; // Компоненты карточки товара
import { ApplicationState } from './components/model/ApplicationState'; // Состояние приложения
import { ensureElement, cloneTemplate, handleError } from './utils/utils'; // Утилиты для работы с элементами и шаблонами
import { Item, OrderFormInterface } from './types'; // Типы данных для API и заказов
import { API_URL, CDN_URL } from './utils/constants'; // Константы для API и CDN
import './scss/styles.scss'; // Импорт стилей
import { Cart } from './components/view/common/cart'; // Компонент корзины
import { OrderForm } from './components/view/specific/orderForm'; // Компонент формы заказа
import { UserInfo } from './components/view/specific/userInfo'; // Компонент информации о пользователе
import { Success } from './components/view/common/succes'; // Компонент успешного завершения

// Создание экземпляров необходимых классов
const applicationApi = new ApplicationApi(CDN_URL, API_URL); // Экземпляр для работы с API
const events = new EventEmitter(); // Экземпляр для управления событиями
const applicationState = new ApplicationState(events);

// Убедитесь, что передаете строку в ensureElement
// Получение шаблонов из HTML документа
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog'); // Шаблон каталога карточек
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview'); // Шаблон превью карточки
//const basketTemplate = ensureElement<HTMLTemplateElement>('#basket'); // Шаблон корзины
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket'); // Шаблон карточки в корзине
const orderTemplate = ensureElement<HTMLTemplateElement>('#order'); // Шаблон формы заказа
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts'); // Шаблон контактов
const successTemplate = ensureElement<HTMLTemplateElement>('#success'); // Шаблон успешного завершения
const modalContainer = ensureElement<HTMLElement>('#modal-container'); // Контейнер для модального окна

// Создание экземпляров компонентов с правильными типами
const page = new Page(document.body, events); // Экземпляр страницы
const modal = new Modal(modalContainer, events); // Экземпляр модального окна
const basket = new Cart(events); // Экземпляр корзины
const orderForm = new OrderForm('order', cloneTemplate(orderTemplate), events); // Экземпляр формы заказа
const contacts = new UserInfo(cloneTemplate(contactsTemplate), events); // Экземпляр информации о пользователе

// Получение списка продуктов и установка их на страницу
applicationApi
	.getProductList() // Запрос списка продуктов
	.then((items) => applicationState.populateInventory(items)) // Установка полученных продуктов на страницу
	.catch((e) => console.warn(e)); // Логирование ошибок, если они возникли

// Обработчики событий для открытия и закрытия модального окна
events.on('modal:open', () => {
	page.locked = true; // Блокируем страницу, чтобы предотвратить взаимодействие с ней, когда модальное окно открыто
});

events.on('modal:close', () => {
	page.locked = false; // Разблокируем страницу, чтобы пользователь мог снова взаимодействовать с ней, когда модальное окно закрыто
});

// Обработчик события выбора карточки
events.on('card:select', (item: Item) => {
	applicationState.setPreview(item); // Устанавливаем выбранный товар в качестве предварительного просмотра в корзине
});

// Обработчик изменения элементов в корзине
events.on('items:change', (items: Item[]) => {
	page.gallery = items.map((item) => {
		// Создаем карточку товара для каждого элемента в корзине
		const card = new Card('card', cloneTemplate(cardCatalogTemplate), {
			// Обработчик клика по карточке, который вызывает событие выбора карточки
			onClick: () => events.emit('card:select', item),
		});

		return card.render(item); // Возвращаем отрисованную карточку товара
	});
});

// Обработчик изменения превью карточки товара
events.on('preview:change', (item: Item) => {
	const isInCart = applicationState.isItemInCart(item); // Проверяем, находится ли товар уже в корзине

	const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
		// Обработчик клика по карточке в превью
		onClick: () => {
			if (isInCart) {
				applicationState.removeFromCart(item.id); // Удаляем товар из корзины, если он уже там
			} else {
				applicationState.addToCart(item); // Добавляем товар в корзину, если его там нет
			}
			// Обновляем текст кнопки в зависимости от состояния товара в корзине
			card.button = isInCart ? 'В корзину' : 'Удалить из корзины';
		},
	});
	//applicationState.updateOrderField;
	// Устанавливаем текст кнопки при инициализации в зависимости от состояния товара в корзине
	card.button = isInCart ? 'Удалить из корзины' : 'В корзину';
	modal.render({
		content: card.render(item), // Отрисовываем карточку товара в модальном окне
	});
	modal.open(); // Открываем модальное окно с карточкой товара
});

// Подписываемся на событие изменения корзины
events.on('basket:change', () => {
	// Обновляем счетчик на странице, устанавливая его равным количеству товаров в корзине
	page.counter = applicationState.getCartItemCount();
	//applicationState.updateOrderField;

	// Обновляем массив карточек в корзине, используя метод reduce
	basket.items = applicationState.cart.reduce((acc, cartItem) => {
		// Находим элемент в списке товаров по ID из корзины
		const item = applicationState.inventory.find(
			(item) => item.id === cartItem.id
		);

		// Проверяем, найден ли элемент
		if (item) {
			// Если элемент найден
			// Создаем новую карточку для элемента с обработчиком события нажатия
			const card = new Card('card', cloneTemplate(cardPreviewTemplate), {
				onClick: () => applicationState.removeFromCart(item.id), // Удаляем элемент из корзины при клике
			});

			// Добавляем отрендеренную карточку в аккумулятор
			acc.push(card.render(item));
		}

		// Возвращаем аккумулятор для следующей итерации
		return acc;
	}, []); // Начинаем с пустого массива для аккумулятора

	// Обновляем общую сумму заказа в корзине

	basket.total = applicationState.orderInfo.total;
});

// Обработка события открытия корзины
events.on('basket:open', () => {
	// Отображаем содержимое корзины в модальном окне
	//basket.items = applicationState.cart;

	modal.render({ content: basket.render() });
	modal.open(); // Открываем модальное окно
});

// Обработка события открытия формы заказа
events.on('order:open', () => {
	// Отображаем форму заказа в модальном окне с начальными параметрами
	modal.render({
		content: orderForm.render({
			payment: 'card', // Устанавливаем способ оплаты по умолчанию
			address: '', // Изначально адрес пустой
			valid: false, // Форма невалидна по умолчанию
			errors: [], // Изначально ошибок нет
		}),
	});
	modal.open(); // Открываем модальное окно
});
// Подписка на события изменения полей формы заказа
events.on(
	/^order\..*:change/, // Регулярное выражение для отслеживания событий изменения полей, начинающихся с "order."
	(data: { field: keyof OrderFormInterface; value: string }) => {
		// Обновление поля заказа в обработчике корзины с использованием полученного значения
		applicationState.updateOrderField(data.field, data.value);
	}
);

// Подписка на события изменения полей контактной информации
events.on(
	/^contacts\..*:change/, // Регулярное выражение для отслеживания событий изменения полей, начинающихся с "contacts."
	(data: { field: keyof OrderFormInterface; value: string }) => {
		// Обновление поля заказа в обработчике корзины с использованием полученного значения
		applicationState.updateOrderField(data.field, data.value);
	}
);

// Подписка на события изменения ошибок формы
events.on('formErrors:change', (errors: Partial<OrderFormInterface>) => {
	const { payment, address, email, phone } = errors;

	// Проверка валидности полей заказа
	orderForm.valid = !payment && !address;

	// Обработка ошибок для полей заказа
	if (payment) {
		handleError(`Ошибка в поле "Оплата": ${payment}`); // Логирование ошибки для поля "Оплата"
	}
	if (address) {
		handleError(`Ошибка в поле "Адрес": ${address}`); // Логирование ошибки для поля "Адрес"
	}

	// Проверка валидности контактной информации
	contacts.valid = !email && !phone;

	// Обработка ошибок для контактных данных
	if (email) {
		handleError(`Ошибка в поле "Электронная почта": ${email}`); // Логирование ошибки для поля "Электронная почта"
	}
	if (phone) {
		handleError(`Ошибка в поле "Телефон": ${phone}`); // Логирование ошибки для поля "Телефон"
	}
});
// Обработка события отправки заказа
events.on('order:submit', () => {
	// Отображение модального окна с контактной информацией
	// Инициализация полей телефона и email пустыми значениями
	modal.render({
		content: contacts.render({
			phone: '', // Пустое значение для телефона
			email: '', // Пустое значение для email
			valid: false, // Флаг валидности данных (по умолчанию false)
			errors: [], // Массив для хранения ошибок (по умолчанию пустой)
		}),
	});
});

// Обработка события отправки контактной информации
events.on('contacts:submit', async () => {
	// Отправка заказа с информацией из корзины
	applicationApi
		.orderProducts(applicationState.orderInfo)
		.then(() => {
			// Создание и отображение успешного сообщения
			const success = new Success(cloneTemplate(successTemplate), {
				// Обработчик события клика для закрытия модального окна
				onClick: () => {
					modal.close(); // Закрытие модального окна при клике
				},
			});

			// Очистка содержимого корзины после успешной отправки заказа
			applicationState.clearCart();
			// Эмитирование события изменения состояния корзины
			events.emit('');

			// Отображение успешного сообщения в модальном окне
			modal.render({
				content: success.render({ total: applicationState.orderInfo.total }), // Передача общей суммы заказа
			});
			modal.open(); // Открытие модального окна для отображения сообщения
		})
		.catch((err) => {
			// Обработка ошибок при отправке заказа
			const errorMessage =
				'Произошла ошибка при отправке заказа. Пожалуйста, попробуйте еще раз.'; // Сообщение об ошибке
			handleError(errorMessage); // Вызов функции для обработки ошибки
			alert(errorMessage); // Уведомление пользователя об ошибке через всплывающее окно
		});
});
