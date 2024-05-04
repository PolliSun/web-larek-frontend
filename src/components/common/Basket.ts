import { Component } from '../base/Component';
import { EventEmitter } from '../base/events';
import { IBasketModal } from '../../types';
import { ensureElement, createElement } from '../../utils/utils';

export class Basket extends Component<IBasketModal> {
	protected _list: HTMLElement;
	protected _total: HTMLElement;
	protected _button: HTMLElement;
	protected _index: HTMLElement;
	protected _price: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this._list = ensureElement<HTMLElement>('.basket__list', this.container);
		this._total = this.container.querySelector('.basket__price');
		this._button = this.container.querySelector('.button');
		this._price = container.querySelector('.basket__price');
		this._index = container.querySelector('.basket__item-index');

		if (this._button) {
			this._button.addEventListener('click', () => events.emit('order:open'));
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this._list.replaceChildren(...items);
		} else {
			this.toggleBasketButton(true);
			this._list.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
		}
	}

	set total(value: number) {
		this.setText(this._total, `${value} синапсов`);
	}

	toggleBasketButton(state: boolean) {
		this.setDisabled(this._button, state);
	}
}
