import { createTsupConfig } from '../../scripts/tsup.config';
import { name } from './package.json';

export default createTsupConfig({ globalName: name, format: ['esm', 'cjs'] });
