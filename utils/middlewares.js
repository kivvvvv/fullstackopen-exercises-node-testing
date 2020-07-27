const morgan = require('morgan')
morgan.token('body', request => JSON.stringify(request.body))


function unknownEndpoint (request, response) {
	response.status(404).send({ error: 'unknown endpoint' })
}

function errorHandler (error, request, response, next) {
	switch (error.name) {
		case 'CastError': {
			response.status(400).send({
				error: 'malformatted id'
			})
			break
		}
		case 'ValidationError': {
			response.status(400).send({
				error: error.message
			})
			break
		}
		default:
			next(error)
	}
}

module.exports = {
	httpLogger: morgan(':method :url :status :res[content-length] - :response-time ms :body'),
	unknownEndpoint,
	errorHandler
}