# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

# Документация проекта Веб ларёк

### Интерфейсы

#### InterfaceBasketModel
- Данный интерфейс определяет структуру модели корзины покупок.
- `contentItems`: представляет собой объект `Map`, где ключи - это идентификаторы товаров (строки), а значения - количество этих товаров (числа).
- Методы `addItem` и `removeItem` предназначены для добавления и удаления товаров из корзины соответственно.

#### InterfaceEventDispatcher
- Определяет интерфейс для объектов, которые могут отправлять (диспетчировать) события.
- `dispatch(event: string, data: unknown)`: Метод для отправки события, принимающий имя события и данные.

#### InterfaceProductInfo
- Описание структуры информации о продукте.
- `id`:` Уникальный идентификатор продукта.
- `productTitle`: Заголовок / название продукта.

#### InterfaceCatalogueModel
- Определяет структуру каталога продуктов.
- `contentItems:` Массив объектов `InterfaceProductInfo`.
- `setContentItems(contentItems: InterfaceProductInfo[])`: Метод для установки массива продуктов.
- `getContentItem(id: string)`: Метод для получения информации о продукте по его идентификатору.

#### InterfaceView:
- Обозначает интерфейс для работы с представлением.
- Метод `showElement(data?: object): HTMLElement`: отображает элемент (представление) и возвращает HTML-элемент.

#### InterfaceViewConstructor:
- Описывает конструктор для создания экземпляров представления.
- Используется для создания объекта, соответствующего интерфейсу `InterfaceView`, с параметрами `container` (HTML-элемент) и `events` (диспетчер событий).
####

### Классы 

#### BasketModel
Реализует интерфейс `InterfaceBasketModel` и отвечает за управление состоянием корзины.

Свойства класса:
  - `contentItems`: экземпляр `Map`, инициализированный пустым объектом `Map`, для хранения товаров в корзине.
  - `constructor(events: InterfaceEventDispatcher)`: Конструктор, принимающий объект, реализующий интерфейс `InterfaceEventDispatcher`. Это позволяет классу отправлять события о изменениях в корзине.
  
Методы класса:
  - `addItem(id: string): void`:
    - Принимает идентификатор товара (`id`).
    - В блоке `try` проверяет, есть ли товар в корзине:
      - Если товара нет, инициализирует его количество значением 0.
      - Увеличивает количество товара на 1.
    - Если при выполнении операций возникает ошибка, она перехватывается и выводится в консоль.

  - `removeItem(id: string): void`:
    - Принимает идентификатор товара (`id`).
    - В блоке `try` проверяет, больше ли количество данного товара 0.
      - Если количество больше 0, уменьшает количество товара на 1.
      - Если после уменьшения количество равно 0, удаляет товар из корзины.
    - Если при выполнении операций возникает ошибка, она также перехватывается и выводится в консоль.

  - `changeBasketState()`:
    - Метод, который вызывает `dispatch `на объекте событий, чтобы уведомить о изменениях в корзине.
    - Отправляет событие с именем `'basket:change'` и данными, содержащими массив ключей (идентификаторов) товаров в корзине.
