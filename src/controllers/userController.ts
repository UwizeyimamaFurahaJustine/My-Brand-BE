import { Request, Response } from 'express';
import User from '../models/User';
import { sign } from 'jsonwebtoken';
import { signupSchema } from '../utils/validation';

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Get a single blog post by ID

export const getSingleUser= async (req: Request, res: Response) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "user not found" });
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Update a blog post by ID
export const updateUser = async (req: Request, res: Response) => {
    try {
        // Validate request payload
       

        const { username, email, password } = req.body;
        const updatedFields: any = { username, email, password};

        const updatedUser = await User.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ message: 'User updated successfully', blog: updatedUser });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a user by ID
export const deleteUser = async (req: Request, res: Response) => {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };
