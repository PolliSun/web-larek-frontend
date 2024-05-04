import { Component } from '../base/Component';
import { ISuccessModal } from '../../types';
import { ensureElement } from '../../utils/utils';

interface ISuccessActions {
	onClick: () => void;
}

export class Success extends Component<ISuccessModal> {
	protected _total: HTMLElement;
	protected _close: HTMLElement;

	constructor(conteiner: HTMLElement, actions?: ISuccessActions) {
		super(conteiner);

		this._total = ensureElement<HTMLElement>(
			'.order-success__description',
			this.container
		);
		this._close = ensureElement<HTMLElement>(
			'.order-success__close',
			this.container
		);

		if (actions?.onClick) {
			this._close.addEventListener('click', actions.onClick);
		}
	}

	set total(total: string) {
		this.setText(this._total, total);
	}
}
