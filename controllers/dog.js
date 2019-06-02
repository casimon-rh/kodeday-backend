const dog = require('../dao/dog')
const { notFound, badRequest, internalError } = require('./responses')

module.exports = app => {
  app.get('/dogs/:id?', async (req, res) => {
    try {
      const { id } = req.params
      let dogs = []
      if (id) {
        if (isNaN(id)) {
          return badRequest(res)
        }
        dogs = await dog.getById(id)
      } else {
        dogs = await dog.getAll()
      }
      if (!dogs || !dogs.length) {
        return notFound(res)
      }
      res.status(200).send({ dogs })
    } catch (ex) {
      return internalError(res, ex)
    }
  })
  app.post('/dogs', async (req, res) => {
    try {
      const { name, gender, age, breed } = req.body
      await dog.create({ name, gender, age, breed })
      return res.status(201).send({
        message: 'created'
      })
    } catch (ex) {
      return internalError(res, ex)
    }
  })
  app.delete('/dogs/:id', async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(id)) {
        return badRequest(res)
      }
      if (!(await dog.getById(id))) {
        return notFound(res)
      }
      await dog.deleteLogically(id)
      return res.status(204).send({})
    } catch (ex) {
      return internalError(res, ex)
    }
  })
  app.put('/dogs/adopt/:id', async (req, res) => {
    try {
      const { id } = req.params
      if (!id || isNaN(id)) {
        return badRequest(res)
      }
      if (!(await dog.getById(id))) {
        return notFound(res)
      }
      try {
        const adopted = await dog.adoptDog(id)
        return res.status(202).send({
          message: 'AdoptedDog',
          dog: adopted
        })
      } catch (error) {
        return notFound(res)
      }
    } catch (ex) {
      return internalError(res, ex)
    }
  })
}
