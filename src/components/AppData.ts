import { Model } from './base/Model';
import {
	ICard,
	IOrder,
	FormErrors,
	IPaymentForm,
	IContactsForm,
	IInfoForm,
} from '../types/index';
import { IAppState } from '../types';

export type CatalogChangeEvent = {
	catalog: ICard[];
};

export class AppState extends Model<IAppState> {
	catalog: ICard[];
	basket: ICard[] = [];

	order: IInfoForm = {
		address: '',
		payment: '',
		email: '',
		phone: '',
	};

	formErrors: FormErrors = {};

	getOrderData(): IOrder {
		return {
			...this.order,
			items: this.basket.map((item) => item.id),
			total: this.getTotal(),
		};
	}

	setCatalog(items: ICard[]) {
		this.catalog = items;
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
		this.emitChanges('basket:changed', this.basket);
	}

	clearBasket() {
		this.basket = [];
		this.reloadBasket();
	}

	clearForm() {
		this.order = {
			payment: '',
			address: '',
			email: '',
			phone: '',
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
