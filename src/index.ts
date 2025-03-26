// Импорт необходимых модулей и компонентов
import { ApplicationApi } from './components/ApplicationApi'; // Модуль для работы с API
import { EventEmitter } from './components/base/events'; // Модуль для управления событиями
import { Page } from './components/view/specific/page'; // Компонент страницы
import { Modal } from './components/view/common/modal'; // Компонент модального окна
import { Product, ProductPreview } from './components/view/specific/card'; // Компоненты карточки товара
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
		const card = new ProductPreview(cloneTemplate(cardCatalogTemplate), {
			// Обработчик клика по карточке, который вызывает событие выбора карточки
			onClick: () => events.emit('card:select', item),
		});

		return card.render(item); // Возвращаем отрисованную карточку товара
	});
});

// Обработчик изменения превью карточки товара
events.on('preview:change', (item: Item) => {
	const isInCart = applicationState.isItemInCart(item); // Проверяем, находится ли товар уже в корзине
	const card = new ProductPreview(cloneTemplate(cardPreviewTemplate), {
		// Обработчик клика по кнопке в превью
		onClick: () => {
			if (isInCart) {
				applicationState.removeFromCart(item.id); // Удаляем товар из корзины, если он уже там
				card.button = 'В корзину'; // Обновляем текст кнопки
			} else {
				applicationState.addToCart(item); // Добавляем товар в корзину, если его там нет
				card.button = 'Удалить из корзины'; // Обновляем текст кнопки
			}
			applicationState.setPreview(item);
		},
	});

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

	// Обновляем данные заказа
	applicationState.updateOrderItems();

	// Обновляем массив карточек в корзине, используя метод reduce
	basket.items = applicationState.cart.reduce((acc, cartItem) => {
		// Находим элемент в списке товаров по ID из корзины
		const item = applicationState.inventory.find(
			(item) => item.id === cartItem.id
		);

		// Проверяем, найден ли элемент
		if (item) {
			// Если элемент найден
			// Создаем новую карточку для элемента с обработчиком события нажатия  cardPreviewTemplate
			const card = new Product(cloneTemplate(cardBasketTemplate), {
				// Обработчик нажатия на кнопку удаления
				onClick: () => {
					applicationState.removeFromCart(item.id); // Удаляем элемент из корзины при клике
					// После удаления сразу обновляем общую стоимость в корзине
					basket.total = applicationState.calculateTotalCartCost();
				},
			});

			// Добавляем отрендеренную карточку в аккумулятор
			acc.push(card.render(item));
		}

		// Возвращаем аккумулятор для следующей итерации
		return acc;
	}, []); // Начинаем с пустого массива для аккумулятора

	// Обновляем общую сумму заказа в корзине
	basket.total = applicationState.calculateTotalCartCost();
});

// Обработка события открытия корзины
events.on('basket:open', () => {
	// Отображаем содержимое корзины в модальном окне
	modal.render({ content: basket.render() });
	modal.open(); // Открываем модальное окно
});

// Обработка события открытия формы заказа
events.on('order:open', () => {
	// Проверяем валидность адреса
	const addressValid =
		!applicationState.validateAddress(applicationState.orderInfo.address) &&
		!applicationState.validatePayment(applicationState.orderInfo.payment);

	// Отображаем форму заказа в модальном окне с начальными параметрами
	modal.render({
		content: orderForm.render({
			payment: applicationState.orderInfo.payment, // Устанавливаем текущий способ оплаты
			address: applicationState.orderInfo.address, // Используем имеющийся адрес
			valid: addressValid, // Форма валидна, если адрес корректен
			errors: '', // Изначально ошибок нет
		}),
	});

	// Принудительно проверяем валидность в следующем цикле событий
	setTimeout(() => {
		const addressValid = !applicationState.validateAddress(
			applicationState.orderInfo.address
		);
		orderForm.valid = addressValid;
		//console.log('Обновили валидность формы заказа:', addressValid);
	}, 100);

	modal.open(); // Открываем модальное окно
});

// Подписка на события изменения полей формы заказа
events.on(
	/^order\..*:change/, // Регулярное выражение для отслеживания событий изменения полей, начинающихся с "order."
	(data: { field: keyof OrderFormInterface; value: string }) => {
		// Обновление поля заказа в обработчике корзины с использованием полученного значения
		applicationState.updateOrderField(data.field, data.value);

		// Валидация поля в зависимости от его типа
		let error = null;
		if (data.field === 'address') {
			error = applicationState.validateAddress(data.value);
			// Активируем кнопку только если адрес заполнен и валиден
			orderForm.valid = !error && data.value.length >= 10;
		} else if (data.field === 'payment') {
			error = applicationState.validatePayment(data.value);
		}
		// Обновление сообщения об ошибке
		if (error) {
			orderForm.errors = error;
		} else {
			orderForm.errors = '';
		}
	}
);

// Подписка на события изменения полей контактной информации
events.on(
	/^contacts\..*:change/, // Регулярное выражение для отслеживания событий изменения полей, начинающихся с "contacts."
	(data: { field: keyof OrderFormInterface; value: string }) => {
		// Обновление поля заказа в обработчике корзины с использованием полученного значения
		applicationState.updateOrderField(data.field, data.value);

		// Валидация поля в зависимости от его типа
		let error = null;
		if (data.field === 'email') {
			error = applicationState.validateEmail(data.value);
		} else if (data.field === 'phone') {
			error = applicationState.validatePhone(data.value);
		}

		// Валидация всей формы контактов
		const emailValid = !applicationState.validateEmail(
			applicationState.orderInfo.email
		);
		const phoneValid = !applicationState.validatePhone(
			applicationState.orderInfo.phone
		);

		// Обновление валидности формы
		contacts.valid = emailValid && phoneValid;

		// Отображение ошибок, если они есть
		if (error) {
			contacts.errors = error;
		} else {
			contacts.errors = '';
		}
	}
);

// Подписка на события изменения ошибок формы
events.on('formErrors:change', (errors: Partial<OrderFormInterface>) => {
	const { payment, address, email, phone } = errors;

	// Проверка валидности полей заказа
	orderForm.valid =
		!payment && !address && !!applicationState.orderInfo.address;

	// Обработка ошибок для полей заказа
	if (payment) {
		handleError(`Ошибка в поле "Оплата": ${payment}`); // Логирование ошибки для поля "Оплата"
	}
	if (address) {
		handleError(`Ошибка в поле "Адрес": ${address}`); // Логирование ошибки для поля "Адрес"
	}

	// Проверка валидности контактной информации
	contacts.valid =
		!email &&
		!phone &&
		!!applicationState.orderInfo.email &&
		!!applicationState.orderInfo.phone;

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
	// Проверяем валидность email и phone
	const emailValid = !applicationState.validateEmail(
		applicationState.orderInfo.email
	);
	const phoneValid = !applicationState.validatePhone(
		applicationState.orderInfo.phone
	);

	// Отображение модального окна с контактной информацией
	modal.render({
		content: contacts.render({
			phone: applicationState.orderInfo.phone, // Используем имеющийся телефон
			email: applicationState.orderInfo.email, // Используем имеющийся email
			valid: emailValid && phoneValid, // Форма валидна, если оба поля корректны
			errors: '', // Изначально ошибок нет
		}),
	});

	// Принудительно проверяем валидность в следующем цикле событий
	setTimeout(() => {
		const emailValid = !applicationState.validateEmail(
			applicationState.orderInfo.email
		);
		const phoneValid = !applicationState.validatePhone(
			applicationState.orderInfo.phone
		);
		contacts.valid = emailValid && phoneValid;
		/*
		console.log(
			'Обновили валидность формы контактов:',
			emailValid && phoneValid
		);
		*/
	}, 100);
});

// Обработка события отправки контактной информации
events.on('contacts:submit', async () => {
	// Отправка заказа с информацией из корзины
	//console.log(applicationState.orderInfo);

	applicationApi
		.orderProducts(applicationState.orderInfo)
		.then(() => {
			// Эмитирование события изменения состояния корзины
			events.emit('order:success');
		})
		.catch((err) => {
			// Обработка ошибок при отправке заказа
			handleError(err); // Вызов функции для обработки ошибки
			events.emit('order:error', err);
		});
});

events.on('order:success', async () => {
	// Создание и отображение успешного сообщения
	const success = new Success(cloneTemplate(successTemplate), {
		// Обработчик события клика для закрытия модального окна
		onClick: () => {
			modal.close(); // Закрытие модального окна при клике
		},
	});

	// Установка общей суммы заказа в компоненте Success
	success.total = applicationState.orderInfo.total;

	// Отображение успешного сообщения в модальном окне
	modal.render({
		content: success.render(), // Передача компонента для рендеринга
	});
	modal.open(); // Открытие модального окна для отображения сообщения
	// Очистка содержимого корзины после успешной отправки заказа
	applicationState.clearCart();
});

events.on('order:error', async (err) => {
	// Уведомление пользователя об ошибке через всплывающее окно
	alert(err);
});
