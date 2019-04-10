require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const anotationsRemove = require('../../functions/anotations/anotations_remove')

const collectionAnotations = 'anotations'

describe('anotations/anotations_remove.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionAnotations).insertOne({ email: 'removetest@test.com', _id: ObjectId('5c326feaf8a79d378757bed0'), title: 'test', user: 'test' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionAnotations).removeOne({ email: 'removetest@test.com' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('valid code anotations', async () => {
      const event = {}
      const res = await anotationsRemove(event)
      expect(res.statusCode).toBe(400)
    })
    it('remove anotations', async () => {
      const event = {
        body: JSON.stringify({
          _id: '5c326feaf8a79d378757bed0'
        })
      }
      const res = await anotationsRemove(event)
      expect(res.statusCode).toBe(200)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await anotationsRemove()
      expect(res.statusCode).toBe(400)
    })
  })
})
