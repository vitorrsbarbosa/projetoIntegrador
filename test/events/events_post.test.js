require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const EventsPost = require('../../functions/Events/Events_post')

const collectionEvents = 'Events'

describe('Events/Events_post.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionEvents).insertOne({ email: 'othertest@test.com', title: 'test', user: 'test'  })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionEvents).removeOne({ email: 'othertest@test.com' })
      await mongodb(collectionEvents).removeOne({ email: 'test@test.com' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('valid Events', async () => {
      const event = {
        body: JSON.stringify({
          name: 'Events test name',
          email: 'test@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'

        })
      }
      const res = await EventsPost(event)
      expect(res.statusCode).toBe(400)
    })
    it('should add a new Events', async () => {
      const event = {
        body: JSON.stringify({
          name: 'Events test name',
          email: 'test@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'
        })
      }
      const res = await EventsPost(event)
      expect(res.statusCode).toBe(200)
    })
    it('should test email', async () => {
      const event = {
        body: JSON.stringify({
          name: 'Events othertest',
          email: 'othertest@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'
        })
      }
      const res = await EventsPost(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(400)
      expect(body).toHaveProperty('errorMessage')
    })
  })
  describe('Should fail', () => {
    it('should return an error body not send', async () => {
      const res = await EventsPost()
      expect(res.statusCode).toBe(400)
    })
    it('should return valid Events empty', async () => {
      const res = await EventsPost({ body: '' })
      expect(res.statusCode).toBe(400)
    })
  })
})
