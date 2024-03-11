import { Request, Response } from "express";
import Subscription, { ISubscription } from "../models/subscribeModel";
import { sendWelcomeEmail } from "../services/emailService";

const addSubscription = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { email }: { email: string } = req.body;
  try {

    

    const existingSubscription: ISubscription | null =
      await Subscription.findOne({ email });
    if (existingSubscription) {
        res.status(400).json({ message: "Email is already subscribed" });
    }

    const newSubscription: ISubscription = new Subscription({ email });
    await newSubscription.save();

    // Send welcome email to new subscriber
    await sendWelcomeEmail(email);

    res.status(201).json({ message: "Subscription added successfully" });
  } catch (error: any) {
    console.error("Error adding subscription:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getSubscriptions = ()=>{};

export {addSubscription, getSubscriptions};
