const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const Blog = require('../models/blog')
const helper = require('../utils/test_helper')

const api = supertest(app)

beforeEach(async () => {
	await Blog.deleteMany({})

	let testBlog = new Blog(helper.initialBlogs[0])
	await testBlog.save()
	testBlog = new Blog(helper.initialBlogs[1])
	await testBlog.save()
})

test('blogs are returned as json', async () => {
	await api.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)
		.expect(response => {
			expect(response.body).toHaveLength(helper.initialBlogs.length)
		})
})

test('all blogs have an id property as theirs unique identifier property', async () => {
	const blogs = await helper.blogsInDb()
	blogs.forEach(blog => expect(blog.id).toBeDefined())
})

test('a valid blog can be added', async () => {
	const newBlog = {
		title: 'new blog',
		author: 'new author',
		url: 'new.url.com',
		likes: 0
	}

	await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
		.expect(response => {
			const newlyCreatedBlog = response.body
			expect(newlyCreatedBlog.id).toBeDefined()

			delete newlyCreatedBlog.id
			expect(newlyCreatedBlog).toEqual(newBlog)
		})

	const blogs = await helper.blogsInDb()
	expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
})

test('default a likes property to 0 when it is not provided', async () => {
	const newBlog = {
		title: 'new blog',
		author: 'new author',
		url: 'new.url.com'
	}

	await api.post('/api/blogs')
		.send(newBlog)
		.expect(201)
		.expect('Content-Type', /application\/json/)
		.expect(response => {
			const newlyCreatedBlog = response.body
			expect(newlyCreatedBlog.likes).toBe(0)
		})
})

test('a blog without url is not added', async () => {
	const newBlog = {
		title: 'new blog',
		author: 'new author',
		likes: 1
	}

	await api.post('/api/blogs')
		.send(newBlog)
		.expect(400)

	const blogs = await helper.blogsInDb()
	expect(blogs).toHaveLength(helper.initialBlogs.length)
})

test('a blog can be deleted', async () => {
	const allBlogs = await helper.blogsInDb()
	await api.delete(`/api/blogs/${allBlogs[0].id}`)
		.send()
		.expect(204)
	const currentBlogs = await helper.blogsInDb()

	expect(currentBlogs).toHaveLength(allBlogs.length - 1)
})

test('a blog can be updated', async () => {
	const allBlogs = await helper.blogsInDb()
	const blogUpdatingId = allBlogs[0].id
	await api.put(`/api/blogs/${blogUpdatingId}`)
		.send({ likes: 300 })
		.expect(response => {
			const updatedBlog = response.body
			expect(updatedBlog.likes).toBe(300)
		})

	const currentBlogs = await helper.blogsInDb()
	const updatedBlog = currentBlogs.find(blog => blog.id === blogUpdatingId)
	expect(updatedBlog.likes).toBe(300)
})

afterAll(async () => {
	await mongoose.connection.close()
})
