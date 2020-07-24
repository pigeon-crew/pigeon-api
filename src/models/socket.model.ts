import mongoose from 'mongoose';

const { Schema } = mongoose;

interface ISocket extends mongoose.Document {
  _id: string;
  uid: string;
  socketId: string;
}

const SocketSchema = new Schema({
  uid: { type: String },
  socketId: { type: String, required: true },
});

const Socket = mongoose.model<ISocket>('Socket', SocketSchema);

export { Socket, ISocket };
