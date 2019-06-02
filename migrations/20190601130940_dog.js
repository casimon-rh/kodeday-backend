const tablename = 'dog'
module.exports = {
  up: async knex =>
    (await knex.schema.hasTable(tablename))
      ? knex
      : knex.schema.createTable(tablename,
        table => {
          table.increments('id')
          table.string('name', 20)
          table.integer('age')
          table.string('breed', 20)
          table.string('gender', 20)
          table.boolean('is_adopted').defaultTo(false)
          table.boolean('is_deleted').defaultTo(false)
        }),
  down: knex => knex.schema.dropTableIfExists(tablename),
  config: {
    transaction: false
  }
}
