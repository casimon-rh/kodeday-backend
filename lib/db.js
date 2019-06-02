module.exports = require('knex')({
  ...require('../config/connection'),
  ...require('objection').knexSnakeCaseMappers()
})
