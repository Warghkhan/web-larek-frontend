import { IEvents } from './events'; // Импорт интерфейса IEvents для работы с событиями

// Базовый компонент
export abstract class Component<T> {
	// Конструктор принимает контейнер для компонента
	protected constructor(protected readonly container: HTMLElement) {}

	// Переключить класс у элемента
	toggleClass(el: HTMLElement, className: string, force?: boolean) {
		// Использует метод classList.toggle для добавления или удаления класса
		el.classList.toggle(className, force);
	}

	// Установить текстовое содержимое элемента
	protected setText(el: HTMLElement | null, value: string | null) {
		if (el) {
			// Если элемент существует, устанавливаем текстовое содержимое
			el.textContent = value !== null ? String(value) : '';
		} else {
			// Логируем ошибку, если элемент некорректен
			console.log(`setText: ${el} is null or undefined. Cannot set text.`);
		}
	}

	// Установить изображение с указанным источником
	protected setImage(el: HTMLImageElement | null, src: string | null) {
		if (el) {
			if (src) {
				// Если элемент и источник существуют, устанавливаем источник изображения
				el.src = src;
			} else {
				// Логируем ошибку, если источник некорректен
				console.log('setImage: Source URL is null or empty.');
			}
		} else {
			// Логируем ошибку, если элемент некорректен
			console.log(
				'setImage: Element is null or undefined. Cannot set image source.'
			);
		}
	}

	// Установить состояние "disabled" для кнопки
	protected setDisabled(el: HTMLButtonElement | null, disabled: boolean) {
		if (el) {
			// Если элемент существует, устанавливаем состояние "disabled"
			el.disabled = disabled;
		} else {
			// Логируем ошибку, если элемент некорректен
			console.log(
				'setDisabled: Element is null or undefined. Cannot set disabled state.'
			);
		}
	}

	// Скрыть элемент, устанавливая стиль display в 'none'
	protected setHidden(el: HTMLElement): void {
		if (el) {
			// Если элемент существует, скрываем его
			el.style.display = 'none';
		} else {
			// Логируем ошибку, если элемент некорректен
			console.log(
				'setHidden: Element is null or undefined. Cannot set hidden state.'
			);
		}
	}

	// Показать элемент, убирая стиль display
	protected setVisible(el: HTMLElement): void {
		if (el) {
			// Если элемент существует, показываем его
			el.style.removeProperty('display');
		} else {
			// Логируем ошибку, если элемент некорректен
			console.log(
				'setVisible: Element is null or undefined. Cannot set hidden state.'
			);
		}
	}

	// Вернуть корневой DOM-элемент компонента
	render(data?: Partial<T>): HTMLElement {
		// Обновляем данные компонента с использованием Object.assign
		Object.assign(this as object, data ?? {});
		return this.container; // Возвращаем контейнер
	}
}

// Класс View, наследующий от Component
export class View<T> extends Component<T> {
	constructor(container: HTMLElement, protected readonly events: IEvents) {
		super(container); // Вызываем конструктор базового компонента
	}
}
