import { OrderFormInterface } from '../../../types'; // Импорт интерфейса для формы заказа
import { Form } from '../common/form'; // Импорт базового класса формы
import { IEvents } from '../../base/events'; // Импорт интерфейса событий

// Класс OrderForm, наследующий от базового класса Form
export class OrderForm extends Form<OrderFormInterface> {
	protected _card: HTMLButtonElement; // Кнопка для оплаты картой
	protected _cash: HTMLButtonElement; // Кнопка для оплаты наличными

	constructor(
		protected blockName: string, // Имя блока для использования в CSS
		container: HTMLFormElement, // Контейнер, в котором находится форма заказа
		protected events: IEvents // События, связанные с формой
	) {
		super(container, events); // Вызов конструктора родительского класса

		// Получение элементов кнопок из контейнера по их имени
		this._card = container.elements.namedItem('card') as HTMLButtonElement;
		this._cash = container.elements.namedItem('cash') as HTMLButtonElement;

		// Инициализация кнопок оплаты
		this.initPaymentButtons();
	}

	private initPaymentButtons() {
		// Инициализация кнопок оплаты с добавлением обработчиков событий
		this.setupButton(this._cash, 'cash'); // Настройка кнопки оплаты наличными
		this.setupButton(this._card, 'card'); // Настройка кнопки оплаты картой
	}

	private setupButton(button: HTMLButtonElement, paymentType: string) {
		// Метод для настройки кнопки оплаты
		if (button) {
			// Проверка, существует ли кнопка
			button.addEventListener('click', () => {
				this.toggleActiveButton(paymentType); // Переключение активного состояния кнопок
				this.onInputChange('payment', paymentType); // Обработка изменения ввода с типом платежа
			});
		}
	}

	private toggleActiveButton(activeButton: string) {
		// Метод для управления активным состоянием кнопок
		this.toggleClass(this._cash, 'button_alt-active', activeButton === 'cash'); // Активировать кнопку наличными
		this.toggleClass(this._card, 'button_alt-active', activeButton === 'card'); // Активировать кнопку картой
	}

	disableButtons() {
		// Метод для отключения активных состояний кнопок
		this.toggleActiveButton(''); // Сброс активного состояния для обеих кнопок
	}
}
