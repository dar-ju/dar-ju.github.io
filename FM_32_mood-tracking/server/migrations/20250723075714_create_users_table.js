/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.string('username', 50).notNullable()
    table.string('email', 50).notNullable().unique()
    table.string('password', 100).notNullable()
    table.string('img', 255)
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('users')
}


