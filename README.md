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

### 1. Model

**Описание**: Модель отвечает за бизнес-логику и управление данными приложения. Она включает в себя работу с данными о товарах, пользователях и заказах.

### 2. View

**Описание**: Представление отвечает за отображение информации пользователю и взаимодействие с ним. Оно реализует пользовательский интерфейс и обрабатывает события, например, нажатия кнопок и ввод данных.

### 3. Presenter

**Описание**: Презентер связывает Model и View, обеспечивая взаимодействие между ними. Он получает данные от Model и обновляет View, а также обрабатывает действия пользователя.

## Типы и интерфейсы

### Типы

- **Categories**: Перечисление категорий товаров, доступных в магазине:

  - `софт-скил`
  - `другое`
  - `дополнительное`
  - `кнопка`
  - `хард-скил`

- **CategoryMapping**: Сопоставление категорий с их строковыми представлениями.

- **ValidationErrors**: Ошибки валидации, представленные как частичное сопоставление полей формы заказа с сообщениями об ошибках.

- **PaymentMethod**: Перечисление доступных методов оплаты:

  - `card`
  - `cash`
  - `other`


- **PaymentMapping**: Сопоставление методов оплаты с их строковыми представлениями.

### Интерфейсы

- **ApiResponse**: Интерфейс для ответа API, содержащий массив элементов.

  - **Свойства**:
    - `total: number`: Общее количество элементов.
    - `items: Item[]`: Массив товаров.

- **ApplicationStateInterface**: Интерфейс для описания внутреннего состояния приложения.

  - **Свойства**:
    - `inventory: Item[]`: Массив карточек товара.
    - `cart: Item[]`: Товары в корзине.
    - `orderInfo: OrderInterface`: Информация о заказе.
    - `formValidationErrors: ValidationErrors`: Ошибки валидации.
  - **Методы**:
    - `getCartItemCount(): number`: Возвращает количество товаров в корзине.
    - `calculateTotalCartCost(): number`: Вычисляет общую стоимость товаров в корзине.
    - `addToCart(value: Item): void`: Добавляет товар в корзину.
    - `removeFromCart(id: string): void`: Удаляет товар из корзины по ID.
    - `clearCart(): void`: Очищает корзину полностью.
    - `setOrderItems(): void`: Добавляет ID товаров в поле items для orderInfo.
    - `updateOrderField(field: keyof OrderFormInterface, value: string): void`: Обновляет поля заказа.
    - `validateContactInfo(): boolean`: Проверяет корректность контактной информации.
    - `validateOrderInfo(): boolean`: Проверяет корректность деталей заказа.
    - `resetOrderInfo(): boolean`: Сбрасывает orderInfo после завершения покупки.
    - `populateInventory(items: Item[]): void`: Преобразует данные с сервера в формат приложения.
    - `resetSelection(): void`: Сбрасывает поле isSelected у всех товаров после покупки.

- **ValidationErrors**: Ошибки валидации, представленные как частичное сопоставление полей формы заказа с сообщениями об ошибках.

  - **Тип**: `Partial<Record<keyof OrderFormInterface, string>>`

- **PaymentMethod**: Перечисление доступных методов оплаты.

  - **Тип**: `'card' | 'cash' | 'other'`

- **PaymentMapping**: Сопоставление методов оплаты с их строковыми представлениями.

  - **Тип**:   `[Key in PaymentMethod]: string;`
    

- **OrderFormInterface**: Интерфейс для описания формы заказа.

  - **Свойства**:
    - `email: string`: Электронная почта пользователя.
    - `phone: string`: Номер телефона пользователя.
    - `address: string`: Адрес доставки для заказа.
    - `payment: PaymentMethod`: Метод оплаты для заказа.

- **OrderInterface**: Интерфейс для описания заказа.

  - **Свойства**:
    - `items: string[]`: Массив идентификаторов купленных товаров.
    - `paymentMethod: PaymentMethod`: Метод оплаты для заказа.
    - `total: number`: Общая стоимость заказа в валюте.

- **OrderResponse**: Интерфейс для успешного ответа при оформлении заказа.

  - **Свойства**:
    - `id: string`: Уникальный идентификатор заказа.
    - `total: number`: Общая стоимость заказа.

- **Item**: Интерфейс для определения свойств товара в магазине.

  - **Свойства**:
    - `selected: boolean`: Указание на то, выбран ли товар.
    - `id: string`: ID товара.
    - `title: string`: Название товара.
    - `image: string`: Ссылка на изображение товара.
    - `description: string`: Описание товара.
    - `category: Categories`: Категория товара.
    - `price: number | null`: Цена товара; может быть числом или null, если цена не указана.

- **PageInterface**: Интерфейс для компонента страницы.

  - **Свойства**:
    - `counter: number`: Счетчик корзины.
    - `gallery: HTMLElement[]`: Массив товаров.
    - `locked: boolean`: Блокировка прокрутки страницы.

- **ModalInterface**: Интерфейс для компонента модального окна.

  - **Свойства**:
    - `content: HTMLElement`: Показываемое содержимое.

- **CartInterface**: Интерфейс для компонента корзины.
  - **Свойства**:
    - `items: string[]`: Массив товаров в корзине.
    - `total: number`:

### Схема

![](other/UML_type_n_interfaces.drawio.png)

## Базовые элементы

## api.ts

### Типы

- **ApiListResponse<Type>**: Обобщенный тип для ответа API, содержащий общее количество элементов и массив элементов указанного типа.

  - `total: number`: Общее количество элементов.
  - `items: Type[]`: Массив элементов указанного типа.

- **ApiPostMethods**: Перечисление доступных методов POST для запросов API.

  - `POST`: Метод для создания нового ресурса.
  - `PUT`: Метод для обновления существующего ресурса.
  - `DELETE`: Метод для удаления ресурса.

### Классы

- **Api**: Класс для взаимодействия с API, обеспечивающий методы для выполнения HTTP-запросов.

  - **Свойства**:

    - `baseUrl: string`: Базовый URL для API, к которому будут добавляться конечные точки.
    - `options: RequestInit`: Настройки для HTTP-запросов, включая заголовки.

  - **Методы**:
    - `constructor(baseUrl: string, options: RequestInit = {})`: Конструктор класса, принимающий базовый URL и опциональные настройки запроса.
    - `protected handleResponse(response: Response): Promise<object>`: Обрабатывает ответ от API, возвращая JSON-данные или отклоняя промис с сообщением об ошибке.
    - `get(uri: string)`: Выполняет GET-запрос по указанному URI и возвращает ответ от API.
    - `post(uri: string, data: object, method: ApiPostMethods = 'POST')`: Выполняет POST-запрос по указанному URI с переданными данными и методом, возвращая ответ от API.

## component.ts

### Типы

- **T**: Обобщенный тип, который используется для указания типа данных, с которыми будет работать компонент.

### Классы

#### Component<T>

Абстрактный класс, представляющий базовый компонент для работы с DOM-элементами.

- **Свойства**:

  - `container: HTMLElement`: Корневой элемент компонента, в который будут добавляться или изменяться дочерние элементы.

- **Методы**:

  - `constructor(container: HTMLElement)`: Конструктор класса, принимающий `HTMLElement` в качестве контейнера для компонента.

  - `toggleClass(el: HTMLElement, className: string, force?: boolean)`:

    - Переключает класс у указанного элемента.
    - **Параметры**:
      - `el`: Элемент, у которого нужно переключить класс.
      - `className`: Имя класса, который нужно добавить или удалить.
      - `force`: Опциональный булевый параметр, который указывает, добавлять или удалять класс.

  - `protected setText(el: HTMLElement | null, value: string | null)`:

    - Устанавливает текстовое содержимое указанного элемента.
    - **Параметры**:
      - `el`: Элемент, текст которого нужно установить.
      - `value`: Значение текста, которое нужно установить. Если `null`, текст будет очищен.

  - `protected setImage(el: HTMLImageElement | null, src: string | null)`:

    - Устанавливает источник изображения для указанного элемента `<img>`.
    - **Параметры**:
      - `el`: Элемент изображения, для которого нужно установить источник.
      - `src`: URL-адрес изображения. Если `null`, будет выведено сообщение об ошибке.

  - `protected setDisabled(el: HTMLButtonElement | null, disabled: boolean)`:

    - Устанавливает состояние "disabled" для указанной кнопки.
    - **Параметры**:
      - `el`: Элемент кнопки, состояние которой нужно изменить.
      - `disabled`: Булевый параметр, указывающий, должно ли состояние быть отключенным.

  - `protected setHidden(el: HTMLElement): void`:

    - Скрывает указанный элемент, устанавливая стиль `display` в 'none'.
    - **Параметры**:
      - `el`: Элемент, который нужно скрыть.

  - `protected setVisible(el: HTMLElement): void`:

    - Показывает указанный элемент, убирая стиль `display`.
    - **Параметры**:
      - `el`: Элемент, который нужно показать.

  - `render(data?: Partial<T>): HTMLElement`:
    - Обновляет данные компонента и возвращает корневой DOM-элемент.
    - **Параметры**:
      - `data`: Опциональный объект с данными для обновления компонента.
    - **Возвращает**: Корневой элемент компонента.

#### View<T>

Класс, наследующий от `Component`, который добавляет поддержку работы с событиями.

- **Свойства**:

  - `events: IEvents`: Интерфейс для работы с событиями, который используется в компоненте.

- **Методы**:
  - `constructor(container: HTMLElement, events: IEvents)`:
    - Конструктор класса, принимающий контейнер и интерфейс событий.
    - Вызывает конструктор базового класса `Component`.
