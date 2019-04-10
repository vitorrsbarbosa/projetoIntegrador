const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const collectionEvents = 'Events'

module.exports = async (event) => {
  try {
    const body = JSON.parse(event.body || '{}')
    if (!body._id) return util.bind(new Error('Enter your code!'))
    if (!body.title) return util.bind(new Error('Enter your title!'))
    if (!body.email) return util.bind(new Error('Enter your email!'))
    if (!body.user) return util.bind(new Error('Enter your user!'))

    await mongodb.connect()

    const checkEventsExist = await mongodb(collectionEvents).findOne({ email: body.email })
    if (checkEventsExist) return util.bind(new Error('An Events with this email already exists!'))

    const Events = {
      email: body.email,
      description: body.description,
      title: body.title,
      insertDate: body.insertDate,
      observation: body.observation,
      user: body.user
    }

    await mongodb(collectionEvents).insertOne(Events)
    return util.bind({})
  } catch (error) {
    return util.bind(error)
  }
}
