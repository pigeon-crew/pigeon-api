import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ILike extends mongoose.Document {
  _id: string;
  linkId: string;
  userId: string;
}

const LikeSchema = new Schema({
  linkId: { type: String, required: true },
  userId: { type: String, required: true },
});

const Like = mongoose.model<ILike>('Like', LikeSchema);

export { Like, ILike };
