const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).exec()
	await response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const newBlog = new Blog(request.body)
	const newlyCreatedBlog = await newBlog.save()
	await response.status(201).json(newlyCreatedBlog )
})

module.exports = blogsRouter
