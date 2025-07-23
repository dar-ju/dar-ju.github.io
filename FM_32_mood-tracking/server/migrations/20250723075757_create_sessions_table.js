/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
    table.string('session_token', 100).notNullable()
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now())
    table.bigInteger('expires_at').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('sessions')
}
