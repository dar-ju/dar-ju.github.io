/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable('moods', (table) => {
    table.increments('id').primary()
    table.integer('user_id').notNullable()
    table.timestamp('createdAt').notNullable().defaultTo(knex.fn.now())
    table.integer('mood').notNullable()
    table.json('feelings')
    table.string('journalEntry')
    table.float('sleepHours').notNullable()
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTable('moods')
}
