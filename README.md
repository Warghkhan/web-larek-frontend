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
# !!!Не актуально на данный момент!!!
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

  - **Тип**: [Key in PaymentMethod]: string;

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

## View

## Общие элементы

## cart.ts

### Классы

- **Cart**: Класс `Cart`, наследующий от `View`, реализует интерфейс `CartInterface` и отвечает за отображение и управление корзиной покупок.

  - **Свойства**:

    - **static template: HTMLElement**: Шаблон для корзины, получаемый по ID.
    - **protected \_list: HTMLElement**: Элемент для отображения списка товаров в корзине.
    - **protected \_total: HTMLElement**: Элемент для отображения общей суммы.
    - **protected \_button: HTMLElement**: Кнопка для оформления заказа.

  - **Методы**:

    - **constructor(events: IEvents)**: Конструктор класса, инициализирующий элементы корзины и добавляющий обработчик события на кнопку оформления заказа.

    - **set items(items: HTMLElement[])**: Сеттер для обновления списка товаров в корзине.

      - **Параметры**:
        - `items`: Массив элементов, представляющих товары в корзине.

    - **set selected(items: string[])**: Сеттер для обновления состояния выбора товаров.

      - **Параметры**:
        - `items`: Массив строк, представляющих идентификаторы выбранных товаров.

    - **set total(total: number)**: Сеттер для обновления общей суммы в корзине.
      - **Параметры**:
        - `total`: Число, представляющее общую сумму товаров в корзине.

## form.ts

### Классы

- **Form**: Класс `Form`, наследующий от `View<FormInterface>`, отвечает за создание и управление формами на странице.

  - **Свойства**:

    - **protected \_submit: HTMLButtonElement**: Кнопка отправки формы.
    - **protected \_errors: HTMLElement**: Элемент для отображения ошибок валидации.

  - **Методы**:

    - **constructor(container: HTMLFormElement, events: IEvents)**: Конструктор класса, инициализирующий элементы формы и добавляющий обработчики событий.

      - **Параметры**:
        - `container`: HTML-элемент формы.
        - `events`: Интерфейс для управления событиями.

    - **protected onInputChange(field: keyof T, value: string)**: Метод для обработки изменений в полях формы.

      - **Параметры**:
        - `field`: Имя поля, которое изменилось.
        - `value`: Новое значение поля.

    - **set valid(value: boolean)**: Сеттер для свойства `valid`, который включает или отключает кнопку отправки.

      - **Параметры**:
        - `value`: Булевое значение, указывающее на валидность формы.

    - **set errors(value: string)**: Сеттер для свойства `errors`, который обновляет текст ошибок валидации.

      - **Параметры**:
        - `value`: Строка, представляющая текст ошибок.

    - **render(state: Partial<T> & FormInterface)**: Метод для рендеринга состояния формы.
      - **Параметры**:
        - `state`: Частичное состояние формы, включая валидность и ошибки.

## modal.ts

### Классы

- **Modal**: Класс `Modal`, наследующий от `View<ModalInterface>`, отвечает за создание и управление модальными окнами на странице.

  - **Свойства**:

    - **protected \_closeButton: HTMLButtonElement**: Кнопка закрытия модального окна.
    - **protected \_content: HTMLElement**: Элемент, содержащий контент модального окна.

  - **Методы**:

    - **constructor(container: HTMLElement, events: IEvents)**: Конструктор класса, инициализирующий элементы модального окна и добавляющий обработчики событий.

      - **Параметры**:
        - `container`: HTML-элемент, который служит контейнером для модального окна.
        - `events`: Интерфейс для управления событиями.

    - **set content(value: HTMLElement)**: Сеттер для установки содержимого модального окна.

      - **Параметры**:
        - `value`: Новый HTML-элемент, который заменяет текущее содержимое модалки.

    - **open()**: Метод для открытия модального окна.

      - **Описание**: Добавляет класс для отображения модалки и генерирует событие открытия.

    - **close()**: Метод для закрытия модального окна.

      - **Описание**: Убирает класс отображения, очищает содержимое модалки и генерирует событие закрытия.

    - **render(data: ModalInterface): HTMLElement**: Метод для рендеринга модального окна.
      - **Параметры**:
        - `data`: Данные, необходимые для рендеринга модального окна.
      - **Возвращает**: Контейнер модального окна.

## success.ts

### Классы

- **Success**: Класс `Success`, наследующий от `Component<OrderResponse>`, отвечает за отображение информации об успешном заказе.

  - **Свойства**:

    - **protected \_total: HTMLElement**: Элемент для отображения общей суммы заказа.
    - **protected \_close: HTMLButtonElement**: Кнопка закрытия окна с информацией о заказе.

  - **Методы**:

    - **constructor(container: HTMLFormElement, actions?: Action)**: Конструктор класса, инициализирующий элементы для отображения информации о заказе и добавляющий обработчики событий.

      - **Параметры**:
        - `container`: HTML-форма, которая служит контейнером для отображения информации.
        - `actions`: Объект действий, содержащий обработчик события нажатия на кнопку закрытия.

    - **set total(value: number)**: Сеттер для свойства `total`, который обновляет текст общей суммы заказа.
      - **Параметры**:
        - `value`: Числовое значение, представляющее общую сумму заказа.
      - **Описание**: Устанавливает текст с информацией о списанной сумме синапсов.

## Специфичные элементы

## card.ts

### Классы

- **Card**: Базовый класс `Card`, представляющий карточку товара.

  - **Свойства**:

    - **protected \_title: HTMLElement**: Элемент заголовка карточки.
    - **protected \_image: HTMLImageElement**: Элемент изображения карточки.
    - **protected \_category: HTMLElement**: Элемент категории карточки.
    - **protected \_price: HTMLElement**: Элемент цены карточки.
    - **protected \_button: HTMLButtonElement**: Элемент кнопки карточки.

  - **Методы**:

    - **constructor(blockName: string, container: HTMLElement, action?: Action)**: Конструктор класса, инициализирующий элементы карточки и добавляющий обработчики событий.

      - **Параметры**:
        - `blockName`: Имя блока для CSS классов.
        - `container`: Контейнер, в котором находится карточка.
        - `action`: Объект действий, содержащий обработчик события клика.

    - **set id(value: string)**: Сеттер для установки `id` карточки в data-атрибут контейнера.
    - **get id(): string**: Геттер для получения `id` карточки из data-атрибута.

    - **set title(value: string)**: Сеттер для установки текста заголовка карточки.
    - **get title(): string**: Геттер для получения текста заголовка карточки.

    - **set image(value: string)**: Сеттер для установки источника изображения карточки.
    - **set button(value: string)**: Сеттер для изменения текста кнопки карточки.
    - **set selected(value: boolean)**: Сеттер для установки состояния выбора карточки (активна/неактивна).
    - **set price(value: number | null)**: Сеттер для установки цены карточки и изменения состояния кнопки.
    - **set category(value: Categories)**: Сеттер для установки текста и классов категории карточки.

- **Product**: Класс `Product`, наследующий от `Card`, представляющий товар.

  - **Конструктор**:
    - **constructor(container: HTMLElement, action?: Action)**: Вызов конструктора родительского класса с именем блока 'card'.

- **ProductPreview**: Класс `ProductPreview`, наследующий от `Card`, представляющий предварительный просмотр товара.

  - **Свойства**:

    - **protected \_description: HTMLElement**: Элемент описания карточки.

  - **Методы**:
    - **constructor(container: HTMLElement, action?: Action)**: Вызов конструктора родительского класса и инициализация элемента описания.
    - **set description(value: string)**: Сеттер для установки текста описания карточки.

## orderForm.ts

### Класс OrderForm

Класс `OrderForm` представляет собой форму заказа, позволяя пользователям выбирать способ оплаты (картой или наличными).

- **Свойства**:

  - **protected \_card: HTMLButtonElement**: Кнопка для оплаты картой.
  - **protected \_cash: HTMLButtonElement**: Кнопка для оплаты наличными.

- **Методы**:

  - **constructor(blockName: string, container: HTMLFormElement, events: IEvents)**: Конструктор класса, инициализирующий кнопки оплаты и устанавливающий обработчики событий.

    - **Параметры**:
      - `blockName`: Имя блока для использования в CSS.
      - `container`: Контейнер, в котором находится форма заказа.
      - `events`: Объект событий, связанных с формой.

  - **private initPaymentButtons()**: Метод для инициализации кнопок оплаты с добавлением обработчиков событий для каждой кнопки.

  - **private setupButton(button: HTMLButtonElement, paymentType: string)**: Метод для настройки кнопки оплаты.

    - **Параметры**:
      - `button`: Кнопка, которую нужно настроить.
      - `paymentType`: Тип платежа (например, 'cash' или 'card').

  - **private toggleActiveButton(activeButton: string)**: Метод для управления активным состоянием кнопок.

    - **Параметры**:
      - `activeButton`: Тип активной кнопки.

  - **disableButtons()**: Метод для отключения активных состояний кнопок, сбрасывающий активное состояние для обеих кнопок.

## page.ts

### Класс Page

Класс `Page` расширяет функциональность базового класса `View`, предоставляя структуру для страницы с элементами управления и отображения.

- **Свойства**:

  - **protected \_counter: HTMLElement**: Элемент для отображения количества товаров в корзине.
  - **protected \_gallery: HTMLElement**: Элемент для отображения галереи товаров.
  - **protected \_wrapper: HTMLElement**: Обертка для всей страницы.
  - **protected \_cart: HTMLElement**: Элемент, представляющий корзину покупок.

- **Методы**:

  - **constructor(container: HTMLElement, events: IEvents)**: Конструктор класса, инициализирующий элементы страницы и устанавливающий обработчик события для открытия корзины.

    - **Параметры**:
      - `container`: Контейнер, в котором находится страница.
      - `events`: Объект для управления событиями.

  - **set counter(value: number)**: Сеттер для обновления счётчика товаров в корзине, устанавливающий текст счётчика.

  - **set gallery(items: HTMLElement[])**: Сеттер для обновления карточек товаров в галерее, заменяющий содержимое галереи на новые карточки.

  - **set locked(value: boolean)**: Сеттер для управления блокировкой прокрутки страницы. Добавляет или удаляет класс для блокировки прокрутки в зависимости от значения.

## userInfo.ts

### Класс UserInfo

Класс `User Info` наследует от базового класса `Form` и реализует интерфейс `OrderFormInterface`, предоставляя функциональность для управления формой заказа.

- **Конструктор**:

  - **constructor(container: HTMLFormElement, events: IEvents)**: Конструктор класса, инициализирующий контейнер формы и события.
    - **Параметры**:
      - `container`: HTML-элемент формы, содержащий поля ввода.
      - `events`: Объект для управления событиями.

- **Методы**:

  - **set email(value: string)**: Сеттер для обновления значения поля email. Находит элемент ввода по имени и устанавливает его значение. Если элемент не найден, вызывается функция обработки ошибок.

  - **set phone(value: string)**: Сеттер для обновления значения поля phone. Аналогично, находит элемент ввода и устанавливает его значение, обрабатывая ошибки в случае отсутствия элемента.

## Model

## ApplicationState.ts

### Класс ApplicationState

Класс `ApplicationState` реализует интерфейс `ApplicationStateInterface` и управляет состоянием приложения, включая товары, корзину и информацию о заказе.

- **Свойства**:

  - **inventory: Item[]**: Массив товаров, доступных для покупки.
  - **cart: Item[]**: Массив товаров, добавленных в корзину.
  - **orderInfo: OrderInterface**: Объект с информацией о заказе, включая email, телефон, адрес, метод оплаты, список ID товаров и общую стоимость.
  - **formValidationErrors: ValidationErrors**: Объект для хранения ошибок валидации формы.

- **Методы**:

  - **getCartItemCount(): number**: Возвращает количество товаров в корзине.

  - **calculateTotalCartCost(): number**: Вычисляет общую стоимость товаров в корзине.

  - **addToCart(value: Item): void**: Добавляет товар в корзину.

  - **removeFromCart(id: string): void**: Удаляет товар из корзины по ID.

  - **clearCart(): void**: Очищает корзину полностью.

  - **setOrderItems(): void**: Добавляет ID товаров в поле `items` для `orderInfo` и обновляет общую стоимость заказа.

  - **updateOrderField(field: keyof OrderFormInterface, value: string): void**: Обновляет поля `email`, `phone`, `address` и `payment` в `orderInfo`, включая валидацию метода оплаты.

  - **validateContactInfo(): boolean**: Проверяет корректность контактной информации и возвращает результат валидации.

  - **validateOrderInfo(): boolean**: Проверяет корректность деталей заказа, вызывая метод `validateContactInfo`.

  - **resetOrderInfo(): boolean**: Сбрасывает `orderInfo` после завершения покупки и очищает корзину.

  - **populateInventory(items: Item[]): void**: Заполняет массив `inventory` данными товаров, полученными с сервера.

  - **resetSelection(): void**: Сбрасывает поле `isSelected` у всех товаров после покупки.

## Presenter

## index.ts

### Основной файл приложения

Этот файл отвечает за инициализацию приложения, обработку событий и взаимодействие с API. Он связывает различные компоненты, такие как страницы, корзина и форма заказа, обеспечивая их функциональность и взаимодействие.

#### Импорт необходимых модулей и компонентов

- **ApplicationApi**: Модуль для работы с API.
- **EventEmitter**: Модуль для управления событиями.
- **Page**: Компонент страницы.
- **Modal**: Компонент модального окна.
- **Card, Product, ProductPreview**: Компоненты карточки товара.
- **ApplicationState**: Управление состоянием приложения.
- **Утилиты**: Функции для работы с элементами и шаблонами.
- **Типы данных**: Определения для API и заказов.
- **Константы**: URL для API и CDN.
- **Стили**: Импорт стилей приложения.
- **Компоненты**: Корзина, форма заказа, информация о пользователе и успешное завершение.

#### Создание экземпляров необходимых классов

- **`applicationApi`**: Экземпляр класса `ApplicationApi`, который используется для выполнения запросов к API и получения данных о товарах.
- **`events`**: Экземпляр класса `EventEmitter`, который управляет событиями в приложении.
- **`cartHandler`**: Экземпляр класса `CartHandler`, который управляет состоянием корзины и взаимодействует с событиями.

#### Получение шаблонов из HTML документа

Шаблоны карточек, корзины и форм заказа загружаются из HTML-документа для дальнейшего использования.

#### Обработчики событий

- **`events.on('modal:open', ...)`**: Блокирует страницу при открытии модального окна.
- **`events.on('modal:close', ...)`**: Разблокирует страницу при закрытии модального окна.
- **`events.on('card:select', (item: Item) => {...})`**: Устанавливает выбранный товар в качестве предварительного просмотра в корзине.
- **`events.on('items:change', (items: Item[]) => {...})`**: Обновляет отображение карточек товаров в зависимости от содержимого корзины.
- **`events.on('preview:change', (item: Item) => {...})`**: Обновляет состояние кнопки в зависимости от того, находится ли товар в корзине.

#### Обработка события открытия корзины и формы заказа

- **`events.on('basket:open', ...)`**: Отображает содержимое корзины в модальном окне.
- **`events.on('order:open', ...)`**: Отображает форму заказа в модальном окне с начальными параметрами.

#### Обработка отправки заказа

- **`events.on('order:submit', ...)`**: Отображает модальное окно с контактной информацией перед отправкой заказа.
- **`events.on('contacts:submit', async () => {...})`**: Отправляет заказ с информацией из корзины. Обрабатывает успешное завершение и ошибки.

### Описание переменных, классов и методов

#### Переменные

- **`applicationApi`**:

  - Тип: `ApplicationApi`
  - Описание: Экземпляр для работы с API, осуществляющий запросы и получающий данные о товарах.

- **`events`**:

  - Тип: `EventEmitter`
  - Описание: Объект для управления событиями в приложении, позволяющий подписываться на события и их обработку.

- **`cartHandler`**:
  - Тип: `CartHandler`
  - Описание: Управляет состоянием корзины, добавляет и удаляет товары, а также обновляет информацию о заказе.

#### Классы

- **`ApplicationApi`**: Класс для работы с API, включает методы для получения данных о товарах и отправки заказов.
- **`EventEmitter`**: Класс для управления событиями, предоставляет методы для подписки и эмитирования событий.
- **`CartHandler`**: Класс, управляющий состоянием корзины, предоставляет методы для добавления, удаления товаров и обновления информации о заказе.
- **`Page`**: Класс, представляющий страницу приложения, управляет отображением и состоянием страницы.
- **`Modal`**: Класс для работы с модальными окнами, позволяет открывать и закрывать окна с контентом.
- **`Card`**: Класс для отображения карточек товаров, включает методы для рендеринга и обработки событий
- **`Product`**: Класс, представляющий отдельный товар, включает свойства, такие как название, цена и описание, а также методы для получения информации о товаре и его обновления.
- **`ProductPreview`**: Класс для отображения предварительного просмотра товара, включает методы для управления отображением информации о товаре и его взаимодействия с корзиной.
- **`ApplicationState`**: Класс для управления состоянием всего приложения, включает методы для сохранения и извлечения состояния, а также для обработки изменений состояния при взаимодействии с пользователем.
- **`Utils`**: Набор утилитарных функций для работы с элементами DOM, форматированием данных и другими общими задачами, которые могут использоваться в различных частях приложения.

## Утилиты

## ApplicationApi.ts

## ApplicationApi

### Описание

`ApplicationApi` — это класс, который наследуется от базового класса `Api` и предназначен для работы с API приложения. Он включает методы для получения списка продуктов, получения конкретного продукта по его ID и оформления заказов. Класс также управляет формированием полных URL для изображений товаров, используя базовый URL для CDN.

### Свойства

- **`cdn: string`**: Переменная для хранения базового URL для изображений товаров.

### Конструктор

- **Параметры**:
  - `cdn`: URL для CDN, который будет использоваться для формирования полных путей к изображениям.
  - `baseUrl`: Базовый URL API, который будет использоваться для выполнения запросов.
  - `options`: Опциональные параметры для настройки запросов.

### Методы

- **`getProductList()`**: Выполняет GET-запрос к API для получения списка продуктов и возвращает массив объектов с данными о товарах.

- **`getProductItem(id: string)`**: Выполняет GET-запрос к API для получения конкретного продукта по его ID и возвращает объект с данными о товаре.

- **`orderProducts(order: OrderInterface)`**: Выполняет POST-запрос к API для оформления заказа продуктов и возвращает результат оформления заказа.

## utils.ts

### Описание

Этот модуль содержит функции и типы, которые помогают в работе с DOM-элементами, валидацией данных и обработкой ошибок. Он включает функции для преобразования строк, проверки типов, создания элементов и работы с атрибутами `data-*`.

### Функции

- **`pascalToKebab(value: string): string`**: Преобразует строку из формата PascalCase в формат kebab-case.
- **`isSelector(x: any): x is string`**: Проверяет, является ли переданное значение строкой и имеет ли длину больше 1.
- **`isEmpty(value: any): boolean`**: Проверяет, является ли значение `null` или `undefined`.
- **`ensureAllElements<T extends HTMLElement>(selectorElement: SelectorCollection<T>, context?: HTMLElement): T[]`**: Возвращает массив элементов, соответствующих селектору, из указанного контекста.
- **`ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T`**: Убедитесь, что селектор указывает на единственный элемент, выбрасывает ошибку, если элемент не найден или найдено несколько.
- **`cloneTemplate<T extends HTMLElement>(query: string | HTMLTemplateElement): T`**: Клонирует содержимое указанного шаблона.
- **`bem(block: string, element?: string, modifier?: string): { name: string; class: string }`**: Генерирует имена классов в формате BEM (Block Element Modifier).
- **`getObjectProperties(obj: object, filter?: (name: string, prop: PropertyDescriptor) => boolean): string[]`**: Возвращает список свойств объекта, с возможностью фильтрации.
- **`setElementData<T extends Record<string, unknown> | object>(el: HTMLElement, data: T)`**: Устанавливает атрибуты `data-*` для указанного элемента.
- **`getElementData<T extends Record<string, unknown>>(el: HTMLElement, scheme: Record<string, Function>): T`**: Получает данные из атрибутов `data-*` элемента и преобразует их по заданной схеме.
- **`isPlainObject(obj: unknown): obj is object`**: Проверяет, является ли объект простым объектом.
- **`isBoolean(v: unknown): v is boolean`**: Проверяет, является ли значение булевым.
- **`createElement<T extends HTMLElement>(tagName: keyof HTMLElementTagNameMap, props?: Partial<Record<keyof T, string | boolean | object>>, children?: HTMLElement | HTMLElement[]): T`**: Создает новый элемент DOM с указанными свойствами и дочерними элементами.
- **`handlePrice(price: number): string`**: Форматирует цену, добавляя пробелы каждые три цифры.
- **`handleError(errorMessage: string): void`**: Логирует сообщение об ошибке в консоль.

## constants.ts

### Описание

Этот модуль содержит константы для базового URL API и URL контента, а также объекты для сопоставления категорий и методов оплаты. Он использует типы `CategoryMapping` и `PaymentMapping`, импортированные из файла `../types`.

### Константы

- **`API_URL`**: Базовый URL API, формируемый из переменной окружения `API_ORIGIN`. Используется для взаимодействия с API.
- **`CDN_URL`**: URL контента, также формируемый из переменной окружения `API_ORIGIN`. Используется для доступа к статическому контенту.

### Сопоставления

- **`categoryMapping: CategoryMapping`**: Объект, который сопоставляет категории с соответствующими CSS классами:

  - `'софт-скил'`: `'card__category_soft'`
  - `'другое'`: `'card__category_other'`
  - `'дополнительное'`: `'card__category_additional'`
  - `'кнопка'`: `'card__category_button'`
  - `'хард-скил'`: `'card__category_hard'`

- **`paymentMapping: PaymentMapping`**: Объект, который сопоставляет методы оплаты с текстовыми значениями:
  - `'card'`: `'Онлайн'`
  - `'cash'`: `'При получении'`
  - `'other'`: `'По-другому ¯\\_( ͡° ͜ʖ ͡°)_/¯'`
