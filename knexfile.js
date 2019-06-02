module.exports = {
  ...require('./config/connection'),
  migrations: {
    tableName: 'knex_migrations'
  }
}
