// import { Request, Response } from 'express';
// import Subscription from '../models/subscriptionModel';
// import { sendWelcomeEmail } from '../services/emailService';

// export const addSubscription = async (req: Request, res: Response) => {
//   const { email } = req.body;
//   try {
//     const existingSubscription = await Subscription.findOne({ email });
//     if (existingSubscription) {
//       return res.status(400).json({ message: 'Email is already subscribed' });
//     }

//     const newSubscription = new Subscription({ email });
//     await newSubscription.save();

//     // Send welcome email to new subscriber
//     await sendWelcomeEmail(email);

//     res.status(201).json({ message: 'Subscription added successfully' });
//   } catch (error) {
//     console.error('Error adding subscription:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };
