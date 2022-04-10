import {configsql , configlite} from './config.js';
import _knex from 'knex';

export const knexsql = _knex(configsql);
export const knexLite = _knex(configlite);

