'use strict'

require('dotenv').config()
const path = require('path')

const events = require(path.join(__dirname, 'functions', 'events'))

module.exports = {
  events: (event, context) => {
    if (event.resource === '/events' && event.httpMethod === 'GET') return events.get(event, context)
    if (event.resource === '/events' && event.httpMethod === 'POST') return events.post(event, context)
    if (event.resource === '/events' && event.httpMethod === 'PUT') return events.put(event, context)
    if (event.resource === '/events' && event.httpMethod === 'DELETE') return events.remove(event, context)
    if (event.resource === '/events/{id}' && event.httpMethod === 'GET') return events.get(event, context)
  }
}
