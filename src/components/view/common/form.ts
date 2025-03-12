import { FormInterface } from '../../../types'; // Импортируем интерфейс FormInterface для определения структуры корзины.
import { View } from '../../base/component'; // Импортируем базовый класс View для создания страницы корзины.
import { ensureElement } from '../../../utils/utils'; // Импортируем утилиты для безопасного получения элементов DOM.
import { IEvents } from '../../base/events'; // Импортируем интерфейс для управления событиями.

export class Form<T> extends View<FormInterface> {
	protected _submit: HTMLButtonElement; // Кнопка отправки формы.
	protected _errors: HTMLElement; // Элемент для отображения ошибок валидации.

	constructor(protected container: HTMLFormElement, protected events: IEvents) {
		super(container, events); // Вызываем конструктор родительского класса View.

		// Ищем кнопку отправки формы в контейнере и сохраняем ссылку на нее.
		this._submit = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);

		// Ищем элемент для отображения ошибок валидации в контейнере.
		this._errors = ensureElement<HTMLElement>('.form__errors', this.container);

		// Добавляем обработчик события input для отслеживания изменений в полях формы.
		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement; // Получаем элемент, вызвавший событие.
			const field = target.name as keyof T; // Получаем имя поля из атрибута name.
			const value = target.value; // Получаем текущее значение поля.
			this.onInputChange(field, value); // Вызываем метод для обработки изменения.
		});

		// Добавляем обработчик события submit для отправки формы.
		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault(); // Предотвращаем стандартное поведение отправки формы.
			this.events.emit(`${this.container.name}:submit`); // Излучаем событие отправки формы.
		});
	}

	// Метод для обработки изменений в полях формы.
	protected onInputChange(field: keyof T, value: string) {
		this.events.emit(`${this.container.name}.${String(field)}:change`, {
			field,
			value,
		}); // Излучаем событие об изменении поля.
	}

	// Сеттер для свойства valid, который включает или отключает кнопку отправки.
	set valid(value: boolean) {
		this._submit.disabled = !value; // Деактивируем кнопку, если форма не валидна.
	}

	// Сеттер для свойства errors, который обновляет текст ошибок валидации.
	set errors(value: string) {
		this.setText(this._errors, value); // Устанавливаем текст ошибок в соответствующий элемент.
	}

	// Метод для рендеринга состояния формы.
	render(state: Partial<T> & FormInterface) {
		const { valid, errors, ...inputs } = state; // Извлекаем состояние валидации и ошибки.
		super.render({ valid, errors }); // Вызываем метод рендеринга родительского класса.
		Object.assign(this, inputs); // Обновляем свойства формы на основе состояния.
		return this.container; // Возвращаем контейнер формы.
	}
}
