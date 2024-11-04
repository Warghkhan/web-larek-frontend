import {
	InterfaceBasketModel,
	InterfaceCatalogueModel,
	InterfaceEventDispatcher,
} from '../_interfaces/';

class BasketModel implements InterfaceBasketModel {
    contentItems: Map<string, number> = new Map();

    constructor(protected events: InterfaceEventDispatcher) {}

    addItem(id: string): void {
        try {
            if (!this.contentItems.has(id)) {
                this.contentItems.set(id, 0);
            }

            this.contentItems.set(id, this.contentItems.get(id)! + 1);
            this.changeBasketState();
        } catch (err) {
            console.log(err);
        }
    }

    removeItem(id: string): void {
        try {
            if (this.contentItems.get(id)! > 0) {
                this.contentItems.set(id, this.contentItems.get(id)! - 1);
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
            contentItems: Array.from(this.contentItems.entries()),
        });
    }
}

export default BasketModel;



/*

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
}*/