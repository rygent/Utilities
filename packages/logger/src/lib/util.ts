import { inspect } from 'node:util';
import * as Colorette from 'colorette';
import moment from 'moment';

const levels = {
	syslog: Colorette.blueBright('[SYSLOG]'),
	syserr: Colorette.redBright('[SYSERR]'),
	warn: Colorette.yellowBright('[WARN]'),
	info: Colorette.greenBright('[INFO]'),
	debug: Colorette.magentaBright('[DEBUG]')
};

const levelLength = Math.max(...Object.values(levels).map((text) => text.length));

export function resolveTimestamp(timestamp: string) {
	return `${Colorette.blackBright(moment(timestamp).format('DD/MM/YYYY HH:mm:ss z'))}`;
}

export function resolveLevel(level: string) {
	return `${(levels as any)[level]}${' '.repeat(levelLength - (levels as any)[level].length)}`;
}

export function resolveShardId(shardId: number) {
	return Colorette.cyanBright(`[${shardId ?? 'M'}]`);
}

export function clean(input: any, depth?: number) {
	if (typeof input === 'string') return input;
	const cleaned = inspect(input, { colors: Colorette.isColorSupported, depth: depth ?? 2 });
	return cleaned;
}
