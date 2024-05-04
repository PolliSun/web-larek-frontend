import { Component } from '../base/Component';
import { ICardModal } from '../../types';

export interface ICardActions {
	onClick: (event: MouseEvent) => void;
}

export class Card extends Component<ICardModal> {
	protected _index: HTMLElement;
	protected _category: HTMLElement;
	protected _title: HTMLElement;
	protected _description: HTMLElement;
	protected _image: HTMLImageElement;
	protected _price: HTMLElement;
	protected _button: HTMLButtonElement;

	constructor(container: HTMLElement, actions?: ICardActions) {
		super(container);

		this._index = container.querySelector('.basket__item-index');
		this._category = container.querySelector('.card__category');
		this._title = container.querySelector('.card__title');
		this._description = container.querySelector('.card__text');
		this._image = container.querySelector('.card__image');
		this._price = container.querySelector('.card__price');
		this._button = container.querySelector('.card__button');

		if (actions.onClick) {
			if (this._button) this._button.addEventListener('click', actions.onClick);
			else container.addEventListener('click', actions.onClick);
		}
	}

	get id(): string {
		return this.container.dataset.id || '';
	}

	set id(value: string) {
		this.container.dataset.id = value;
	}

	get index(): string {
		return this._index.textContent || '';
	}

	set index(value: string) {
		this._index.textContent = value;
	}

	get category(): string {
		return this._category.textContent || '';
	}

	set category(value: string) {
		this.setText(this._category, value);
		this._category.classList.toggle(
			'card__category_soft',
			value === 'софт-скил'
		);
		this._category.classList.toggle('card__category_other', value === 'другое');
		this._category.classList.toggle(
			'card__category_additional',
			value === 'дополнительное'
		);
		this._category.classList.toggle(
			'card__category_button',
			value === 'кнопка'
		);
		this._category.classList.toggle(
			'card__category_hard',
			value === 'хард-скил'
		);
	}

	get title(): string {
		return this._title.textContent || '';
	}

	set title(value: string) {
		this.setText(this._title, value);
	}

	set description(value: string | string[]) {
		if (this._description) {
			if (Array.isArray(value)) {
				this._description.replaceWith(
					...value.map((str) => {
						const descriptionTemplate =
							this._description.cloneNode() as HTMLElement;
						this.setText(descriptionTemplate, str);
						return descriptionTemplate;
					})
				);
			} else {
				this.setText(this._description, value);
			}
		}
	}

	set image(value: string) {
		if (this._image) {
			this.setImage(this._image, value, this.title);
		}
	}

	set price(value: number | null) {
		if (this._price) {
			if (value === null) {
				this.setText(this._price, 'Бесценно');
				this.disableAddBasketButton();
			} else {
				const itemPrice: string = `${value} синапсов`;
				this.setText(this._price, itemPrice);
			}
		}
	}

	disableAddBasketButton() {
		this.setDisabled(this._button, true);
	}

	set button(value: string) {
		if (this._button) {
			this._button.textContent = value;
		}
	}
}
