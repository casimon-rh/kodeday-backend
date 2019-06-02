const Dog = require('../models/dog')

module.exports = {
  getById: (id) => Dog.query().findById(id),
  getAll: () => Dog.query().where({ isDeleted: 0 }),
  create: newDog => Dog.query().insert(newDog).skipUndefined(),
  deleteLogically: (id) => Dog.query().patchAndFetchById(id, {
    isDeleted: true
  }),
  adoptDog: async (id) => {
    if (!(await Dog.query().where({ isDeleted: 0, id })).length) {
      throw new Error('Ya esta borrado')
    }
    return Dog.query().patchAndFetchById(id, {
      isAdopted: true
    })
  }
}
