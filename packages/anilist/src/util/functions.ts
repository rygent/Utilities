import { decode } from 'html-entities';

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

export function parseHtmlEntity(source: string | null | undefined) {
	if (source === null) return null;
	if (source === undefined) return undefined;

	return decode(
		source.replace(htmlEntityRegex, (_, type: keyof typeof htmlEntityReplacements) => htmlEntityReplacements[type])
	).replace(excessiveNewLinesRegex, '\n\n');
}
