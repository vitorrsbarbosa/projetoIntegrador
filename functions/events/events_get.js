const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const { ObjectId } = require('mongodb')
const collectionEvents = 'Events'

module.exports = async (event) => {
  try {
    await mongodb.connect()
    const perPage = 50
    const page = event.queryStringParameters && event.queryStringParameters.page ? event.queryStringParameters.page : 1

    if (event.pathParameters && event.pathParameters.id) {
      const Events = await mongodb(collectionEvents).findOne({ _id: ObjectId(event.pathParameters.id) })
      return util.bind(Events)
    }

    const Events = await mongodb(collectionEvents).find({}).skip(perPage * page - perPage).limit(perPage).toArray()
    return util.bind(Events)
  } catch (error) {
    return util.bind(error)
  }
}
