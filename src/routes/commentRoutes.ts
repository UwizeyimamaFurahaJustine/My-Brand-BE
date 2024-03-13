import express from 'express';
import { addComment, getCommentsForBlog } from '../controllers/commentController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comments
 *   description: Comment operations
 */

/**
 * @swagger
 * /comments/{id}:
 *   post:
 *     summary: Add a comment to a blog post
 *     tags: [Comments]
 *     description: The ID of the blog post to comment on.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog to like
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *     responses:       
 *       201:
 *         description: Comment added successfully
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */

router.post('/:id',authenticateToken, addComment);

/**
 * @swagger
 * /comments/{id}:
 *   get:
 *     summary: Get all comments for a blog post
 *     tags: [Comments]
 *     description: Retrieve a list of all comments.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the blog to like
 *         required: true
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of comments on the blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id',authenticateToken, getCommentsForBlog);

export default router;
