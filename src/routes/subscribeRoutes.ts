import express from "express";
import {
  authenticateToken,
  authorizeAdmin,
} from "../middleware/authMiddleware";
import {
  addSubscription,
  getSubscriptions,
} from "../controllers/subscribeController";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Subscribe
 *   description: NewsLetter subscriptions
 */

/**
 * @swagger
 * /subscribe:
 *   post:
 *     summary: Subsribe to a newsletter
 *     tags: [Subscribe]
 *     description: Send your email to subscribe to our newsletters.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *            schema:
 *              type: object
 *              properties:
 *                  email:
 *                    type: string
 *     responses:
 *       200:
 *         description: News letter subscription added successfully
 *       400:
 *         description: Bad request, email already have a subscription
 *       404:
 *         description: Email not found
 *       500:
 *         description: Internal server error
 */
router.post("/", addSubscription);

/**
 * @swagger
 * /subscribe:
 *   get:
 *     summary: Get all newsletter subscriptions
 *     tags: [Subscribe]
 *     description: List of subscribers.
 *     responses:
 *       200:
 *         description: Newsletter subscriptions
 *       404:
 *         description: Not found
 *       500:
 *         description: Internal server error
 */
router.get("/", authenticateToken, authorizeAdmin, getSubscriptions);

export default router;
