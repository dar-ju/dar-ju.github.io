/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('mood_quotes', (table) => {
    table.increments('id').primary()
    table.string('quote_name').notNullable()
    table.json('quotes')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('mood_quotes')
}
