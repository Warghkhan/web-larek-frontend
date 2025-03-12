import { IEvents } from './events';

//Базовый компонент

export abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) {}

	// Переключить класс
	toggleClass(el: HTMLElement, className: string, force?: boolean) {
		el.classList.toggle(className, force);
	}

	// Установить текст
	protected setText(el: HTMLElement | null, value: string | null) {
		if (el) {
			el.textContent = value !== null ? String(value) : '';
		} else {
			// Логируем, если el некорректен
			console.log('setText: Element is null or undefined. Cannot set text.');
		}
	}

	// Установить изображение с альтернативным текстом
	protected setImage(el: HTMLImageElement | null, src: string | null) {
		if (el) {
			if (src) {
				el.src = src;
			} else {
				// Логируем, если src некорректен
				console.log('setImage: Source URL is null or empty.');
			}
		} else {
			// Логируем, если el некорректен
			console.log(
				'setImage: Element is null or undefined. Cannot set image source.'
			);
		}
	}

	// Сменить статус блокировки
	protected setDisabled(el: HTMLButtonElement | null, disabled: boolean) {
		if (el) {
			el.disabled = disabled;
		} else {
			console.log(
				'setDisabled: Element is null or undefined. Cannot set disabled state.'
			); // Логируем, если el некорректен
		}
	}

	// Скрыть элемент
	protected setHidden(el: HTMLElement): void {
		if (el) {
			el.style.display = 'none';
		} else {
			// Логируем, если el некорректен
			console.log(
				'setHidden: Element is null or undefined. Cannot set hidden state.'
			);
		}
	}

	// Показать элемент
	protected setVisible(el: HTMLElement): void {
		if (el) {
			el.style.removeProperty('display');
		} else {
			console.log(
				'setVisible:Element is null or undefined. Cannot set hidden state.'
			);
		}
	}

	// Вернуть корневой DOM-элемент
	render(data?: Partial<T>): HTMLElement {
		Object.assign(this as object, data ?? {});
		return this.container;
	}
}

export class View<T> extends Component<T> {
	constructor(container: HTMLElement, protected readonly events: IEvents) {
		super(container);
	}
}
