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

Описание: Модель отвечает за бизнес-логику и управление данными приложения. Она включает в себя работу с данными о товарах, пользователях и заказах.

### 2. View

Описание: Представление отвечает за отображение информации пользователю и взаимодействие с ним. Оно реализует пользовательский интерфейс и обрабатывает события, например, нажатия кнопок и ввод данных.

### 3. Presenter

Описание: Презентер связывает Model и View, обеспечивая взаимодействие между ними. Он получает данные от Model и обновляет View, а также обрабатывает действия пользователя.

## Типы и интерфейсы

### Categories

Тип, описывающий категории товаров. Возможные значения:

- `софт-скил`
- `другое`
- `дополнительное`
- `кнопка`
- `хард-скил`

### CategoryMapping

Сопоставление категорий с их строковыми представлениями. Ключи — это категории, а значения — строки, описывающие каждую категорию.

### ValidationErrors

Тип, представляющий ошибки валидации. Это частичное сопоставление полей формы заказа с сообщениями об ошибках. Ключи — это поля формы, а значения — строки с сообщениями об ошибках.

### PaymentMethod

Тип, описывающий доступные методы оплаты. Возможные значения:

- `card` (карта)
- `cash` (наличные)
- `other` (другие)

### PaymentMapping

Сопоставление методов оплаты с их строковыми представлениями. Ключи — это методы оплаты, а значения — строки, описывающие каждый метод.

### ApiResponse

Интерфейс, представляющий ответ API, содержащий массив элементов.

- `total`: общее количество элементов (число).
- `items`: массив элементов типа `Item`.

### ErrorResponse

Интерфейс для обработки ошибок API.

- `error`: сообщение об ошибке (строка).

### Action

Интерфейс для описания действия с обработчиком события клика.

- `onClick`: функция, принимающая объект события `MouseEvent` и выполняющая действие при клике.

### ApplicationStateInterface

Интерфейс, описывающий внутреннее состояние приложения. Содержит информацию о карточках, корзине, заказах и ошибках.

- `inventory`: массив товаров типа `Item`.
- `cart`: массив товаров в корзине типа `Item`.
- `orderInfo`: информация о заказе типа `OrderInterface`.
- `formValidationErrors`: ошибки валидации типа `ValidationErrors`.
- `getCartItemCount()`: метод, возвращающий количество товаров в корзине.
- `calculateTotalCartCost()`: метод, вычисляющий общую стоимость товаров в корзине.
- `addToCart(value: Item)`: метод для добавления товара в корзину.
- `removeFromCart(id: string)`: метод для удаления товара из корзины по ID.
- `clearCart()`: метод для очистки корзины.
- `updateOrderItems()`: метод для обновления ID товаров в заказе.
- `updateOrderField(field: keyof OrderFormInterface, value: string)`: метод для обновления полей заказа.
- `validateContactInfo()`: метод для проверки корректности контактной информации.
- `validateOrderInfo()`: метод для проверки корректности деталей заказа.
- `resetOrderInfo()`: метод для сброса информации о заказе после завершения покупки.
- `populateInventory(items: Item[])`: метод для преобразования данных с сервера в формат приложения.

### OrderFormInterface

Интерфейс для формы заказа.

- `email`: электронная почта пользователя (строка).
- `phone`: номер телефона пользователя (строка).
- `address`: адрес доставки (строка).
- `payment`: метод оплаты (тип `PaymentMethod`).

### OrderInterface

Интерфейс для описания заказа, расширяющий `OrderFormInterface`.

- `items`: массив идентификаторов купленных товаров (массив строк).
- `total`: общая стоимость заказа (число).

### OrderResponse

Интерфейс для успешного ответа при оформлении заказа.

- `id`: уникальный идентификатор заказа (строка).
- `total`: общая стоимость заказа (число).

### Item

Интерфейс для описания товара в магазине.

- `selected`: флаг, указывающий, выбран ли товар (булевый).
- `id`: уникальный идентификатор товара (строка).
- `title`: название товара (строка).
- `image`: ссылка на изображение товара (строка).
- `description`: описание товара (строка).
- `category`: категория товара (тип `Categories`).
- `price`: цена товара (число или null).

### PageInterface

Интерфейс для компонента страницы.

- `counter`: счетчик товаров в корзине (число).
- `gallery`: массив элементов типа `HTMLElement`, представляющих товары.
- `locked`: флаг, указывающий, заблокирована ли прокрутка страницы (булевый).

### ModalInterface

Интерфейс для компонента модального окна.

- `content`: содержимое модального окна (тип `HTMLElement`).

### CartInterface

Интерфейс для компонента корзины.

- `items`: массив идентификаторов товаров в корзине (массив строк).
- `total`: общая стоимость товаров в корзине (число).

### FormInterface

Интерфейс для формы.

- `valid`: флаг, указывающий, является ли форма валидной (булевый).
- `errors`: список ошибок валидации (строка).

### ExtendedFormInterface

Расширенный интерфейс для форм с более структурированной обработкой ошибок.

- `fieldErrors`: объект с ошибками по полям (тип `ValidationErrors`).
- `fieldValidity`: состояние валидации полей (объект с ключами строкового типа и булевыми значениями).

### CardInterface

Интерфейс для карточки товара.

- `id`: уникальный идентификатор карточки (строка).
- `title`: заголовок карточки (строка).
- `category`: категория карточки (строка).
- `description`: описание карточки (строка).
- `image`: URL или путь к изображению (строка).
- `price`: цена товара (число или null).
- `selected`: флаг, указывающий, выбрана ли карточка (булевый).

## Базовые элементы

## api.ts

ApiListResponse<Type>: Обобщенный тип для ответа API, содержащий общее количество элементов и массив элементов указанного типа.

- `total: number`: Общее количество элементов.
- `items: Type[]`: Массив элементов указанного типа.

ApiPostMethods: Перечисление доступных методов POST для запросов API.

- `POST`: Метод для создания нового ресурса.
- `PUT`: Метод для обновления существующего ресурса.
- `DELETE`: Метод для удаления ресурса.

### Классы

Api: Класс для взаимодействия с API, обеспечивающий методы для выполнения HTTP-запросов.

- Свойства:

  - `baseUrl: string`: Базовый URL для API, к которому будут добавляться конечные точки.
  - `options: RequestInit`: Настройки для HTTP-запросов, включая заголовки.

- Методы:
  - `constructor(baseUrl: string, options: RequestInit = {})`: Конструктор класса, принимающий базовый URL и опциональные настройки запроса.
  - `protected handleResponse(response: Response): Promise<object>`: Обрабатывает ответ от API, возвращая JSON-данные или отклоняя промис с сообщением об ошибке.
  - `get(uri: string)`: Выполняет GET-запрос по указанному URI и возвращает ответ от API.
  - `post(uri: string, data: object, method: ApiPostMethods = 'POST')`: Выполняет POST-запрос по указанному URI с переданными данными и методом, возвращая ответ от API.

## component.ts

### Component<T>

- Описание: Абстрактный базовый класс для создания компонентов, который предоставляет методы для работы с DOM-элементами.
- Параметры:
  - T - обобщенный тип, который позволяет компоненту работать с различными типами данных.
- Свойства:
  - container: HTMLElement - корневой элемент, в котором будет размещен компонент.

### Методы:

#### toggleClass(el: HTMLElement, className: string, force?: boolean):

- Описание: Переключает класс у указанного элемента.
- Параметры:
  - el: элемент, у которого будет переключаться класс.
  - className: имя класса для добавления или удаления.
  - force: (необязательный) булевое значение, указывающее, добавлять ли класс (true) или удалять (false).

#### setText(el: HTMLElement | null, value: string | null):

- Описание: Устанавливает текстовое содержимое элемента.
- Параметры:
  - el: элемент, текст которого будет установлен.
  - value: текстовое значение для установки.

#### setImage(el: HTMLImageElement | null, src: string | null):

- Описание: Устанавливает источник изображения для элемента.
- Параметры:
  - el: элемент изображения, которому будет установлен источник.
  - src: URL изображения.

#### setDisabled(el: HTMLButtonElement | null, disabled: boolean):

- Описание: Устанавливает состояние "disabled" для кнопки.
- Параметры:
  - el: элемент кнопки.
  - disabled: булевое значение, указывающее, должно ли состояние быть отключено.

#### setHidden(el: HTMLElement):

- Описание: Скрывает элемент, устанавливая стиль display в 'none'.
- Параметры:
  - el: элемент, который нужно скрыть.

#### setVisible(el: HTMLElement):

- Описание: Показывает элемент, убирая стиль display.
- Параметры:
  - el: элемент, который нужно показать.

#### render(data?: Partial<T>): HTMLElement:

- Описание: Обновляет данные компонента и возвращает корневой элемент.
- Параметры:
  - data: (необязательный) частичное обновление данных компонента.
    Возвращает: корневой DOM-элемент компонента.

### View<T>

- Описание: Класс, наследующий от Component, предназначенный для создания представлений с обработкой событий.

- Параметры:

T - обобщенный тип, аналогично классу Component.

- Свойства:

  - events: IEvents - интерфейс для работы с событиями, который позволяет управлять событиями в компоненте.
    Конструктор:

  - constructor(container: HTMLElement, events: IEvents):

- Параметры:
  - container: корневой элемент для компонента.
  - events: объект, реализующий интерфейс IEvents, для обработки событий.

### Типы

- T: Обобщенный тип, который используется для указания типа данных, с которыми будет работать компонент.

## View

## Общие элементы

## cart.ts

### Cart

- Описание:
  Класс Cart представляет собой компонент корзины, наследующий от базового класса View. Он реализует интерфейс CartInterface и отвечает за отображение товаров в корзине, управление общей суммой и обработку событий, связанных с оформлением заказа.

- Параметры конструктора

  - events: IEvents - объект, реализующий интерфейс для управления событиями. Используется для генерации событий, таких как открытие заказа.

- Свойства
  - static template: HTMLTemplateElement - шаблон для корзины, получаемый по ID элемента в DOM.
  - protected \_list: HTMLElement - элемент, в котором отображается список товаров в корзине.
  - protected \_total: HTMLElement - элемент, отображающий общую сумму товаров в корзине.
  - protected \_button: HTMLElement - кнопка для оформления заказа.

### Методы

#### constructor(events: IEvents)

- Инициализирует новый экземпляр класса Cart, клонируя шаблон корзины и устанавливая обработчик события на кнопку оформления заказа.

#### set items(items: HTMLElement[])

- Устанавливает список товаров в корзине.
- Параметры:
  - items: HTMLElement[] - массив элементов, представляющих товары.

#### set selected(items: string[])

- Устанавливает состояние выбора товаров.
- Параметры:
  - items: string[] - массив идентификаторов выбранных товаров.

#### set total(total: number)

- Устанавливает общую сумму товаров в корзине.
- Параметры:
  - total: number - общая сумма, которую необходимо отобразить.

#### Обработчики событий

- Кнопка оформления заказа:
  - При клике на кнопку генерируется событие order:open, которое может быть обработано в других частях приложения.

#### Обработка ошибок

- В случае отсутствия кнопки или элемента для отображения суммы, вызывается функция handleError, которая обрабатывает ошибки централизованно.

## form.ts

### Form<T>

- Описание:
  Класс Form<T> представляет собой компонент формы, который наследует от базового класса View<FormInterface>. Он предназначен для управления пользовательским вводом, валидацией и отправкой данных формы.

- Параметры конструктора

  - container: HTMLFormElement - элемент формы, в котором будут размещены поля ввода и кнопка отправки.
  - events: IEvents - объект, реализующий интерфейс для управления событиями, позволяющий генерировать и обрабатывать события, связанные с формой.

- Свойства
  - \_submit: HTMLButtonElement - кнопка отправки формы, которая будет активирована или деактивирована в зависимости от состояния валидации.
  - \_errors: HTMLElement - элемент, предназначенный для отображения ошибок валидации, если они возникают при вводе данных.
  - \_inputs: HTMLInputElement[] - массив полей ввода формы, которые будут отслеживаться для изменений и валидации.

### Методы

#### constructor:

- Инициализирует новый экземпляр класса, устанавливает обработчики событий для отслеживания изменений в полях ввода и отправки формы.

#### onInputChange(field: keyof T, value: string):

- Метод, который обрабатывает изменения в полях формы. При каждом изменении генерируется событие, содержащее имя поля и его новое значение.

#### set valid(value: boolean):

- Сеттер, который управляет состоянием кнопки отправки формы. Если значение true, кнопка становится активной; если false, кнопка отключается.

#### set errors(value: string):

- Сеттер, который обновляет текст ошибок валидации в соответствующем элементе. Если ошибки присутствуют, элемент отображается.

#### clearForm():

- Метод, который очищает все поля ввода формы и сбрасывает текст ошибок валидации.

#### checkRequiredFields():

- Метод, который проверяет наличие заполненных обязательных полей. Возвращает true, если все обязательные поля заполнены, и false в противном случае.

#### render(state: Partial<T> & FormInterface):

- Метод для рендеринга состояния формы. Обновляет состояние формы на основе переданных данных, включая состояние валидации и ошибки.

#### События

- ${this.container.name}:submit: Событие, которое излучается при отправке формы. Используется для обработки логики отправки данных в других частях приложения.
- ${this.container.name}.${String(field)}:change: Событие, которое излучается при изменении значения любого поля ввода. Содержит информацию о поле и его новом значении.

## modal.ts

### Modal

- Описание
  Класс Modal представляет собой модальное окно, которое наследует функциональность от базового класса View. Он предназначен для отображения контента в виде всплывающего окна с возможностью закрытия.

- Параметры конструктора

#### container: HTMLElement

- Контейнер, в котором будет размещено модальное окно.

#### events: IEvents

- Объект, реализующий интерфейс для управления событиями, позволяющий генерировать и обрабатывать события, связанные с модальным окном.

- Свойства

#### \_closeButton: HTMLButtonElement

- Кнопка, используемая для закрытия модального окна.

#### \_content: HTMLElement

- Элемент, содержащий контент модального окна.

### Методы

#### set content(value: HTMLElement):

- Устанавливает новое содержимое для модального окна, заменяя текущее содержимое.

#### open():

- Открывает модальное окно, добавляя класс modal_active к контейнеру и генерируя событие modal:open.

#### close():

- Закрывает модальное окно, убирая класс modal_active, очищая содержимое и генерируя событие modal:close.

#### render(data: ModalInterface):

- Рендерит модальное окно на основе переданных данных. Вызывает метод рендеринга родительского класса и открывает модальное окно.

#### События

#### modal:open:

- Генерируется при открытии модального окна.

#### modal:close:

- Генерируется при закрытии модального окна.

## succes.ts

### Succes

Класс Success представляет собой компонент, отображающий информацию об успешном заказе. Он наследует функциональность от базового класса Component и предназначен для отображения общей суммы заказа и предоставления возможности закрытия уведомления.

- Параметры конструктора

#### container: HTMLFormElement

- Контейнер, в котором будет размещен компонент успешного заказа.

#### actions: Action | undefined

- Объект, содержащий действия, которые могут быть выполнены при взаимодействии с компонентом. Может включать обработчик события нажатия на кнопку закрытия.

- Свойства

#### \_total: HTMLElement

- Элемент, предназначенный для отображения общей суммы заказа.

#### \_close: HTMLButtonElement

- Кнопка, используемая для закрытия компонента успешного заказа.

### Методы

#### set total(value: number):

- Сеттер, который обновляет текст общей суммы заказа, устанавливая его в элемент \_total. Формат текста включает указание суммы в "синапсах".

## Специфичные элементы

## card.ts

### Card

Класс Card представляет карточку товара и наследует функциональность от базового класса Component.

- Параметры конструктора

#### blockName: string

- Имя блока, используемое для генерации CSS классов.

#### container: HTMLElement

- Контейнер, в котором размещается карточка товара.

#### action: Action | undefined

- Объект, содержащий действия, которые могут быть выполнены при взаимодействии с карточкой.

- Свойства

#### \_title: HTMLElement

- Элемент, отображающий заголовок карточки.

#### \_category: HTMLElement

- Элемент, отображающий категорию карточки.

#### \_price: HTMLElement

- Элемент, отображающий цену карточки.

#### \_button: HTMLButtonElement

- Элемент кнопки для взаимодействия с карточкой.

- Методы

#### set id(value: string):

- Устанавливает идентификатор карточки в data-атрибут контейнера.

#### get id(): string

- Возвращает идентификатор карточки из data-атрибута.

#### set title(value: string):

- Устанавливает текст заголовка карточки.

#### get title(): string

- Возвращает текст заголовка карточки.

#### set button(value: string):

- Устанавливает текст кнопки карточки.

#### set selected(value: boolean):

- Устанавливает состояние кнопки (активна или неактивна).

#### set price(value: number | null):

- Устанавливает цену карточки, форматируя её для отображения.

#### set category(value: Categories):

- Устанавливает категорию карточки и обновляет соответствующий класс.

### Product

Класс Product наследует от класса Card и представляет продукт в карточке.

- Параметры конструктора

#### container: HTMLElement

- Контейнер, в котором размещается карточка продукта.

#### action: Action | undefined

- Объект, содержащий действия для взаимодействия с карточкой продукта.

### ProductPreview

Класс ProductPreview наследует от класса Product и добавляет дополнительные элементы для отображения информации о продукте.

- Свойства

#### \_description: HTMLElement

- Элемент, отображающий описание карточки.

#### \_image: HTMLImageElement

- Элемент, отображающий изображение карточки.

- Параметры конструктора

#### container: HTMLElement

- Контейнер, в котором размещается карточка предварительного просмотра продукта.

#### action: Action | undefined

- Объект, содержащий действия для взаимодействия с карточкой предварительного просмотра продукта.

### Методы

#### set image(value: string):

- Устанавливает источник изображения карточки.

#### set description(value: string):

- Устанавливает текст описания карточки.

## orderForm.ts

### OrderForm

Класс OrderForm представляет собой форму заказа, наследующую функциональность от базового класса Form. Он управляет кнопками для выбора метода оплаты (картой или наличными) и обрабатывает соответствующие события.

- Параметры конструктора

#### blockName: string

- Имя блока, используемое для генерации CSS классов, что позволяет стилизовать форму в соответствии с заданными правилами.

#### container: HTMLFormElement

- Элемент формы, в котором размещаются кнопки и другие элементы управления.

#### events: IEvents

- Интерфейс, содержащий события, связанные с формой, позволяющий обрабатывать пользовательские действия.

- Свойства

#### \_card: HTMLButtonElement

- Кнопка для оплаты картой. Используется для переключения состояния и обработки событий.

#### \_cash: HTMLButtonElement

- Кнопка для оплаты наличными. Аналогично, используется для управления состоянием и событиями.

### Методы

#### initPaymentButtons

- Метод, который инициализирует кнопки оплаты, добавляя обработчики событий для каждой кнопки.

#### setupButton

- Настраивает кнопку оплаты, добавляя обработчик события click, который переключает активное состояние кнопок и обрабатывает изменение ввода.

#### toggleActiveButton

- Управляет активным состоянием кнопок. Принимает тип оплаты и активирует соответствующую кнопку, изменяя её класс.

#### setPaymentMethod

- Устанавливает активный метод оплаты, вызывая метод для переключения активного состояния кнопок.

#### disableButtons

- Отключает активные состояния кнопок, сбрасывая их состояние.

#### render

- Переопределенный метод, который отвечает за отображение формы. Устанавливает активный способ оплаты на основе переданного состояния.

## page.ts

### Page

Класс Page расширяет функциональность базового класса View и реализует интерфейс PageInterface. Он отвечает за отображение страницы с элементами, такими как счётчик товаров в корзине, галерея товаров и корзина покупок.

- Параметры конструктора

#### container: HTMLElement

- Элемент, в который будет встроен экземпляр страницы. Этот параметр передается родительскому классу View.

#### events: IEvents

- Интерфейс для управления событиями, позволяющий генерировать и обрабатывать события на странице.

- Свойства

#### \_counter: HTMLElement

- Элемент, отображающий количество товаров в корзине. Инициализируется с помощью функции ensureElement.

#### \_gallery: HTMLElement

- Элемент, представляющий галерею товаров. Используется для отображения карточек товаров.

#### \_wrapper: HTMLElement

- Обертка для всей страницы, которая может использоваться для управления стилями и состоянием страницы.

#### \_cart: HTMLElement

- Элемент, представляющий корзину покупок. На него добавляется обработчик событий для открытия корзины.

#### Методы

#### set counter(value: number)

- Сеттер, который обновляет текст счётчика товаров в корзине. Принимает значение типа number и устанавливает его в виде строки.

#### set gallery(items: HTMLElement[])

- Сеттер, который обновляет содержимое галереи товаров. Принимает массив элементов типа HTMLElement и заменяет текущее содержимое галереи на новые карточки товаров.

#### set locked(value: boolean)

- Сеттер, который управляет блокировкой прокрутки страницы. Принимает значение типа boolean и добавляет или удаляет класс page\_\_wrapper_locked в зависимости от переданного значения.

#### События

#### basket:open

- Событие, генерируемое при клике на элемент корзины. Используется для открытия интерфейса корзины и отображения её содержимого.

## userInfo.ts

### UserInfo

Класс UserInfo наследует от базового класса Form и реализует интерфейс OrderFormInterface. Он предназначен для управления данными пользователя в форме заказа, включая поля для ввода электронной почты и телефона.

- Параметры конструктора

#### container: HTMLFormElement

- Элемент формы, в который будет встроен экземпляр класса. Этот параметр передается базовому классу Form.

#### events: IEvents

- Интерфейс, используемый для управления событиями, связанными с формой.

- Свойства

#### email: string

- Сеттер, который позволяет обновлять значение поля для ввода электронной почты. При установке значения, происходит поиск элемента input по имени и обновление его значения. В случае отсутствия элемента, вызывается функция обработки ошибок.

#### phone: string

- Сеттер, который позволяет обновлять значение поля для ввода телефона. Аналогично, при установке значения происходит поиск элемента input по имени и обновление его значения. Если элемент не найден, вызывается функция обработки ошибок.

## Model

## ApplicationState.ts

### ApplicationState

Класс ApplicationState реализует интерфейс ApplicationStateInterface и управляет состоянием приложения, включая информацию о товарах, корзине, заказе и валидацией форм. Он обеспечивает взаимодействие с данными о товарах и заказах, а также обработку событий.

- Параметры конструктора

#### events: IEvents

- Интерфейс для управления событиями, связанными с изменениями состояния приложения.

- Свойства

#### inventory: Item[]

- Массив, содержащий доступные для покупки товары.

#### cart: Item[]

- Массив, содержащий товары, добавленные в корзину.

#### orderInfo: OrderInterface

- Объект, содержащий информацию о заказе, включая: #### email: string –
  адрес электронной почты покупателя. #### phone: string –
  номер телефона покупателя. #### address: string –
  адрес доставки. #### payment: string –
  метод оплаты (по умолчанию 'card'). #### items: string[] –
  массив ID товаров в заказе. #### total: number –
  общая стоимость заказа.

#### formValidationErrors: ValidationErrors

- Объект, хранящий ошибки валидации формы.

#### preview: Item | null

- Текущий товар для предварительного просмотра.

#### Методы

#### populateInventory(items: Item[]): void

- Заполняет массив inventory данными товаров, полученными с сервера, и эмитирует событие изменения товаров.

#### addToCart(value: Item): void

- Добавляет товар в корзину и эмитирует событие изменения корзины.

#### isItemInCart(item: Item): boolean

- Проверяет, находится ли товар в корзине по его ID.

#### removeFromCart(id: string): void

- Удаляет товар из корзины по ID, обновляет информацию о заказе и эмитирует событие изменения корзины.

#### clearCart(): void

- Очищает корзину и эмитирует событие изменения корзины.

#### updateOrderItems()

- Обновляет информацию о заказе, заполняя массив ID товаров и вычисляя общую стоимость заказа.

#### getCartItemCount(): number

- Возвращает количество товаров в корзине.

#### calculateTotalCartCost(): number

- Вычисляет общую стоимость товаров в корзине.

#### setPreview(item: Item)

- Устанавливает текущее превью товара и эмитирует событие изменения превью.

#### updateOrderField(field: keyof OrderFormInterface, value: string): void

- Обновляет поля email, phone, address и payment в orderInfo, с проверкой корректности метода оплаты.

#### validateEmail(email: string): string | null

- Проверяет корректность адреса электронной почты.

#### validatePhone(phone: string): string | null

- Проверяет корректность номера телефона.

#### validateAddress(address: string): string | null

- Проверяет корректность адреса доставки.

#### validatePayment(payment: string): string | null

- Проверяет корректность метода оплаты.

#### validateContactInfo(): boolean

- Проверяет корректность контактной информации, используя методы валидации для каждого поля.

#### resetOrderInfo(): boolean

- Сбрасывает информацию о заказе к начальному состоянию и очищает корзину.

#### validateOrderInfo(): boolean

- Проверяет корректность деталей заказа, вызывая метод валидации контактной информации.

#### resetSelection(): void

- Сбрасывает поле selected у всех товаров в inventory после завершения покупки.

## Presenter

## index.ts

### Основной файл приложения

Этот файл отвечает за инициализацию приложения, обработку событий и взаимодействие с API. Он связывает различные компоненты, такие как страницы, корзина и форма заказа, обеспечивая их функциональность и взаимодействие.

#### Импорт необходимых модулей и компонентов

- **ApplicationApi**: Модуль для работы с API, который предоставляет методы для взаимодействия с сервером.
- **EventEmitter**: Модуль для управления событиями, позволяющий подписываться на события и их эмитацию.
- **Page**: Компонент, представляющий страницу приложения.
- **Modal**: Компонент модального окна, используемый для отображения информации пользователю.
- **Product, ProductPreview**: Компоненты для отображения карточек товара и их превью.
- **ApplicationState**: Класс, управляющий состоянием приложения, включая товары, корзину и заказы.
- **ensureElement, cloneTemplate, handleError**: Утилиты для работы с элементами DOM и обработки ошибок.
- **Item, OrderFormInterface**: Типы данных, используемые для описания товаров и структуры формы заказа.
- **API_URL, CDN_URL**: Константы, содержащие URL для API и CDN.
- **styles.scss**: Импорт стилей для приложения.
- **Cart**: Компонент, представляющий корзину покупок.
- **OrderForm**: Компонент формы заказа, позволяющий пользователю вводить информацию о заказе.
- **User Info**: Компонент, отображающий информацию о пользователе.
- **Success**: Компонент, отображающий сообщение об успешном завершении заказа.

### Экземпляры классов

- **applicationApi**: Экземпляр класса `ApplicationApi`, используемый для взаимодействия с API.
- **events**: Экземпляр класса `EventEmitter`, управляющий событиями в приложении.
- **applicationState**: Экземпляр класса `ApplicationState`, который хранит текущее состояние приложения.

### Шаблоны

- **cardCatalogTemplate**: Шаблон для отображения каталога карточек товара.
- **cardPreviewTemplate**: Шаблон для отображения превью карточки товара.
- **cardBasketTemplate**: Шаблон для отображения карточки товара в корзине.
- **orderTemplate**: Шаблон для формы заказа.
- **contactsTemplate**: Шаблон для ввода контактной информации.
- **successTemplate**: Шаблон для отображения сообщения об успешном завершении.
- **modalContainer**: Контейнер для модального окна.

### Компоненты

- **page**: Экземпляр класса `Page`, представляющий основную страницу приложения.
- **modal**: Экземпляр класса `Modal`, используемый для отображения модальных окон.
- **basket**: Экземпляр класса `Cart`, представляющий корзину покупок.
- **orderForm**: Экземпляр класса `OrderForm`, позволяющий пользователю вводить данные заказа.
- **contacts**: Экземпляр класса `User Info`, отображающий информацию о пользователе.

### Методы и события

- **applicationApi.getProductList()**: Метод для получения списка продуктов с сервера.
- **applicationState.populateInventory(items)**: Метод для заполнения инвентаря товарами.
- **events.on(eventName, callback)**: Метод для подписки на события.
- **events.emit(eventName, data)**: Метод для эмитации событий.

### События

- **modal:open**: Событие, срабатывающее при открытии модального окна. Блокирует страницу для предотвращения взаимодействия.
- **modal:close**: Событие, срабатывающее при закрытии модального окна. Разблокирует страницу.
- **card:select**: Событие, срабатывающее при выборе карточки товара. Устанавливает выбранный товар в качестве превью.
- **items:change**: Событие, срабатывающее при изменении элементов в корзине. Обновляет отображение товаров.
- **preview:change**: Событие, срабатывающее при изменении превью карточки товара. Обновляет состояние кнопки в зависимости от наличия товара в корзине.
- **basket:change**: Событие, срабатывающее при изменении содержимого корзины. Обновляет счетчик и общую стоимость.
- **basket:open**: Событие, срабатывающее при открытии корзины. Отображает содержимое корзины в модальном окне.
- **order:open**: Событие, срабатывающее при открытии формы заказа. Проверяет валидность адреса и отображает форму.
- **order:submit**: Событие, срабатывающее при отправке заказа. Проверяет валидность контактной информации.
- **contacts:submit**: Событие, срабатывающее при отправке контактной информации. Отправляет заказ на сервер и обрабатывает ответ от сервера. В случае успешной отправки отображает сообщение об успехе, в противном случае - сообщение об ошибке.
- **order:success**: Событие, срабатывающее при успешной обработке заказа. Отображает сообщение о подтверждении заказа и очищает корзину.
- **order:error**: Событие, срабатывающее при возникновении ошибки при обработке заказа. Отображает сообщение об ошибке и предлагает пользователю повторить попытку.

### Валидация данных

- **validateContactInfo(contactInfo)**: Метод для проверки корректности контактной информации, такой как имя, адрес электронной почты и номер телефона. Возвращает `true`, если информация корректна, и `false` в противном случае.
- **validatePaymentMethod(paymentMethod)**: Метод для проверки корректности выбранного метода оплаты. Убедитесь, что метод доступен и соответствует требованиям.
- **validateShippingAddress(address)**: Метод для проверки правильности адреса доставки. Проверяет наличие необходимых полей и их корректность.

## Утилиты

## ApplicationApi.ts

### ApplicationApi

Класс, который наследуется от базового класса Api. Он предназначен для взаимодействия с API приложения, предоставляя методы для получения списка продуктов, получения конкретного продукта и оформления заказа.

- Свойства:

#### cdn\*\*:

Тип: string  
 Базовый URL для изображений. Используется для формирования полного пути к изображениям продуктов.

- Конструктор:\*\*

#### constructor(cdn: string, baseUrl: string, options?: RequestInit)\*\*:

Конструктор класса, который инициализирует базовый URL для изображений и вызывает конструктор родительского класса Api.

- Параметры:
  - cdn: URL для CDN, который будет использоваться для формирования путей к изображениям.
  - baseUrl: Базовый URL API, к которому будут отправляться запросы.
  - options: Опциональные параметры запроса, передаваемые в родительский класс.

#### Методы:

#### getProductList()\*\*:

Возвращает: Promise<Item[]>  
 Выполняет GET-запрос к API для получения списка продуктов. Возвращает массив объектов Item, в которых каждое изображение формируется с использованием базового URL cdn.

#### getProductItem(id: string)\*\*:

Возвращает: Promise<Item>  
 Выполняет GET-запрос к API для получения конкретного продукта по его идентификатору. Возвращает объект Item, где изображение также формируется с использованием базового URL cdn.  
-Параметры:

- id: Идентификатор продукта, который необходимо получить.

#### orderProducts(order: OrderInterface)\*\*:

Возвращает: Promise<OrderResponse>  
 Выполняет POST-запрос к API для оформления заказа продуктов. Возвращает объект OrderResponse, содержащий информацию о заказе.  
 Параметры:

- order: Объект, соответствующий интерфейсу OrderInterface, который содержит данные о заказе.

## utils.ts

### Описание

Этот модуль содержит функции и типы, которые помогают в работе с DOM-элементами, валидацией данных и обработкой ошибок. Он включает функции для преобразования строк, проверки типов, создания элементов и работы с атрибутами `data-`.

### Функции

- `pascalToKebab(value: string): string`: Преобразует строку из формата PascalCase в формат kebab-case.
- `isSelector(x: any): x is string`: Проверяет, является ли переданное значение строкой и имеет ли длину больше 1.
- `isEmpty(value: any): boolean`: Проверяет, является ли значение `null` или `undefined`.
- `ensureAllElements<T extends HTMLElement>(selectorElement: SelectorCollection<T>, context?: HTMLElement): T[]`: Возвращает массив элементов, соответствующих селектору, из указанного контекста.
- `ensureElement<T extends HTMLElement>(selectorElement: SelectorElement<T>, context?: HTMLElement): T`: Убедитесь, что селектор указывает на единственный элемент, выбрасывает ошибку, если элемент не найден или найдено несколько.
- `cloneTemplate<T extends HTMLElement>(query: string | HTMLTemplateElement): T`: Клонирует содержимое указанного шаблона.
- `bem(block: string, element?: string, modifier?: string): { name: string; class: string }`: Генерирует имена классов в формате BEM (Block Element Modifier).
- `getObjectProperties(obj: object, filter?: (name: string, prop: PropertyDescriptor) => boolean): string[]`: Возвращает список свойств объекта, с возможностью фильтрации.
- `setElementData<T extends Record<string, unknown> | object>(el: HTMLElement, data: T)`: Устанавливает атрибуты `data-` для указанного элемента.
- `getElementData<T extends Record<string, unknown>>(el: HTMLElement, scheme: Record<string, Function>): T`: Получает данные из атрибутов `data-` элемента и преобразует их по заданной схеме.
- `isPlainObject(obj: unknown): obj is object`: Проверяет, является ли объект простым объектом.
- `isBoolean(v: unknown): v is boolean`: Проверяет, является ли значение булевым.
- `createElement<T extends HTMLElement>(tagName: keyof HTMLElementTagNameMap, props?: Partial<Record<keyof T, string | boolean | object>>, children?: HTMLElement | HTMLElement[]): T`: Создает новый элемент DOM с указанными свойствами и дочерними элементами.
- `handlePrice(price: number): string`: Форматирует цену, добавляя пробелы каждые три цифры.
- `handleError(errorMessage: string): void`: Логирует сообщение об ошибке в консоль.

## constants.ts

### Описание

Этот модуль содержит константы для базового URL API и URL контента, а также объекты для сопоставления категорий и методов оплаты. Он использует типы `CategoryMapping` и `PaymentMapping`, импортированные из файла `../types`.

### Константы

- `API_URL`: Базовый URL API, формируемый из переменной окружения `API_ORIGIN`. Используется для взаимодействия с API.
- `CDN_URL`: URL контента, также формируемый из переменной окружения `API_ORIGIN`. Используется для доступа к статическому контенту.

### Сопоставления

- `categoryMapping: CategoryMapping`: Объект, который сопоставляет категории с соответствующими CSS классами:

  - `'софт-скил'`: `'card__category_soft'`
  - `'другое'`: `'card__category_other'`
  - `'дополнительное'`: `'card__category_additional'`
  - `'кнопка'`: `'card__category_button'`
  - `'хард-скил'`: `'card__category_hard'`

- `paymentMapping: PaymentMapping`: Объект, который сопоставляет методы оплаты с текстовыми значениями:
  - `'card'`: `'Онлайн'`
  - `'cash'`: `'При получении'`
  - `'other'`: `'По-другому ¯\\_( ͡° ͜ʖ ͡°)_/¯'`
