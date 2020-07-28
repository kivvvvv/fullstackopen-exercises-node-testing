const _ = require('lodash')

// eslint-disable-next-line no-unused-vars
function dummy (blogs) {
	return 1
}

function totalLikes (blogs) {
	return blogs.reduce((total, blog) => blog.likes + total, 0)
}

function favoriteBlog (blogs) {
	if (blogs.length === 0 || !blogs) {
		return null
	}

	if (blogs.length === 1) {
		return blogs
	}

	const highestLikes = Math.max(...blogs.map(blog => blog.likes))
	return blogs.find(blog => blog.likes === highestLikes)
}

function mostBlogs (blogs) {
	if (blogs.length === 0 || !blogs) {
		return null
	}

	if (blogs.length === 1) {
		const blog = blogs[0]
		return {
			author: blog.author,
			blogs: 1
		}
	}

	const blogsByAuthor = _.groupBy(blogs, 'author')
	const authorAndBlogs = Object.entries(blogsByAuthor).map(([key, value]) => ({
		author: key,
		blogs: value.length
	}))
	const highestOwnBlogs = Math.max(...authorAndBlogs.map(author => author.blogs))

	return authorAndBlogs.find(author => author.blogs === highestOwnBlogs)
}

function mostLikes (blogs) {
	if (blogs.length === 0 || !blogs) {
		return null
	}

	if (blogs.length === 1) {
		const blog = blogs[0]
		return {
			author: blog.author,
			likes: blog.likes
		}
	}

	const blogsByAuthor = _.groupBy(blogs, 'author')
	const authorAndLikes = Object.entries(blogsByAuthor).map(([author, ownBlogs]) => ({
		author,
		likes: ownBlogs.reduce((totalLikes, blog) => totalLikes + blog.likes, 0)
	}))
	const highestOwnLikes = Math.max(...authorAndLikes.map(author => author.likes))

	return authorAndLikes.find(author => author.likes === highestOwnLikes)
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlog,
	mostBlogs,
	mostLikes
}