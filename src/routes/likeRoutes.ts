import express from 'express';
import { likePost, getLikesForPost, unlikePost} from '../controllers/likeController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Like operations
 */

/**
 * @swagger
 * /likes/{id}:
 *   post:
 *     summary: Like a blog post
 *     tags: [Likes]
 *     description: Like a blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to like
 *     responses:
 *       200:
 *         description: Blog post liked successfully
 *       400:
 *         description: Bad request, user already liked the post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.post('/:id', authenticateToken, likePost);

/**
 * @swagger
 * /likes/{id}:
 *   delete:
 *     summary: Unlike a blog post
 *     tags: [Likes]
 *     description: Unlike a previously liked blog post.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post to unlike
 *     responses:
 *       200:
 *         description: Blog post unliked successfully
 *       404:
 *         description: Like not found or already removed
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', authenticateToken, unlikePost);

/**
 * @swagger
 * /likes/{id}:
 *   get:
 *     summary: Get all likes for a blog post
 *     tags: [Likes]
 *     description: Get all likes for a blog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the blog post
 *     responses:
 *       200:
 *         description: List of users who liked the blog post
 *       404:
 *         description: Blog post not found
 *       500:
 *         description: Internal server error
 */
router.get('/:id', getLikesForPost);

export default router;
