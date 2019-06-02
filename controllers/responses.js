module.exports = {
  badRequest: (res) => res.status(400).send({
    message: 'Bad Request'
  }),
  notFound: (res) => res.status(404).send({
    message: 'Not Found'
  }),
  internalError: (res, err) => res.status(404).send({
    message: err
  })
}
