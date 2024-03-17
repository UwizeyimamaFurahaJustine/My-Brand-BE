import { Request, Response } from 'express';
import Message from '../models/Message';
import { contactSchema } from '../utils/validation';

export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { error } = contactSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const { name, email, message } = req.body;
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Get all messages
export const getMessages = async (req: Request, res: Response) => {
    try {
        const messages = await Message.find();
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Delete a blog post by ID
export const deleteMessage = async (req: Request, res: Response) => {
    try {
      const deletedMessage = await Message.findByIdAndDelete(req.params.id);
      if (!deletedMessage) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json({ message: "Message deleted" });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  };


