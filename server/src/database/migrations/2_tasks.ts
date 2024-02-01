import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('tasks', (table: Knex.TableBuilder) => {
        table.increments('id').unsigned().primary().notNullable();
        table.integer('userId').unsigned().notNullable();
        table.integer('creatorId').unsigned().notNullable();
        table.boolean('isDone').notNullable();
        table.string('description', 50).notNullable();
        table.foreign('userId').references('id').inTable('users');
        table.foreign('creatorId').references('id').inTable('users');
    });
}

export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('tasks');
}
