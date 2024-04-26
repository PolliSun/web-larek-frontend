//Данные карточки
export interface ICard {
	id: string;
	category: CategorySection;
	title: string;
	description: string;
	image: string;
	price: number | null;
}

export interface ICardModal extends ICard {
	button: ButtonEvent;
	index: string;
}

export interface IBasketModal extends ICard {
	total: number;
	items: string[];
	state: string[];
}

export interface IDeliveryForm {
	address: string;
	payment: PaymentMethod;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export interface IOrder extends IDeliveryForm, IContactsForm {
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

export type CategorySection =
	| 'софт-скил'
	| 'другое'
	| 'дополнительное'
	| 'кнопка'
	| 'хард-скил';

export type PaymentMethod = 'online' | 'personally';

export type ButtonEvent = 'В корзину' | 'Удалить из корзины';

export type FormErrors = Partial<Record<keyof IOrder, string>>;
