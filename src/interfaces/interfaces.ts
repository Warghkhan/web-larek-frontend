interface InterfaceBasketModel {
	contentItems: Map<string, number>;
	addItem(id: string): void;
	removeItem(id: string): void;
}

interface InterfaceEventDispatcher {
	dispatch: (event: string, data: unknown) => void;
}

interface InterfaceProductInfo {
	id: string;
	productTitle: string;
}

interface InterfaceCatalogueModel {
	contentItems: InterfaceProductInfo[];
	setContentItems(contentItems: InterfaceProductInfo[]): void;
	getContentItem(id: string): InterfaceProductInfo;
}

interface InterfaceView {
	showElement(data?: object): HTMLElement;
}

interface InterfaceViewConstructor {
	new (
		container: HTMLElement,
		events?: InterfaceEventDispatcher
	): InterfaceView;
}

export {
	InterfaceBasketModel,
	InterfaceCatalogueModel,
	InterfaceEventDispatcher,
	InterfaceProductInfo,
	InterfaceView,
	InterfaceViewConstructor,
};