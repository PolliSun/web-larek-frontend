import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { CardsApi } from './components/LarekAPI';
import { CDN_URL, API_URL } from './utils/constants';
import { Modal } from './components/common/Modal';
import { ensureElement, cloneTemplate } from '../src/utils/utils';
import { Page } from './components/common/Page';
import { AppState, CatalogChangeEvent } from './components/AppData';
import { Card } from './components/common/Card';
import { ICard, IPaymentForm, IContactsForm } from './types';
import { Basket } from './components/common/Basket';
import { Order, Contact } from './components/common/Order';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new CardsApi(CDN_URL, API_URL);
const appData = new AppState({}, events);
const page = new Page(document.body, events);

const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const addressFormTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsFormTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

const basket = new Basket(cloneTemplate(basketTemplate), events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const order = new Order(cloneTemplate(addressFormTemplate), events);
const contacts = new Contact(cloneTemplate(contactsFormTemplate), events);

//Отслживаем все события
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

//Подключение и выгрузка картчек на страницу
api
	.getCardItem()
	.then(appData.setCatalog.bind(appData))
	.catch((error) => console.error(error));

//Изменение на странице
events.on<CatalogChangeEvent>('items:changed', () => {
	page.catalog = appData.catalog.map((item) => {
		const card = new Card(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});

		return card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			price: item.price,
		});
	});
});

//Открыть карточку
events.on('card:select', (item: ICard) => {
	const card = new Card(cloneTemplate(cardPreviewTemplate), {
		onClick: () => {
			card.button = appData.findFromBasket(item)
				? 'В корзину'
				: 'Удалить из корзины';
			if (!appData.findFromBasket(item)) {
				appData.addToBasket(item);
			} else {
				appData.removeFromBasket(item);
			}
		},
	});

	modal.render({
		content: card.render({
			category: item.category,
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			button: appData.findFromBasket(item) ? 'Удалить из корзины' : 'В корзину',
		}),
	});
});

//Открыть корзину
events.on('basket:open', () => {
	modal.render({ content: basket.render() });
});

events.on('basket:changed', (items: ICard[]) => {
	page.counter = appData.basket.length;
	basket.items = appData.basket.map((item, index) => {
		const card = new Card(cloneTemplate(cardBasketTemplate), {
			onClick: () => {
				appData.removeFromBasket(item);
			},
		});

		return card.render({
			index: String(index + 1),
			title: item.title,
			price: item.price,
		});
	});

	if (appData.basket.length > 0) {
		basket.toggleBasketButton(false);
	} else {
		basket.toggleBasketButton(true);
	}

	basket.total = appData.getTotal();
});

//Информация о заказе и данных с полей
events.on('contacts:submit', () => {
	appData.order.total = appData.getTotal();

	api
		.orderCards(appData.order)
		.then(() => {
			const success = new Success(cloneTemplate(successTemplate), {
				onClick: () => {
					modal.close();
				},
			});

			success.total = `Списано ${appData.order.total} синапсов`;
			appData.clearBasket();
			appData.clearOrder();
			order.clearAltButtons();

			modal.render({
				content: success.render({}),
			});
		})
		.catch((error) => console.error(error));
});

//Отслеживание валидности формы с оплатой и адресом
events.on('formErrorsOrder:change', (errors: Partial<IPaymentForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('.    ');
});

//Отслеживание валидности формы с почтой и телефоном
events.on('formErrorsContacts:change', (errors: Partial<IContactsForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ email, phone })
		.filter((i) => !!i)
		.join('.    ');
});

//Открыть форму с оплатой и адресом
events.on('order:open', () => {
	appData.order.items = appData.basket.map((item) => item.id);
	modal.render({
		content: order.render({
			address: '',
			valid: false,
			errors: [],
		}),
	});
	appData.clearOrder();
	order.clearAltButtons();
});

//Открыть форму с почтой и телефоном
events.on('order:submit', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

//Изменение способа оплаты
events.on('payment:change', ({ name }: { name: string }) => {
	appData.order.payment = name;
	appData.validateAddressForm();
});

//Изменение в форме оплаты и адреса
events.on(
	/^order\..*:change/,
	(data: { field: keyof IPaymentForm; value: string }) => {
		appData.setOrderFieldPaymentForm(data.field, data.value);
	}
);

//Изменения в форме контактов
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IContactsForm; value: string }) => {
		appData.setOrderFieldContactsForm(data.field, data.value);
	}
);

//Снимаем блокировку страницы если открыта модалка
events.on('modal:open', () => {
	page.fixed = false;
});

//Блокируем прокрутку страницы если открыта модалка
events.on('modal:close', () => {
	page.fixed = true;
});
