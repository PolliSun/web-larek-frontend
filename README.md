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
- `src/scss/styles.scss` — корневой файл стилей
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

# Архитектура проекта в стиле MVP

## 1. Основные части архитектуры проекта

Проектная архитектура следует принципам MVP (Model-View-Presenter).

## 2. Значение основных частей

1. Модель `(Model)`: Хранит данные, такие как информация о карточках товаров, состояние корзины, информация о заказе и другие данные.
Классы:
- Model,
- AppState,
- Order и Contact

2. Представление `(View)`: Отображает данные для пользователя и обрабатывает действия пользователя, такие как нажатия кнопок, заполнение форм и другие действия.
Классы:
- Component<T>,
- Card,
- Basket,
- Form<T>,
- Page,
- Success,
- Modal

3. Представитель `(Presenter)`: Выполняет бизнес-логику, такую как добавление товаров в корзину, оформление заказа и обработка платежей.
Классы:
- Api,
- EventEmitter,
- CardsApi


## 3. Взаимодействие частей

1. `View` отвечает за отображение пользовательского интерфейса и за обработку событий, происходящих на странице. Когда пользователь взаимодействует с интерфейсом, например, кликает на кнопку или заполняет форму, представление перехватывает эти действия и передает их представителю для дальнейшей обработки.
2. `Presenter` компонент который принимает запросы от представления и взаимодействует с моделью для получения или обновления данных. После обработки запроса представитель передает обновленные данные обратно в представление для отображения пользователю.
3. `Model` хранит данные и бизнес-логику приложения. Она предоставляет интерфейс для доступа к данным. Обрабатывает запросы от представителя и возвращает необходимую информацию.

## 4. Используемые данные

### 1. ICard
Этот интерфейс представляет информацию о карточке товара. Включает в себя следующие свойства:

```
id: string - Уникальный идентификатор карточки товара.
index (опционально): string - Индекс карточки, используемый для идентификации и сортировки.
category: string - Категория товара.
title: string - Название товара.
description: string - Описание товара.
image: string - URL изображения товара.
price: number - Цена товара. Может быть числом или null, если цена не определена.
```

### 2. IBasketModal
Этот интерфейс расширяет ICard и добавляет информацию, специфичную для модального окна корзины. Включает в себя:

```
Все свойства из ICard.
total: number - Общая стоимость товаров в корзине.
items: HTMLElement[] - Массив элементов HTML, представляющих товары в корзине.
```

### 3. ICardModal
Этот интерфейс также расширяет ICard, но предназначен для использования в модальном окне карточки товара. Включает в себя:

```
Все свойства из ICard.
button: string - Текст кнопки для карточки.
index: string - Индекс карточки.
```

### 4. IForm
Этот интерфейс представляет состояние формы и содержит информацию о ее валидности и об ошибках, если они есть. Включает в себя:

```
valid: boolean - Флаг, указывающий, является ли форма валидной.
errors: string[] - Массив строк с сообщениями об ошибках в форме.
```

### 5. IPage
Этот интерфейс представляет состояние страницы и включает в себя информацию о каталоге товаров, количестве элементов и фиксации положения страницы. Включает в себя:

```
catalog: HTMLElement[] - Массив элементов HTML, представляющих товары в каталоге.
counter: number - Счетчик, показывающий количество элементов в корзине.
fixed: boolean- Флаг, указывающий, зафиксировано ли положение страницы при открытом/закрытом модальном окне.
```

### 6. IPaymentForm
Этот интерфейс содержит информацию о форме оплаты. Включает в себя:

```
payment: string - Способ оплаты.
address: string - Адрес доставки.
```

### 7. IContactsForm
Этот интерфейс содержит информацию о форме контактов. Включает в себя:

```
email: string - Адрес электронной почты.
phone: string - Номер телефона.
```

### 8. IOrder
Этот интерфейс представляет информацию о заказе и объединяет данные из IPaymentForm и IContactsForm. Включает в себя:

```
items: string[] - Массив идентификаторов товаров в заказе.
total: number - Общая стоимость заказа.
```

### 9. IOrderResult
Этот интерфейс представляет результат заказа и содержит идентификатор заказа и общую стоимость. Включает в себя:

```
id: string - Уникальный идентификатор заказа.
total: number - Общая стоимость заказа.
```

### 10. ISuccessModal
Этот интерфейс содержит информацию о модальном окне успешного заказа. Включает в себя:

```
total: number - Общая стоимость успешно завершенного заказа.
```

### 11. IModal
Этот интерфейс представляет модальное окно и содержит его содержимое. Включает в себя:

```
content: HTMLElement - Элемент HTML, содержащий содержимое модального окна.
```

### 12. IAppState
Этот интерфейс представляет состояние приложения и содержит данные о каталоге товаров, корзине, заказе и фиксации положения страницы. Включает в себя:

```
catalog: ICard[] - Массив карточек товаров в каталоге.
basket: ICard[] - Массив карточек товаров в корзине.
order: IOrder | null - Информацию о текущем заказе или null, если заказ не оформлен.
fixed: boolean - Флаг, указывающий, зафиксировано ли положение страницы при открытом/закрытом модальном окне.
```

### 13. FormErrors
Этот тип представляет ошибки формы заказа и содержит частичный объект с ключами из IOrder и значениями строк с сообщениями об ошибках.

`export type FormErrors = Partial<Record<keyof IOrder, string>>;`

# Описание проекта

## Класс **Api**

Класс `Api` предоставляет методы для выполнения HTTP запросов к удаленному серверу.

### Методы: 

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

### Методы: 

- `on`: устанавливает обработчик на событие.
- `off`: снимает обработчик с события.
- `emit`: инициирует событие и уведомляет подписчиков.
- `onAll`: устанавливает обработчик на все события.
- `offAll`: сбрасывает все обработчики.
- `trigger`: создает триггер, который инициирует событие при вызове.


## Класс **Component**

```
abstract class Component<T> {
	protected constructor(protected readonly container: HTMLElement) }
```

Aбстрактный rласс `Component<T>` служит в качестве основы для создания компонентов интерфейса, которые взаимодействуют с пользователем.
Другие классы представления могут наследоваться от Component и использовать его методы для управления DOM-элементами и отображения данных на странице.

Данные для отображения передаются в метод render в виде объекта типа `T`, который используется для обновления DOM-элементов на основе переданных данных.

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

Класс `Model` служит для представления модели данных и обработки событий, связанных с изменением данных.
Внешние компоненты могут обращаться к классу Model для создания экземпляров модели и работы с данными.
Он представляет бизнес-логику и хранение данных, связанных с определенным аспектом приложения.

### Методы: 
```
constructor(data: Partial<T>, protected events: IEvents)
```

- `constructor(data: Partial<T>, events: IEvents):`: Принимает данные базовой модели и объект событий в виде частичного объекта типа T и объект событий events для дальнейшей обработки изменений.
- `emitChanges(event: string, payload?: object)`: Позволяет передавать указанное событие и, при необходимости, дополнительные данные для обновления модели.
- `isModel`: Проверяет объект на принадлежность к типу Model.


## Класс **Cards**

Класс `Card` представляет компонент карточки товара, который взаимодействует с пользователем и обрабатывает действия с карточкой товара.

Экземпляры класса Card создаются при загрузке страницы для каждой карточки товара на странице.

- При добавлении товара в корзину класс корзины вызывает соответствующий метод у счетчика товаров.
- Счетчик обновляет счетчик на кнопке корзины.
- При удалении товара из корзины класс корзины также вызывает метод у счетчика для обновления счетчика на кнопке.

Card (наследуется от Component):
```
class Card extends Component<ICardModal>
```

### Методы: 

```
interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

constructor(container: HTMLElement, actions?: ICardActions) {}
```

- `constructor(container: HTMLElement, actions?: ICardActions)`: Конструктор класса принимает HTML-элемент контейнера (container), который представляет собой карточку товара на веб-странице, а также объект actions, содержащий обработчик события клика на кнопку карточки товара. В конструкторе инициализируются свойства _index, _category, _title, _description, _image, _price и _button, которые представляют соответствующие элементы HTML внутри карточки товара. Если указан обработчик клика (actions.onClick), он добавляется к кнопке карточки товара.

- `get id`(): string: Этот метод-геттер возвращает идентификатор карточки товара, который хранится в атрибуте data-id HTML-контейнера карточки.
- `set id`(value: string): Этот метод-сеттер устанавливает идентификатор карточки товара путем установки значения атрибута data-id HTML-контейнера карточки.
- `get index`(): string: Этот метод-геттер возвращает индекс карточки товара.
- `set index`(value: string): Этот метод-сеттер устанавливает индекс карточки товара.
- `get category`(): string: Этот метод-геттер возвращает категорию товара.
- `set category`(value: string): Этот метод-сеттер устанавливает категорию товара и соответствующим образом обновляет классы CSS для отображения категории.
- `get title`(): string: Этот метод-геттер возвращает заголовок карточки товара.
- `set title`(value: string): Этот метод-сеттер устанавливает заголовок карточки товара.
- `set description`(value: string | string[]): Этот метод устанавливает описание товара. Если передан массив строк, описание заменяется на соответствующие HTML-элементы, представляющие строки описания.
- `set image`(value: string): Этот метод устанавливает изображение товара.
- `set price`(value: number | null): Этот метод устанавливает цену товара. Если значение цены равно null, устанавливается текст "Бесценно", и кнопка добавления в корзину отключается.
- `disableAddBasketButton`(): Этот метод отключает кнопку добавления товара в корзину.
- `set button`(value: string): Этот метод устанавливает текст на кнопке карточки товара.


## Класс **Basket**

`Basket` хранит информацию о товарах в корзине, их количестве и общей стоимости. 

Экземпляр Basket создается при загрузке страницы или при событии, которое указывает на необходимость отображения корзины.

- Класс использует объект events для обработки событий, связанных с корзиной.
- Получает данные о товарах в корзине из других компонентов из Cart. После получения этих данных Basket обновляет отображаемую информацию о корзине, такую как список товаров и общую стоимость.

Basket (наследуется от Component):
```
class Basket extends Component<IBasketModal>
```

### Методы: 

```
constructor(container: HTMLElement, protected events: EventEmitter)
```

- `constructor(container: HTMLElement, protected events: EventEmitter)`: Этот конструктор принимает HTML-элемент контейнера (container), который представляет корзину на веб-странице, и объект событий (events), который используется для обработки событий, связанных с корзиной. В конструкторе инициализируются свойства _list, _total, _button, _index и _price, которые представляют элементы HTML внутри корзины. Затем устанавливается обработчик событий на кнопку корзины, чтобы открыть заказ при её нажатии.

- `set items`(items: HTMLElement[]): Этот метод устанавливает элементы товаров в корзину. Он принимает массив HTML-элементов (items), представляющих товары, и заменяет содержимое списка корзины (_list) этими элементами. Если массив пуст, метод отображает сообщение о том, что корзина пуста.
- `set total`(value: number): Этот метод устанавливает общую стоимость товаров в корзине. Он принимает числовое значение (value), представляющее общую стоимость, и отображает его в соответствующем элементе корзины (_total).
- `toggleBasketButton`(state: boolean): Этот метод переключает состояние кнопки корзины. Он принимает булевое значение (state), указывающее, должна ли кнопка быть отключена (true) или включена (false), и устанавливает соответствующее состояние для кнопки корзины (_button).


## Класс **Order и Contact**

`Order и Contact` содержит функции и методы для установки данных о заказе.

Order хранит данные, связанные с оплатой заказа, такие как выбранный метод оплаты и адрес доставки.
Экземпляр Order создается при загрузке страницы или при событии, которое указывает на необходимость отображения формы оформления заказа.

Contact хранит данные, связанные с контактной информацией пользователя, такие как адрес электронной почты и номер телефона.
Экземпляр Contact также создается при загрузке страницы или при событии, которое указывает на необходимость отображения формы контактной информации.

Order и Contact, используют объект events для обработки событий, связанных с изменением данных в формах. Например, при выборе способа оплаты или изменении контактной информации, соответствующий класс генерирует событие, которое может быть обработано другими компонентами. Обновлять данные в формах в соответствии с введенной пользователем информацией

Order и Contact (наследуется от Form):
```
class Order extends Form<IPaymentForm>{}
class Contact extends Form<IContactsForm>{}
```

### Методы: 

```
constructor(container: HTMLFormElement, protected events: IEvents) {}
```

- `constructor(container: HTMLFormElement, events: IEvents)`: принимает два параметра: container и events. Параметр container представляет HTML-форму, которая используется для заказа товара. Параметр events представляет объект, который реализует интерфейс IEvents и используется для обработки событий.

- `clearAltButtons()`: Этот метод очищает текст кнопки оплаты от активных стилей. Он проходит по всем кнопкам оплаты (_buttonsPay) и удаляет класс 'button_alt-active', который отвечает за активное состояние кнопки.
- `set selected`(name: string): Этот метод устанавливает выбранный метод оплаты в форме заказа. Он принимает имя выбранной кнопки оплаты (name) и устанавливает активный стиль для соответствующей кнопки альтернативной оплаты. Затем он генерирует событие 'payment:change', чтобы оповестить о изменении метода оплаты.
- `set address`(value: string): Этот метод устанавливает значение адреса в поле ввода в форме заказа. Он получает значение (value) и устанавливает его в соответствующее поле ввода.
- `set email`(value: string): Этот метод устанавливает значение электронной почты в поле ввода в форме контактной информации. Он получает значение (value) и устанавливает его в соответствующее поле ввода.
- `set phone`(value: string): Этот метод устанавливает значение номера телефона в поле ввода в форме контактной информации. Он получает значение (value) и устанавливает его в соответствующее поле ввода.


## Класс **Form**

`Form` содержит методы для отображения ошибок, управления состоянием формы и обработки введенных пользователем данных.

Экземпляр класса Form создается в момент загрузки веб-страницы или при необходимости динамического добавления формы на страницу.

Класс Form хранит данные формы, такие как ссылки на кнопку отправки формы (_submit) и элементы для отображения ошибок (_errors).
Данные, введенные пользователем в форму, передаются классу Form через события input, которые обрабатываются в методе onInputChange.
Когда форма отправляется, класс Form генерирует событие submit, которое передает уведомление о отправке формы.

Form (наследуется от Component):
```
class Form<T> extends Component<IForm>
```

### Методы:

```
constructor(container: HTMLFormElement, protected events: IEvents) {}
```

- `constructor(container: HTMLFormElement, protected events: IEvents)`: Конструктор класса Form принимает HTML-элемент формы (container) и объект событий (events). В конструкторе инициализируются свойства _submit и _errors, которые представляют кнопку отправки формы и контейнер для отображения ошибок, соответственно. Также добавляются обработчики событий для ввода данных и отправки формы.

- `onInputChange`(field: keyof T, value: string): Этот защищенный метод вызывается при изменении значений в полях ввода формы. Он генерирует событие change для каждого поля ввода, указывая имя поля и новое значение.
- `set valid`(value: boolean): Этот сеттер устанавливает состояние доступности кнопки отправки формы в зависимости от ее валидности. Если форма валидна, кнопка разблокируется, в противном случае - блокируется.
- `set errors`(value: string): Этот сеттер устанавливает текст сообщения об ошибке в контейнере для отображения ошибок на форме.
- `render(state: Partial<T> & IForm)`: Этот метод рендерит состояние формы, принимая на вход объект состояния формы. Он обновляет состояние валидности формы, отображает сообщения об ошибках и применяет значения к полям ввода.


## Класс **Page**

`Page` содержит функции и методы для управления страницей.

Экземпляр класса Page создается при загрузке страницы или при необходимости отображения новой страницы в приложении.
В конструкторе класса Page происходит инициализация свойств, представляющих элементы страницы, такие как каталог товаров, счетчик корзины и кнопка корзины.

Класс Page использует объект events, который представляет экземпляр класса событий (IEvents), для отправки уведомлений о событиях, происходящих на странице.
В данном случае, при клике на кнопку корзины (_basket), класс Page генерирует событие basket:open, чтобы уведомить другие части приложения о необходимости открытия корзины.

Page (наследуется от Component):
```
class Page extends Component<IPage>
```

### Методы:
```
constructor(container: HTMLElement, protected events: IEvents) {}
```

- `constructor(container: HTMLElement, protected events: IEvents)`: Создает экземпляр класса Page с HTML-элементом контейнера страницы и объектом событий. Внутри конструктора инициализируются свойства _catalog, _counter, _wrapper и _basket, а также добавляется обработчик события клика на кнопке корзины для генерации события 'basket:open'.

- `set counter`(value: number): Устанавливает значение счетчика товаров в корзине. Принимает число value и устанавливает его как текстовое содержимое элемента _counter.
- `set catalog`(items: HTMLElement[]): Заменяет текущие элементы в каталоге новыми элементами. Принимает массив HTML-элементов items и заменяет текущие элементы в _catalog на новые элементы, переданные в массиве.
- `set fixed`(value: boolean): Управляет фиксацией обертки страницы. Принимает булево значение value. Если true, у обертки страницы удаляется класс page__wrapper_locked, разрешая прокрутку содержимого. Если false, добавляется класс page__wrapper_locked, блокирующий прокрутку содержимого.


## Класс **Modal**

`Modal` содержит функции и методы для работы с модальными окнами.

Создание экземпляров классов происходит в момент необходимости открытия модального окна на веб-странице. Будет создан экземпляр Modal, который затем будет отображать определенный контент в модальном окне.

Modal (наследуется от Component):
```
class Modal extends Component<IModal>
```
### Методы:
```
constructor(container: HTMLElement, protected events: IEvents){}
```

- `constructor(container: HTMLElement, protected events: IEvents)`: Конструктор класса Modal принимает HTML-элемент контейнера модального окна и объект событий. В конструкторе инициализируются свойства _closeButton и _content, представляющие кнопку закрытия и содержимое модального окна соответственно. Добавляются обработчики событий для закрытия модального окна при клике на кнопку закрытия, клике вне модального окна и предотвращается закрытие модального окна при клике на его содержимое.

- `set content`(value: HTMLElement): Устанавливает содержимое модального окна. Принимает HTML-элемент value и заменяет текущее содержимое внутри модального окна новым элементом.
- `open`(): Открывает модальное окно, добавляя класс modal_active к контейнеру модального окна и генерирует событие 'modal:open'.
- `close`(): Закрывает модальное окно, удаляя класс modal_active у контейнера модального окна, очищает его содержимое и генерирует событие 'modal:close'.
- `render`(data: IModal): HTMLElement: Рендерит содержимое модального окна на основе данных data. Вызывает метод open(), чтобы показать модальное окно, и возвращает контейнер модального окна.


## Класс **Success**

`Success` представляет модальное окно с сообщением об успешном оформлении заказа.

Создание экземпляров класса Success происходит в момент необходимости показать модальное окно с сообщением об успешном завершении действия. После успешного оформления заказа создается экземпляр Success, который отобразит сообщение об успешном завершении заказа.

Success (наследуется от Component):
```
interface ISuccessActions {
	onClick: () => void;
}
class Success extends Component<ISuccessModal> 
```

### Методы:
```
constructor(conteiner: HTMLElement, actions?: ISuccessActions){}
```

- `constructor(conteiner: HTMLElement, actions?: ISuccessActions)`: Конструктор класса Success принимает HTML-элемент контейнера модального окна (conteiner) и объект действий (actions), которые могут быть выполнены при взаимодействии с модальным окном. В конструкторе инициализируются свойства _total и _close, которые представляют контейнер с общим сообщением и кнопку закрытия модального окна соответственно. Если передан объект действий, устанавливается обработчик события для кнопки закрытия.

- `set total`(total: string): Этот метод устанавливает текст общего сообщения в модальном окне. Принимает строку total и устанавливает ее в качестве текста сообщения.


## Класс **CardsApi**

`CardsApi` содержит функции и методы для работы с API магазина. Предоставляет методы для работы с данными, такими как получение информации о карточках и оформление заказа.

Создание экземпляров класса CardsApi происходит в момент инициализации приложения или при необходимости работы с API. Например, при загрузке страницы или при выполнении действий пользователя, требующих взаимодействия с сервером.


Класс CardsApi наследуется от класса Api. Он реализует интерфейс ILarekAPI.
Класс Api представляет базовый класс для работы с API. А класс CardsApi расширяет его функциональность для работы с конкретными запросами и данными, связанными с карточками. 
```
class CardsApi extends Api implements ILarekAPI
```

### Методы:
```
constructor(cdn: string, baseUrl: string, options?: RequestInit) {}
```

- `constructor(cdn: string, baseUrl: string, options?: RequestInit)`: Конструктор класса CardsApi принимает строку cdn - URL, строку baseUrl - базовый URL для API, и объект options - опции для запроса. В конструкторе инициализируются свойства cdn и вызывается конструктор базового класса Api, передавая ему базовый URL и опции запроса.

- `getCardItem`(): Этот метод отправляет GET-запрос на сервер для получения информации о картах. После получения данных, метод обрабатывает их, добавляя URL CDN к изображениям карт и возвращает массив объектов карточек.
- `orderCards`(order: IOrder): Этот метод отправляет POST-запрос на сервер для оформления заказа. После получения данных о результате заказа, метод возвращает объект результата заказа.


## Класс **AppState**

Класс `AppState` представляет модель состояния приложения. 

Экземпляр AppState создается при инициализации приложения и используется в течение всего цикла использования приложения.

AppState наследуется от Model, что позволяет ему управлять состоянием данных и уведомлять представления об изменениях.
```
class AppState extends Model<IAppState> 
```

Представления используют AppState для отображения данных и реагирования на изменения в модели. Например, при изменении состояния корзины (basket) представление обновляет отображение корзины на экране.
AppState может взаимодействовать с классами, обеспечивающими связь с сервером для получения и отправки данных. Например, при добавлении товара в корзину (addToBasket()), может отправляться запрос на сервер для обновления данных о заказе.

### Хранение данных:

- catalog: Массив объектов карточек товаров, полученных с сервера.
- basket: Массив объектов карточек товаров, добавленных в корзину.
- order: Объект, содержащий информацию о заказе, такую как адрес доставки, способ оплаты, контактные данные и список товаров в заказе.
- formErrors: Объект с информацией об ошибках валидации форм заказа.

### Методы:

- `setCatalog(items: ICard[])`: Этот метод устанавливает каталог товаров. Принимает массив объектов карточек товаров (items). Для каждой карточки вызывается функция getProduct, которая обрабатывает данные карточки и добавляет их в каталог. Затем метод вызывает emitChanges, чтобы оповестить об изменении данных.
- `getProduct (item: ICard, events: IEvents): ICard` предназначен для обработки данных карточки товара (ICard). Он принимает объект item типа ICard, содержащий информацию о товаре, а также объект событий events типа IEvents, который пока не используется в этой функции. Внутри метода создается новый объект, содержащий необходимые поля для отображения товара. Эти поля включают id, description, image, title, category, price, которые копируются из исходного объекта item.
- `findFromBasket`(item: ICard): Этот метод ищет товар в корзине по его идентификатору. Принимает объект карточки товара (item). Возвращает найденный объект карточки товара из корзины или undefined, если товар не найден.
- `addToBasket`(item: ICard): Этот метод добавляет товар в корзину. Принимает объект карточки товара (item). Добавляет товар в массив корзины и вызывает метод reloadBasket для обновления состояния корзины.
- `removeFromBasket`(item: ICard): Этот метод удаляет товар из корзины. Принимает объект карточки товара (item). Удаляет товар из массива корзины и вызывает метод reloadBasket для обновления состояния корзины.
- `reloadBasket`(): Этот метод перезагружает состояние корзины. Он вызывается после изменений в корзине и отправляет события об изменении количества товаров и изменении самой корзины.
- `clearBasket`(): Этот метод очищает корзину. Устанавливает пустой массив для корзины и обновляет состояние корзины.
- `clearOrder`(): Этот метод очищает данные о заказе. Устанавливает пустые значения для свойств заказа и обновляет состояние заказа.
- `validateAddressForm`(): Этот метод проверяет форму адреса на валидность. Проверяет наличие адреса доставки и выбранного способа оплаты. Если есть ошибки, устанавливает их и оповещает об изменении ошибок.
- `validateContactsForm`(): Этот метод проверяет форму контактных данных на валидность. Проверяет наличие номера телефона и электронной почты. Если есть ошибки, устанавливает их и оповещает об изменении ошибок.
- `setOrderFieldPaymentForm`(field: keyof IPaymentForm, value: string): Этот метод устанавливает значение поля в форме оплаты. Принимает ключ поля и его значение. Если форма адреса валидна, вызывает событие о готовности заказа.
- `setOrderFieldContactsForm`(field: keyof IContactsForm, value: string): Этот метод устанавливает значение поля в форме контактных данных. Принимает ключ поля и его значение. Если форма контактных данных валидна, вызывает событие о готовности заказа.
- `getTotal`(): Этот метод вычисляет общую стоимость товаров в корзине. Возвращает сумму цен всех товаров в корзине.