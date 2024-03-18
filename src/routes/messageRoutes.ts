import express from 'express';
import { getMessages, sendMessage, deleteMessage } from '../controllers/messageController';
import { authenticateToken, authorizeAdmin } from '../middleware/authMiddleware';

const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: Message operations
 */

/**
 * @swagger
 * /messages:
 *   post:
 *     summary: Send a message via contact form
 *     tags: [Messages]
 *     description: Send a message using the contact form.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Bad request, missing required parameters or invalid email format
 *       500:
 *         description: Internal server error
 */

router.post('/', sendMessage);

/**
 * @swagger
 * /messages:
 *   get:
 *     summary: Get all messages
 *     tags: [Messages]
 *     description: Retrieve a list of all messages sent via the contact form.
 *     responses:
 *       200:
 *         description: A list of messages
 *       500:
 *         description: Internal server error
 */

router.get('/', authenticateToken, authorizeAdmin, getMessages);
router.delete('/:id', authenticateToken, authorizeAdmin, deleteMessage);

export default router; 
