import mongoose from 'mongoose';

const Schema = mongoose.Schema;

interface IUser extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    refreshToken: string;
}

const UserSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    refreshToken: { type: String, required: false },
});

const User = mongoose.model<IUser>('User', UserSchema);

export { User, IUser };
