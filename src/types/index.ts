export interface ICard {
	id: string;
	index?: string;
	category: string;
	title: string;
	description: string;
	image: string;
	price: number;
}

export interface IBasketModal extends ICard {
	total: number;
	items: HTMLElement[];
}

export interface ICardModal extends ICard {
	button: string;
	index: string;
} 

export interface IForm {
	valid: boolean;
	errors: string[];
}

export interface IPage {
	catalog: HTMLElement[];
	counter: number;
	fixed: boolean;
}

export interface IPaymentForm {
	payment: string;
	address: string;
}

export interface IContactsForm {
	email: string;
	phone: string;
}

export type IInfoForm = IPaymentForm & IContactsForm;

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

export interface IModal {
	content: HTMLElement;
}

export interface IAppState {
	catalog: ICard[];
	basket: ICard[];
	order: IInfoForm | null;
	fixed: boolean;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;
