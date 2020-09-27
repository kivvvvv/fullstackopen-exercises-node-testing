const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
	const blogs = await Blog.find({}).exec()
	await response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
	const newBlog = new Blog(request.body)
	const newlyCreatedBlog = await newBlog.save()
	await response.status(201).json(newlyCreatedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
	const id = request.params.id
	await Blog.deleteOne({ _id: id }).exec()
	await response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
	const id = request.params.id
	const newLikes = request.body.likes
	const updatedBlog = await Blog.findByIdAndUpdate(
		id,
		{ likes: newLikes },
		{ new: true }
	)
		.exec()
	await response.json(updatedBlog)
})

module.exports = blogsRouter
