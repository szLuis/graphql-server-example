const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer, addMockFunctionsToSchema } = require('apollo-server-express')
const schema = require('./schema')

const app = express()

app.use(
    '/graphql',
    bodyParser.json()
)

const server = new ApolloServer({ schema })
server.applyMiddleware({  app })
const PORT = 5678

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}, welcome!`)
})