import { Schema, Document, model } from 'mongoose';

export interface ISubscription extends Document {
  email: string;
  createdAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<ISubscription>('Subscription', SubscriptionSchema);


