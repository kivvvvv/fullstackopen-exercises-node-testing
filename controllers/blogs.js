const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response, next) => {
	Blog.find({})
		.then(documents => {
			response.json(documents)
		})
		.catch(next)
})

blogsRouter.post('/', (request, response, next) => {
	const newBlog = new Blog(request.body)
	newBlog.save()
		.then(document => {
			response.status(201).json(document)
		})
		.catch(next)
})

module.exports = blogsRouter
