require('dotenv').config()
const mongodb = require('../../lib/mongodb')
const anotationsPost = require('../../functions/anotations/anotations_post')

const collectionAnotations = 'anotations'

describe('anotations/anotations_post.js', () => {
  beforeAll(async () => {
    try {
      await mongodb.connect()
      await mongodb(collectionAnotations).insertOne({ email: 'othertest@test.com', title: 'test', user: 'test'  })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  afterAll(async () => {
    try {
      await mongodb(collectionAnotations).removeOne({ email: 'othertest@test.com' })
      await mongodb(collectionAnotations).removeOne({ email: 'test@test.com' })
    } catch (error) {
      console.log('error -> ', error)
    }
  })
  describe('Should success', () => {
    it('valid anotations', async () => {
      const event = {
        body: JSON.stringify({
          name: 'anotations test name',
          email: 'test@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'

        })
      }
      const res = await anotationsPost(event)
      expect(res.statusCode).toBe(400)
    })
    it('should add a new anotations', async () => {
      const event = {
        body: JSON.stringify({
          name: 'anotations test name',
          email: 'test@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'
        })
      }
      const res = await anotationsPost(event)
      expect(res.statusCode).toBe(200)
    })
    it('should test email', async () => {
      const event = {
        body: JSON.stringify({
          name: 'anotations othertest',
          email: 'othertest@test.com',
          title: 'test',
          observation: 'test',
          user: 'test',
          description: 'test',
          insertDate: 'date'
        })
      }
      const res = await anotationsPost(event)
      const body = JSON.parse(res.body)
      expect(res.statusCode).toBe(400)
      expect(body).toHaveProperty('errorMessage')
    })
  })
  describe('Should fail', () => {
    it('should return an error body not send', async () => {
      const res = await anotationsPost()
      expect(res.statusCode).toBe(400)
    })
    it('should return valid anotations empty', async () => {
      const res = await anotationsPost({ body: '' })
      expect(res.statusCode).toBe(400)
    })
  })
})
