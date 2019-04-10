require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const { ObjectId } = require('mongodb')
const EventsGet = require('../../functions/Events/Events_get')

const collectionEvents = 'Events'

describe('Events/Events_get.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionEvents).insertOne({ email: 'gettest@test.com', _id: ObjectId('5c326feaf8a79d378757bed0'), title: 'test', user: 'test' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionEvents).removeOne({ email: 'gettest@test.com' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('return all Events', async () => {
      const event = {}
      const res = await EventsGet(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(200)
      expect(body.length).toBeGreaterThanOrEqual(1)
    })
    it('return an Events', async () => {
      const event = {
        pathParameters: {
          id: '5c326feaf8a79d378757bed0'
        }
      }
      const res = await EventsGet(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(200)
      expect(body.email).toBe('gettest@test.com')
    })
    it('return secoend page', async () => {
      const event = {
        queryStringParameters: {
          page: 2
        }
      }
      const res = await EventsGet(event)
      expect(res.statusCode).toBe(200)
    })
  })
  describe('Should fail', () => {
    it('should return an error event not send', async () => {
      const res = await EventsGet()
      expect(res.statusCode).toBe(400)
    })
  })
})
