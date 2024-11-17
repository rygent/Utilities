export function graphql(...source: any[]): string {
	return source[0].reduce((acc: string, str: string, idx: number) => {
		acc += str;
		if (Reflect.has(source, idx + 1)) acc += source[idx + 1];
		return acc;
	}, '');
}
