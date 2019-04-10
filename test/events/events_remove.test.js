require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const EventsRemove = require('../../functions/Events/Events_remove')

const collectionEvents = 'Events'

describe('Events/Events_remove.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionEvents).insertOne({ email: 'removetest@test.com', _id: ObjectId('5c326feaf8a79d378757bed0'), title: 'test', user: 'test' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionEvents).removeOne({ email: 'removetest@test.com' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('valid code Events', async () => {
      const event = {}
      const res = await EventsRemove(event)
      expect(res.statusCode).toBe(400)
    })
    it('remove Events', async () => {
      const event = {
        body: JSON.stringify({
          _id: '5c326feaf8a79d378757bed0'
        })
      }
      const res = await EventsRemove(event)
      expect(res.statusCode).toBe(200)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await EventsRemove()
      expect(res.statusCode).toBe(400)
    })
  })
})
