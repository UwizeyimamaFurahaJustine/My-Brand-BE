import { Request, Response } from 'express';
import {Blog} from '../models/Blog';


interface AuthRequest extends Request {
    user?: any; // Define the user property
}

export const addComment = async (req: AuthRequest, res: Response) => {
    try {
  
        const { id } = req.params;
        const { text } = req.body;
        const userId = req.user.email; // Use the user's ObjectId instead of email

        console.log(`Received comment request for blog ID: ${id}`);
        console.log(`Comment text: ${text}`);
        console.log(`User ID: ${userId}`);

        const blog = await Blog.findById(id);
        if (!blog) {
            console.log(`Blog post not found with ID: ${id}`);
            return res.status(404).json({ message: 'Blog post not found' });
        }

        blog.comments.push({ text, user: userId }); // Populate user with ObjectId
        await blog.save();

        console.log('Comment added successfully');
        res.json({ message: 'Comment added successfully' });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};








export const getCommentsForPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the blog post and populate the comments field
        const blog = await Blog.findById(id).populate('comments.user');
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json(blog.comments);
    } catch (err) {
        console.error('Error getting comments:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};













