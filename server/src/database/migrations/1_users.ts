import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.increments('id').unsigned().primary().notNullable();
    table.string('email', 50).notNullable().unique();
    table.string('name', 20).notNullable();
    table.string('surname', 30).notNullable();
    table.string('password', 255).notNullable().notNullable();
    table.string('salt', 255).notNullable();
    table.string('sessionToken', 255).nullable().defaultTo(null);
    table.enum('role', ['ADMIN', 'USER']).notNullable().defaultTo('USER');

  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users');
}
