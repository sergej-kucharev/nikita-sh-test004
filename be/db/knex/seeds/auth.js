import { items as itemsProd, action as actionProd, seed as seedProd, } from './production/auth';

export const items = [
    ...itemsProd,
    [ 101, 'none', 'none', ],
];

export const action = actionProd;

export const seed = async (knex) => await action(knex, items);
