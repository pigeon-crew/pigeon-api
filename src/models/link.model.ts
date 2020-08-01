import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ILink extends mongoose.Document {
  _id: string;
  linkUrl: string;
  timestamp: Date;
  senderId: string;
  senderName: string;
  message: string;
  recipientId: string;
  readStatus: boolean;
}

const LinkSchema = new Schema({
  linkUrl: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  senderName: { type: String, required: true },
  senderId: { type: String, required: true },
  message: { type: String, required: false },
  recipientId: { type: String, required: true },
  readStatus: { type: Boolean, default: false },
});

const Link = mongoose.model<ILink>('Link', LinkSchema);

export { Link, ILink };
