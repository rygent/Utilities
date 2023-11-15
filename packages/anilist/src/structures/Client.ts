import { MediaField } from '../fields/MediaField.js';
import { Util } from './Util.js';

export class Client {
	private utils: Util;

	public constructor() {
		this.utils = new Util();
	}

	public get media() {
		return new MediaField(this.utils);
	}
}
