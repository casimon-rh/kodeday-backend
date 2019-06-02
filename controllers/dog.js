const dog = require('../dao/dog')
const { notFound, badRequest } = require('./responses')

module.exports = app => {
  app.get('/dogs/:id?', async (req, res) => {
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
  })
  app.post('/dogs', async (req, res) => {
    const { name, gender, age, breed } = req.body
    await dog.create({ name, gender, age, breed })
    return res.status(201).send({
      message: 'created'
    })
  })
  app.delete('/dogs/:id', async (req, res) => {
    const { id } = req.params
    if (!id || isNaN(id)) {
      return badRequest(res)
    }
    if (!(await dog.getById(id))) {
      return notFound(res)
    }
    await dog.deleteLogically(id)
    return res.status(204).send({})
  })
  app.put('/dogs/adopt/:id', async (req, res) => {
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
  })
}
