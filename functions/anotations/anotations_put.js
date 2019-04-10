const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const collectionAnotations = 'anotations'
const { ObjectId } = require('mongodb')

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    if (!body._id) return util.bind(new Error('Enter your code!'))
    if (!body.email) return util.bind(new Error('Enter your email!'))
    if (!body.title) return util.bind(new Error('Enter your title!'))
    if (!body.user) return util.bind(new Error('Enter your user!'))


    await mongodb.connect()

    const anotations = {
      description: body.description,
      email: body.email,
      title: body.title,
      insertDate: body.insertDate,
      observation: body.observation,
      user: body.user
    }

    await mongodb(collectionAnotations).updateOne(
      {
        _id: ObjectId(body._id)
      },
      {
        $set: anotations
      }
    )
    return util.bind({})
  } catch (error) {
    return util.bind(error)
  }
}
