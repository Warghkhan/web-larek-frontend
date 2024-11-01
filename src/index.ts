import './scss/styles.scss';

import {
	InterfaceBasketModel,
	InterfaceCatalogueModel,
	InterfaceEventDispatcher,
	InterfaceProductInfo,
	InterfaceView,
	InterfaceViewConstructor,
} from './interfaces/interfaces';

class BasketModel implements InterfaceBasketModel {
	contentItems: Map<string, number> = new Map();
	constructor(protected events: InterfaceEventDispatcher) {}

	addItem(id: string): void {
		try {
			if (!this.contentItems.has(id)) {
				this.contentItems.set(id, 0);
			}

			this.contentItems.set(id, this.contentItems.get(id) + 1);
			this.changeBasketState();
		} catch (err) {
			console.log(err);
		}
	}
	removeItem(id: string): void {
		try {
			if (this.contentItems.get(id)! > 0) {
				this.contentItems.set(id, this.contentItems.get(id) - 1);
				if (this.contentItems.get(id) === 0) {
					this.contentItems.delete(id);
				}
			}
			this.changeBasketState();
		} catch (err) {
			console.log(err);
		}
	}

	protected changeBasketState() {
		this.events.dispatch('basket:change', {
			contentItems: Array.from(this.contentItems.keys()),
		});
	}
}

class BasketContentItemsView implements InterfaceView {
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

class BasketView implements InterfaceView {
	constructor(protected container: HTMLElement) {}
	showElement(data: { contentItems: HTMLElement[] }) {
		if (data) {
			this.container.replaceChildren(...data.contentItems);
		}
		return this.container;
	}
}
