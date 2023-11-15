import { createLogger, format, transports } from 'winston';
import { Webhook } from './lib/transports/Webhook.js';
import { clean, resolveLevel, resolveShardId, resolveTimestamp } from './lib/util.js';
import moment from 'moment';
const { Console, File } = transports;
const { combine, timestamp, printf } = format;

export class Logger {
	private client?: any;

	private level = {
		syslog: 0,
		syserr: 1,
		warn: 2,
		info: 3,
		debug: 4
	};

	private format = combine(
		timestamp(),
		printf(({ timestamp, level, message }) => {
			return `${resolveTimestamp(timestamp)} ${resolveLevel(level)}: ${resolveShardId(
				this.client?.shard?.ids[0]
			)} ${message}`;
		})
	);

	public constructor(client?: any) {
		this.client = client;
	}

	public log(message: string) {
		const logger = createLogger({
			level: 'syslog',
			levels: this.level,
			transports: [new Console({ format: this.format })]
		});

		return logger.log({ level: 'syslog', message });
	}

	public error(message: string, error: Error, webhook?: boolean) {
		const WebhookURL = process.env.LOGGER_WEBHOOK_URL!;

		const logger = createLogger({
			level: 'syserr',
			levels: this.level,
			transports: [
				new Console({ format: this.format }),
				new File({
					filename: `report.${moment().format('yyyyMMDD.HHmmss')}.log`,
					dirname: `${process.cwd()}/logs`,
					format: combine(printf(() => clean(error.stack!)))
				}),
				...(webhook && WebhookURL ? [new Webhook({ url: WebhookURL, client: this.client, error })] : [])
			]
		});

		return logger.log({ level: 'syserr', message });
	}

	public warn(message: string) {
		const logger = createLogger({
			level: 'warn',
			levels: this.level,
			transports: [new Console({ format: this.format })]
		});

		return logger.log({ level: 'warn', message });
	}

	public info(message: string) {
		const logger = createLogger({
			level: 'info',
			levels: this.level,
			transports: [new Console({ format: this.format })]
		});

		return logger.log({ level: 'info', message });
	}

	public debug(message: string) {
		const logger = createLogger({
			level: 'debug',
			levels: this.level,
			transports: [new Console({ level: 'debug', format: this.format })]
		});

		return logger.log({ level: 'debug', message });
	}
}
