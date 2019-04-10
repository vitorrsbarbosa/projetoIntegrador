'use strict'

require('dotenv').config()
const path = require('path')

const anotations = require(path.join(__dirname, 'functions', 'anotations'))

module.exports = {
  anotations: (event, context) => {
    if (event.resource === '/anotations' && event.httpMethod === 'GET') return anotations.get(event, context)
    if (event.resource === '/anotations' && event.httpMethod === 'POST') return anotations.post(event, context)
    if (event.resource === '/anotations' && event.httpMethod === 'PUT') return anotations.put(event, context)
    if (event.resource === '/anotations' && event.httpMethod === 'DELETE') return anotations.remove(event, context)
    if (event.resource === '/anotations/{id}' && event.httpMethod === 'GET') return anotations.get(event, context)
  }
}
