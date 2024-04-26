# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- `src/ `— исходные файлы проекта
- `src/components/` — папка с JS компонентами
- `src/components/base/` — папка с базовым кодом

Важные файлы:
- `src/pages/index.html` — HTML-файл главной страницы
- `src/types/index.ts` — файл с типами
- `src/index.ts` — точка входа приложения
- `src/styles/styles.scss` — корневой файл стилей
- `src/utils/constants.ts` — файл с константами
- `src/utils/utils.ts` — файл с утилитами

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



# Описание проекта

## Класс **Api**

Класс `Api` предоставляет методы для выполнения HTTP запросов к удаленному серверу.

- `constructor`: конструктор класса, принимает базовый URL и настройки запроса по умолчанию.
- `get`: метод для выполнения GET запроса к API.
- `post`: метод для выполнения POST запроса к API с передачей данных в теле запроса.
- `handleResponse`: метод для обработки ответа от сервера, в случае успешного ответа возвращает данные в формате объекта, иначе возвращает ошибку.

Этот класс упрощает выполнение запросов к API и обработку ответов, позволяя легко отправлять запросы и получать данные.


## Класс **EventEmitter**

Класс EventEmitter обеспечивает работу событий. Его функции: возможность установить и снять слушателей событий, вызвать слушателей при возникновении события

В классе `EventEmitter` используются следующие типы данных:
- `EventName`: строка или регулярное выражение, представляющее имя события.
- `Subscriber`: функция-подписчик на событие.
- `EmitterEvent`: объект, содержащий имя события и данные.

### Интерфейс `IEvents`

Интерфейс `IEvents` описывает методы, которые должны быть реализованы в классе `EventEmitter`:
- `on`: подписка на событие с указанием колбэка.
- `emit`: инициирование события и передача данных.
- `trigger`: создание триггера, который генерирует событие при вызове.

### Класс `EventEmitter`

Класс `EventEmitter` представляет собой реализацию брокера событий:
- `on`: устанавливает обработчик на событие.
- `off`: снимает обработчик с события.
- `emit`: инициирует событие и уведомляет подписчиков.
- `onAll`: устанавливает обработчик на все события.
- `offAll`: сбрасывает все обработчики.
- `trigger`: создает триггер, который инициирует событие при вызове.


## Класс **Component**

`Component` - это абстрактный класс, предоставляющий базовые методы для работы с DOM-элементами.

### Методы: 

- `constructor`: — принимает HTML-элемент;
- `toggleClass`: Переключает класс у указанного DOM-элемента.
- `setText`: Устанавливает текстовое содержимое для указанного DOM-элемента.
- `setDisabled`: Устанавливает состояние блокировки для указанного DOM-элемента.
- `setHidden`: Скрывает указанный DOM-элемент.
- `setVisible`: Делает указанный DOM-элемент видимым.
- `setImage`: Устанавливает изображение для указанного элемента `<img>` с возможностью указать альтернативный текст.
- `render`: Возвращает корневой DOM-элемент компонента с возможностью применения данных.


## Класс **Model**

`Model` - это абстрактный класс, который представляет модель данных с возможностью уведомления об изменениях. Он имеет конструктор для инициализации данных и объекта событий, а также метод для уведомления о изменениях модели.

- `constructor`: Принимает данные базовой модели и объект событий для дальнейшей обработки изменений.
- `Метод emitChanges`: Позволяет передавать указанное событие и, при необходимости, дополнительные данные для обновления модели.
- `Функция isModel`: Проверяет объект на принадлежность к типу Model.


## Класс **Cards**

`Cards` содержит функции и методы для управления карточками товаров.

### Методы: 

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `setPreview()`: отвечает за данные при открытии модального окна предпросмотра.
- `set...() / get...()`: устанавливает/получает данные для полей id, index, category, title, description, image, price, button.

### Типы: 

- id : идентификатор карточки.
- index : идентификатор карточки в корзине.
- category : категория карточки.
- title : название карточки.
- description : описание карточки.
- image : изоображение карточки.
- price : стоимость карточки.
- button : кнопка карточки.


## Класс **Basket**

`Basket` содержит основные функции и методы для управления корзиной товаров.

### Методы: 

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `set total()`: отображает общую сумму товаров в корзине.
- `set items()`: отображает список товаров в корзине.
- `set state()`: указывает на состояние кнопки, активна/не активна.
- `addToBasket()`: отвечает за добавление товара в корзину.
- `removeFromBasket()`: отвечает за удаление товара из корзины.
- `clearBasket()`: отвечает за очистку корзины.


## Класс **Order**

`Order` содержит функции и методы для установки данных о заказе.

### Методы: 

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `set...()`: отвечает за установку данных в полях address, payment, email, phone.

- payment : устанавливает один из двух методов оплаты.
- address : устанавливает адрес доставки.
- email : устанавливает электронную почту.
- phone : устанавливает номер телефона.


## Класс **Form**

`Form` содержит функции и методы для работы с формой заказа.

### Методы:

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `handleInput()`: обрабатывает изменения в поле формы.
- `set valid()`: устанавливает валидацию.
- `set errors()`: устанавливает ошибки.
- `validateOrderForm()`: отвечает за ошибки в форме.
- `setOrderField()`: отвечает за информацию для заказа в полях.
- `render()`: рендерит информацию с передачей данных.


## Класс **Page**

`Page` содержит функции и методы для управления страницей.

### Методы:

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `set catalog()`: отвечает за установку данных в каталоге товаров.
- `set counter()`: отвечает за счетчик на корзине.
- `set fixed()`: отвечает за фиксированность страницы при открытом модальном окне.


## Класс **Modal**

`Modal` содержит функции и методы для работы с модальными окнами.

### Методы:

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `set content()`: устанавливает контент в модальное окно.
- `openModal()`: отвечает за открытие модального окна.
- `closeModal()`: отвечает за закрытие модального окна.
- `render()`: рендерит информацию в модальном окне.


## Класс **Success**

`Success` содержит функции и методы для установки данных о успешном заказе.

### Методы:

- `constructor`: принимает HTML-элемент и объект обработчиков событий пользовательских действий.
- `set total()`: отображает общую стоимость заказа.


## Класс **AuctionAPI**

`AuctionAPI` содержит функции и методы для работы с API магазина.

### Методы:

- `getCardItem()`: отвечает за загрузку карточек на страницу.
- `getTotal()`: устанавливает общую сумму товаров в корзине.
- `order()`: отвечает за данные о заказе.