import { Schema, model, Document } from 'mongoose';

interface IMessage extends Document {
    name: string;
    email: string;
    message: string;
    createdAt: string; 
}

const MessageSchema = new Schema({
    name: String,
    email: String,
    message: String,
    createdAt: { 
        type: String, 
        default: () => new Date().toString(),
        immutable: true 
    } 
});

export default model<IMessage>('Message', MessageSchema);
