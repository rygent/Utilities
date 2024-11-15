import { createTsupConfig } from '../../scripts/tsup.config';
import type { Options } from 'tsup';

const options: Options = { target: 'esnext' };

export default createTsupConfig({
	cjsOptions: options,
	esmOptions: options
});
