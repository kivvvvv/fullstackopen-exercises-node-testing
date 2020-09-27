const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'title1',
		author: 'author1',
		url: 'url1.com',
		likes: 1
	},
	{
		title: 'title2',
		author: 'author2',
		url: 'url2.com',
		likes: 2
	}
]

async function nonExistingId () {
	const blog = new Blog({
		title: 'title1',
		author: 'author1',
		url: 'url1.com'
	})
	await blog.save()
	await blog.remove()

	return blog.id.toString()
}

async function blogsInDb () {
	const notes = await Blog.find({})
	return notes.map(note => note.toJSON())
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb
}