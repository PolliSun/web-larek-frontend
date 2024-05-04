import { Model } from './base/Model';
import {
	ICard,
	IOrder,
	FormErrors,
	IPaymentForm,
	IContactsForm,
} from '../types/index';
import { IEvents } from './base/events';

export interface IAppState {
	catalog: ICard[];
	basket: ICard[];
	order: IOrder | null;
	fixed: boolean;
}

export type CatalogChangeEvent = {
	catalog: ICard[];
};

export class AppState extends Model<IAppState> {
	catalog: ICard[];
	basket: ICard[] = [];

	order: IOrder = {
		address: '',
		payment: '',
		email: '',
		phone: '',
		items: [],
		total: null,
	};

	formErrors: FormErrors = {};

	setCatalog(items: ICard[]) {
		function getProduct(item: ICard, events: IEvents): ICard {
			return {
				id: item.id,
				description: item.description,
				image: item.image,
				title: item.title,
				category: item.category,
				price: item.price,
			};
		}

		this.catalog = items.map((item) => getProduct(item, this.events));
		this.emitChanges('items:changed', { catalog: this.catalog });
	}

	findFromBasket(item: ICard) {
		return this.basket.find((card) => card === item);
	}

	addToBasket(item: ICard) {
		this.basket.push(item);
		this.reloadBasket();
	}

	removeFromBasket(item: ICard) {
		this.basket = this.basket.filter((card) => card.id !== item.id);
		this.reloadBasket();
	}

	reloadBasket() {
		this.emitChanges('counter:changed', this.basket);
		this.emitChanges('basket:changed', this.basket);
	}

	clearBasket() {
		this.basket = [];
		this.order.items = [];
		this.reloadBasket();
	}

	clearOrder() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
			items: [],
			total: null,
		};
	}

	validateAddressForm() {
		const errors: typeof this.formErrors = {};

		if (!this.order.payment) {
			errors.payment = 'Укажите способ оплаты';
		}
		if (!this.order.address) {
			errors.address = 'Укажите адрес';
		}

		this.formErrors = errors;
		this.events.emit('formErrorsOrder:change', this.formErrors);

		return Object.keys(errors).length === 0;
	}

	validateContactsForm() {
		const errors: typeof this.formErrors = {};

		if (!this.order.phone) {
			errors.phone = 'Укажите телефон';
		}
		if (!this.order.email) {
			errors.email = 'Укажите почту';
		}

		this.formErrors = errors;
		this.events.emit('formErrorsContacts:change', this.formErrors);
		return Object.keys(errors).length === 0;
	}

	setOrderFieldPaymentForm(field: keyof IPaymentForm, value: string) {
		this.order[field] = value;

		if (this.validateAddressForm()) {
			this.events.emit('order:ready', this.order);
		}
	}

	setOrderFieldContactsForm(field: keyof IContactsForm, value: string) {
		this.order[field] = value;

		if (this.validateContactsForm()) {
			this.events.emit('order:ready', this.order);
		}
	}

	getTotal() {
		return this.basket.reduce((total, item) => total + item.price, 0);
	}
}
