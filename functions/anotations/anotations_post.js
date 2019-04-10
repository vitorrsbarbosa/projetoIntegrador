const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const collectionAnotations = 'anotations'

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    if (!body._id) return util.bind(new Error('Enter your code!'))
    if (!body.title) return util.bind(new Error('Enter your title!'))
    if (!body.email) return util.bind(new Error('Enter your email!'))
    if (!body.user) return util.bind(new Error('Enter your user!'))

    await mongodb.connect()

    const checkAnotationsExist = await mongodb(collectionAnotations).findOne({ email: body.email })
    if (checkAnotationsExist) return util.bind(new Error('An anotations with this email already exists!'))

    const anotations = {
      email: body.email,
      description: body.description,
      title: body.title,
      insertDate: body.insertDate,
      observation: body.observation,
      user: body.user
    }

    await mongodb(collectionAnotations).insertOne(anotations)
    return util.bind({})
  } catch (error) {
    return util.bind(error)
  }
}
