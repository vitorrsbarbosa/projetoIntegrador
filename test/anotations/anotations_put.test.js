require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const anotationsPut = require('../../functions/anotations/anotations_put')

const collectionAnotations = 'anotations'

describe('anotations/anotations_put.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionAnotations).insertOne({ email: 'puttest@test.com', _id: ObjectId('5c326feaf8a79d378757bed0'), title: 'test', user: 'test' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionAnotations).removeOne({ email: 'puttest@test.com' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('update anotations', async () => {
      const event = {
        body: JSON.stringify({
          _id: '5c326feaf8a79d378757bed0',
          name: 'nameputtest',
          email: 'puttest@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'
        })
      }
      const res = await anotationsPut(event)
      expect(res.statusCode).toBe(200)
    })
    it('valid code anotations', async () => {
      const event = {}
      const res = await anotationsPut(event)
      expect(res.statusCode).toBe(400)
    })
    it('valid email anotations', async () => {
      const event = {
        body: JSON.stringify({
          _id: '5c326feaf8a79d378757bed0'
        })
      }
      const res = await anotationsPut(event)
      expect(res.statusCode).toBe(400)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await anotationsPut()
      expect(res.statusCode).toBe(400)
    })
  })
})
