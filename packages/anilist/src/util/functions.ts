// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import type { FuzzyDate, Media } from '@/types/Anilist';
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
	if (source === null) return source;

	const decodedHtml = decode(
		source.replace(htmlEntityRegex, (_, type: keyof typeof htmlEntityReplacements) => htmlEntityReplacements[type])
	);

	return decodedHtml.replace(excessiveNewLinesRegex, '\n\n');
}

export function convertFuzzyDate(fuzzyDate: FuzzyDate) {
	if (!fuzzyDate || Object.values(fuzzyDate).some((date) => date === null || date === undefined)) {
		return null;
	}

	const { year, month, day } = fuzzyDate;

	if (month < 1 || month > 12 || day < 1 || day > 31) {
		return null;
	}

	return new Date(year, month - 1, day).getTime();
}

export function formatMedia(media: Media) {
	media.description = parseHtmlEntity(media.description);

	media.startDate = convertFuzzyDate(media.startDate);
	media.endDate = convertFuzzyDate(media.endDate);

	return media;
}
