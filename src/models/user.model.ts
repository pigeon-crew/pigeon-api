import mongoose from 'mongoose';

const { Schema } = mongoose;

interface IUser extends mongoose.Document {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  refreshToken: string;
  friendships: [string];
  notificationCount: number;
}

const UserSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  refreshToken: { type: String, required: false },
  friendships: [String],
  notificationCount: { type: Number, default: 0 },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
