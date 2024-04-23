//Данные карточки
export interface ICard {
	id: string;
	category?: string;
	title: string;
	description?: string;
	image?: string;
	price: number | null;
}

//Данные формы оплаты
export interface IOrderForm {
	address: string;
	email: string;
	phone: string;
	payment: PaymentMethod;
}

// Список для заказа
export interface IOrder extends IOrderForm {
	total: number;
	items: string[];
}

//Данные о заказе
export interface IOrderResult {
	id: string;
	total: number;
}

//Вид оплаты
export type PaymentMethod = 'online' | 'personally';

//Методы
export interface IAppState {
	catalog: ICard[];
	bascet: ICard[];
	preview: string | null;
	order: IOrder | null;
}

//Ошибки формы
export type FormErrors = Partial<Record<keyof IOrder, string>>;
