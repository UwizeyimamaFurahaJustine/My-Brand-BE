// import mongoose, { Document, Schema, Model } from 'mongoose';

// // Define the interface for Comment
// interface IComment extends Document {
//     text: string;
//     user: Schema.Types.ObjectId; // Reference to the user who posted the comment
// }

// // Define the schema for Comment
// const CommentSchema = new Schema({
//     text: { type: String, required: true },
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
// });

// // Define the Comment model
// const Comment: Model<IComment> = mongoose.model<IComment>('Comment', CommentSchema);

// export { IComment, Comment };
