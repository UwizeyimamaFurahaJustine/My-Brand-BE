import mongoose, { Schema, Model, Document } from 'mongoose';

interface IBlog extends Document {
    title: string;
    description: string;
    image: string;
    likesCount: number;
    likes: mongoose.Types.ObjectId[]; // Change type to mongoose.Types.ObjectId[]
    commentsNo: number; 
 
}

const BlogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, required: true},
    likesCount: { type: Number, default: 0, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
    commentsNo: { type: Number, default: 0, required: true } 
   
});

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);

export { IBlog, Blog };
