import { decode } from 'html-entities';

export function gql(...args: any[]): string {
	return args[0].reduce((acc: string, str: string, idx: number) => {
		acc += str;
		if (Reflect.has(args, idx + 1)) acc += args[idx + 1];
		return acc;
	}, '');
}

const excessiveNewLinesRegex = /\n{3,}/g;

const htmlEntityRegex = /<\/?(i|b|br|strong)>/g;

const htmlEntityReplacements = Object.freeze({
	i: '',
	em: '',
	var: '',
	b: '',
	br: '\n',
	code: '',
	pre: '',
	mark: '',
	kbd: '',
	s: '',
	wbr: '',
	u: '',
	strong: ''
} as const);

export function parseHtmlEntity(text: string | null | undefined) {
	if (text === null) return null;
	if (text === undefined) return undefined;

	return decode(
		text.replace(htmlEntityRegex, (_, type: keyof typeof htmlEntityReplacements) => htmlEntityReplacements[type])
	).replace(excessiveNewLinesRegex, '\n\n');
}
