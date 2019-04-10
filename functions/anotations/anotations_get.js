const mongodb = require('../../lib/mongodb')
const util = require('../../lib/util')
const { ObjectId } = require('mongodb')
const collectionAnotations = 'anotations'

module.exports = async (event) => {
  try {
    await mongodb.connect()
    const perPage = 50
    const page = event.queryStringParameters && event.queryStringParameters.page ? event.queryStringParameters.page : 1

    if (event.pathParameters && event.pathParameters.id) {
      const anotations = await mongodb(collectionAnotations).findOne({ _id: ObjectId(event.pathParameters.id) })
      return util.bind(anotations)
    }

    const anotations = await mongodb(collectionAnotations).find({}).skip(perPage * page - perPage).limit(perPage).toArray()
    return util.bind(anotations)
  } catch (error) {
    return util.bind(error)
  }
}
