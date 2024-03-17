import { Request, Response } from 'express';
import mongoose from 'mongoose';
import { Blog, IBlog } from '../models/Blog';
import { Like } from '../models/Likes';
import User from '../models/User';

interface AuthRequest extends Request {
    user?: { email: string; username: string };
}

export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        
        const { id: blogId }= req.params;
        
        const email = req.user?.email;
        const user = await User.findOne({ email }); // find user by their email 
        
        
        const userId = user;
        const username = req.user?.username;

        if (!userId || !username) {
            return res.status(400).json({ message: 'User not found' });
        }

        const existingLike = await Like.findOne({ user: userId, blog: blogId });
        if (existingLike) {
            return res.status(400).json({ message: 'You already liked this post' });
        }

        const newLike = new Like({ user: userId, username, blog: blogId });
        await newLike.save();

        await Blog.findByIdAndUpdate(blogId, { $inc: { likesNo: 1 } });

        res.json({ message: 'Blog post liked successfully' });
    } catch (err) {
        console.error('Error liking blog post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const unlikePost = async (req: AuthRequest, res: Response) => {
    try {
        const { id: blogId } = req.params;
        const email = req.user?.email;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const userId = user._id;

        const like = await Like.findOneAndDelete({ user: userId, blog: blogId });

        if (!like) {
            return res.status(404).json({ message: 'Like not found or already removed' });
        }

        // Remove the username from the like
        await Like.findByIdAndUpdate(like._id, { $unset: { username: 1 } });

        await Blog.findByIdAndUpdate(blogId, { $inc: { likesNo: -1 } });

        res.json({ message: 'Blog post unliked successfully' });
    } catch (err) {
        console.error('Error unliking blog post:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};



export const getLikesForPost = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Find all likes associated with the blog post ID
        const likes = await Like.find({ blog: id });

        // Extract usernames from the likes array
        const usernames: string[] = likes.map((like: any) => like.username);

        // Get the blog post to retrieve its likes count
        const blog: IBlog | null = await Blog.findById(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog post not found' });
        }

        res.json({ likesNumber: blog.likesNo, usernames });
    } catch (err) {
        console.error('Error getting likes:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};