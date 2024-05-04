import { IEvents } from '../base/events';
import { Form } from './Form';
import { IPaymentForm, IContactsForm } from '../../types';
import { ensureAllElements } from '../../utils/utils';

export class Order extends Form<IPaymentForm> {
	protected _buttonsPay: HTMLButtonElement[];

	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
		this._buttonsPay = ensureAllElements<HTMLButtonElement>(
			'.button_alt',
			container
		);
		this._buttonsPay.forEach((button) =>
			button.addEventListener('click', () => (this.selected = button.name))
		);
	}

	clearAltButtons() {
		this._buttonsPay.forEach((button) => {
			button.classList.remove('button_alt-active');
		});
	}

	set selected(name: string) {
		this._buttonsPay.forEach((button) =>
			this.toggleClass(button, 'button_alt-active', button.name === name)
		);
		this.events.emit('payment:change', { name });
	}

	set address(value: string) {
		(this.container.elements.namedItem('address') as HTMLInputElement).value =
			value;
	}
}

export class Contact extends Form<IContactsForm> {
	constructor(container: HTMLFormElement, protected events: IEvents) {
		super(container, events);
	}

	set email(value: string) {
		(this.container.elements.namedItem('email') as HTMLInputElement).value =
			value;
	}

	set phone(value: string) {
		(this.container.elements.namedItem('phone') as HTMLInputElement).value =
			value;
	}
}
