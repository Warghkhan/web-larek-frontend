import { Api } from './components/base/api';
import './scss/styles.scss';
import { API_URL } from './utils/constants';
/*
const configurations = {
	baseUrl: 'https://larek-api.nomoreparties.co/weblarek.postman.json',
	/*
	headers: {
    authorization: "c140e5d4-4727-4b15-93c2-f75226697a2f",
    "Content-Type": "application/json",
  },
};
*/

/*
const getResponseData = (res: Response) => {
  if (res.ok) {
		console.log(res);
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
};

export const getData = () => {
  return fetch(configurations.baseUrl).then((res: Response) => getResponseData(res));
};

getData();
*/
/*
import { ProductController } from './_controllers/productController';
import { BasketController } from './_controllers/basketController';
import { ProductView } from './__view/productView';
import { BasketView } from './__view/basketView';
import { InterfaceEventDispatcher } from './_interfaces/index';

class EventDispatcher implements InterfaceEventDispatcher {
    dispatch(event: string, data: unknown) {
        console.log(`Dispatching event: ${event}`, data);
    }
}
/*
const eventDispatcher = new EventDispatcher();
const productView = new ProductView();
const productController = new ProductController(productView);

const basketView = new BasketView(document.getElementById('basket')!, eventDispatcher);
const basketController = new BasketController(basketView, eventDispatcher);

/*
productController.displayProducts();
basketController.addToBasket('1');
basketController.addToBasket('2');
basketController.removeFromBasket('1');
basketController.displayBasket();
*/
