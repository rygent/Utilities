import TransportStream from 'winston-transport';
import type { LogCallback, LogEntry } from 'winston';
import { clean } from '../util.js';
import { fetch } from 'undici';

export class Webhook extends TransportStream {
	private url: string;
	private client: any;
	private error: Error;

	public constructor(options: { url: string; client: any; error: Error }) {
		super({ level: 'syserr' });
		this.url = options.url;
		this.client = options.client;
		this.error = options.error;
	}

	public override async log(info: LogEntry, callback: LogCallback) {
		if (!this.client?.isReady()) return;

		const embed = {
			color: 16738657,
			title: this.error.name,
			description: [
				`\`\`\`xl\n${clean(this.error.stack)}\`\`\``,
				`***Message:*** ${this.error.message}`,
				`***Date:*** <t:${Math.floor(Date.now() / 1_000)}:D> (<t:${Math.floor(Date.now() / 1_000)}:R>)`
			].join('\n'),
			footer: { text: `Powered by ${this.client?.user.username}`, icon_url: this.client?.user.avatarURL() ?? undefined }
		};

		await fetch(this.url, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: this.client?.user.username ?? undefined,
				avatar_url: this.client?.user.displayAvatarURL({ size: 4096 }) ?? undefined,
				embeds: [embed]
			})
		});

		this.emit('logged', info);

		callback();
	}
}
