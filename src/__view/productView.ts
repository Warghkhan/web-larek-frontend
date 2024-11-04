import { InterfaceView } from '../_interfaces/index';

export class ProductView implements InterfaceView {

  constructor(protected container: HTMLElement) {}
	showElement(data: { any: HTMLElement[] }) {

		return this.container;
  }
}
