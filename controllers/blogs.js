const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response, next) => {
	Blog.find({})
		.then(documents => {
			response.json(documents)
		})
		.catch(next)
})

blogsRouter.post('/api/blogs', (request, response, next) => {
	const newBlog = new Blog(request.body)
	newBlog.save()
		.then(document => {
			response.status(201).json(document)
		})
		.catch(next)
})

module.exports = blogsRouter
