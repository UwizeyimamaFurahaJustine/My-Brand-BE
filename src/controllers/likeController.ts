import { Request, Response } from 'express';
import {Blog} from '../models/Blog';
import Like from '../models/Likes';

interface AuthRequest extends Request {
    user?: any; // Define the user property
}

export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;

        // Check if the user has already liked the post
        const existingLike = await Like.findOne({ user: userId, blog: id });
        if (existingLike) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        const newLike = new Like({ user: userId, blog: id });
        await newLike.save();

        // Increment likes count in the blog post
        await Blog.findByIdAndUpdate(id, { $inc: { likesCount: 1 } });

        res.json({ message: 'Blog post liked successfully' });
    } catch (err) {
        console.error('Error liking blog post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const getLikesForPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find the blog post and populate the likes field
        const blog = await Blog.findById(id).populate('likes');
        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json({ likesCount: blog.likesCount, likes: blog.likes });
    } catch (err) {
        console.error('Error getting likes:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};









