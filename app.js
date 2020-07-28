const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const logger = require('./utils/logger')
const middlewares = require('./utils/middlewares')
const blogsRouter = require('./controllers/blogs')

logger.info('connecting to :', config.MONGODB_URI)
mongoose.connect(
	config.MONGODB_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true
	}
).then(() => {
	logger.info('connected to MongoDB')
}).catch(error => {
	logger.info('error connecting to MongoDB:', error.message)
})

const app = express()
app.use(cors())
app.use(express.json())
app.use(middlewares.httpLogger)

app.use('/api/blogs', blogsRouter)

app.use(middlewares.unknownEndpoint)
app.use(middlewares.errorHandler)

module.exports = app