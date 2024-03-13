import request from 'supertest';
import {app} from '../index'; // Assuming your Express app instance is exported as 'app'
import { createBlog, getBlogs, getSingleBlog, updateBlog, deleteBlog } from '../controllers/blogController';

describe('Blog API endpoints', () => {
  // Test case for creating a new blog post
  it('should create a new blog post', async () => {
    const res = await request(app)
      .post('/blogs')
      .send({
        title: 'Test Blog',
        description: 'This is a test blog post'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message', 'Blog post created successfully');
    expect(res.body).toHaveProperty('blog');
  });

  // Test case for getting all blog posts
  it('should get all blog posts', async () => {
    const res = await request(app).get('/blogs');

    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // Test case for getting a single blog post by ID
  it('should get a single blog post by ID', async () => {
    // First, create a blog post to get its ID
    const newBlogRes = await request(app)
      .post('/blogs')
      .send({
        title: 'Test Blog',
        description: 'This is a test blog post'
      });

    const { _id } = newBlogRes.body.blog;

    // Then, request the blog post by its ID
    const res = await request(app).get(`/blogs/${_id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('_id', _id);
  });

  // Test case for updating a blog post by ID
  it('should update a blog post by ID', async () => {
    // First, create a blog post to update it
    const newBlogRes = await request(app)
      .post('/blogs')
      .send({
        title: 'Test Blog',
        description: 'This is a test blog post'
      });

    const { _id } = newBlogRes.body.blog;

    // Then, update the blog post
    const updatedBlogRes = await request(app)
      .put(`/blogs/${_id}`)
      .send({
        title: 'Updated Test Blog'
      });

    expect(updatedBlogRes.statusCode).toEqual(200);
    expect(updatedBlogRes.body).toHaveProperty('message', 'Blog post updated successfully');
    expect(updatedBlogRes.body.blog).toHaveProperty('_id', _id);
    expect(updatedBlogRes.body.blog).toHaveProperty('title', 'Updated Test Blog');
  });

  // Test case for deleting a blog post by ID
  it('should delete a blog post by ID', async () => {
    // First, create a blog post to delete it
    const newBlogRes = await request(app)
      .post('/blogs')
      .send({
        title: 'Test Blog',
        description: 'This is a test blog post'
      });

    const { _id } = newBlogRes.body.blog;

    // Then, delete the blog post
    const res = await request(app).delete(`/blogs/${_id}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'Blog post deleted');
  });
});
