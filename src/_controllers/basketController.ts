import BasketModel from '../__models/basketModel';
import { BasketView } from '../__view/basketView';
import { products } from '../__models/productModel';
import { InterfaceEventDispatcher } from '../_interfaces/index';

export class BasketController {
    private basketModel: BasketModel;

    constructor(private basketView: BasketView, events: InterfaceEventDispatcher) {
        this.basketModel = new BasketModel(events);

        events.dispatch('basket:update', (data: any) => {
            this.updateBasketView(data.contentItems);
        });
    }

    addToBasket(productId: string): void {
        this.basketModel.addItem(productId);
    }

    removeFromBasket(productId: string): void {
        this.basketModel.removeItem(productId);
    }

    displayBasket(): void {
        this.updateBasketView(Array.from(this.basketModel.contentItems.entries()));
    }

    private updateBasketView(contentItems: Array<[string, number]>): void {
        const basketItemsHTML: HTMLElement[] = [];
        contentItems.forEach(([productId, quantity]) => {
            const product = products.find(p => p.id === productId);
            if (product) {
                const itemContainer = document.createElement('div');
                itemContainer.classList.add('basket-item');
                /* временно для теста*/
                itemContainer.innerHTML = `
                    <span class="basket-item__title">${product.title} x ${quantity}</span>
                    <button class="basket-item__add">Добавить</button>
                    <button class="basket-item__remove">Удалить</button>
                `;
                basketItemsHTML.push(itemContainer);
            }
        });
        this.basketView.showElement({ contentItems: basketItemsHTML });
    }
}