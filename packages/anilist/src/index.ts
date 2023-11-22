import { Media } from './lib/structures/Media.js';
import { Search } from './lib/structures/Search.js';

export class Anilist {
	public get media() {
		return new Media();
	}

	public get search() {
		return new Search();
	}
}
