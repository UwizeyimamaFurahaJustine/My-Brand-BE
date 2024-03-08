import express from 'express';
import { createBlog, getBlogs,getSingleBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog operations
 */

/**
 * @swagger
 * /blogs:
 *   post:
 *     summary: Create a new blog post
 *     tags: [Blogs] 
 *     description: Creates a new blog post with the provided title, image, and description.
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog post created successfully
 *       400:
 *         description: Bad request, missing required parameters
 *       500:
 *         description: Internal server error
 */




router.post('/', authenticateToken, authorizeAdmin, createBlog);

/**
 * @swagger
 * /blogs:
 *   get:
 *     summary: Get all blog posts
 *     tags: [Blogs]
 *     description: Retrieve a list of all blog posts.
 *     responses:
 *       200:
 *         description: A list of blog posts
 *       500:
 *         description: Internal server error
 */

router.get('/', getBlogs);

/**
 * @swagger
 * /blogs/{id}:
 *   get:
 *     summary: Get a blog post by ID
 *     tags: [Blogs] 
 *     description: Retrieve a single blog post by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: A single blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */

router.get('/:id', authenticateToken, getSingleBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   put:
 *     summary: Update a blog post by ID
 *     tags: [Blogs]
 *     description: Update an existing blog post with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               image:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog post updated successfully
 *       400:
 *         description: Bad request, missing required parameters
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */

router.put('/:id', authenticateToken, authorizeAdmin, updateBlog);

/**
 * @swagger
 * /blogs/{id}:
 *   delete:
 *     summary: Delete a blog post by ID
 *     tags: [Blogs]
 *     description: Delete an existing blog post with the provided ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: Blog post deleted
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */

router.delete('/:id', authenticateToken, authorizeAdmin, deleteBlog);

export default router;
