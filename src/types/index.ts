export interface ICard {
	id: string;
	index?: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number | null;
}

export interface IBasketModal extends ICard {
	total: number;
	items: HTMLElement[];
}

export interface IPaymentForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrder extends IPaymentForm, IContactsForm {
	items: string[];
	total: number;
}

export interface IOrderResult {
	id: string;
	total: number;
}

export interface ISuccessModal {
	total: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
