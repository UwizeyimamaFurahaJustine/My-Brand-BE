import mongoose, { Schema, Model, Document } from 'mongoose';
import { Like } from './Likes';

interface IBlog extends Document {
    title: string;
    description: string;
    image: string;
    likesNo: number;
    commentsNo: number;
    likes: []; 
}

const BlogSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: {type: String, required: true},
    likesNo: { type: Number, default: 0, required: true },    
    commentsNo: { type: Number, default: 0, required: true } ,
    likes: [{ type: Schema.Types.ObjectId, ref: 'Like'}]
});

const Blog: Model<IBlog> = mongoose.model<IBlog>('Blog', BlogSchema);

export { IBlog, Blog };
