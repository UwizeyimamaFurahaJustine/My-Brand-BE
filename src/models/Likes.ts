import { Document, Schema, model } from 'mongoose';

export interface ILike extends Document {
    user: Schema.Types.ObjectId; // Reference to the user who liked the post
}

const LikeSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User' },
});

export default model<ILike>('Like', LikeSchema);


