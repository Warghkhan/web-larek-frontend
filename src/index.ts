import './scss/styles.scss';

interface InterfaceBasketModel {
	contentItems: Map<string, number>;
	addItem(id: string): void;
	removeItem(id: string): void;
}

class BasketModel implements InterfaceBasketModel {
	contentItems: Map<string, number> = new Map();

	addItem(id: string): void {
		try {
			if (!this.contentItems.has(id)) {
				this.contentItems.set(id, 0);
			}

			this.contentItems.set(id, this.contentItems.get(id) + 1);
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
		} catch (err) {
			console.log(err);
		}
	}
}
