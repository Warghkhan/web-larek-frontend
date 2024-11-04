import {
	InterfaceEventDispatcher,
	InterfaceView,
	InterfaceViewConstructor,
} from '../_interfaces/';


export class BasketContentItemsView implements InterfaceView {
	protected titleItem: HTMLSpanElement;
	protected addItemButton: HTMLButtonElement;
	protected removeItemButton: HTMLButtonElement;

	protected id: string | null = null;

	constructor(
		protected container: HTMLElement,
		protected events: InterfaceEventDispatcher
	) {
		this.titleItem = container.querySelector(
			'.basket-item__title'
		) as HTMLSpanElement;
		this.addItemButton = container.querySelector(
			'.basket-item__add'
		) as HTMLButtonElement;
		this.removeItemButton = container.querySelector(
			'basket-item__remove'
		) as HTMLButtonElement;

		this.addItemButton.addEventListener('click', () => {
			this.events.dispatch('ui:basket-add', { id: this.id });
		});

		this.removeItemButton.removeEventListener('click', () => {
			this.events.dispatch('ui:basket-remove', { id: this.id });
		});
	}

	showElement(data: { id: string; titleItem: string }) {
		if (data) {
			this.id = data.id;
			this.titleItem.textContent = data.titleItem;
		}
		return this.container;
	}
}


export class BasketView implements InterfaceView {
	constructor(protected container: HTMLElement) {}
	showElement(data: { contentItems: HTMLElement[] }) {
		if (data) {
			this.container.replaceChildren(...data.contentItems);
		}
		return this.container;
	}
}