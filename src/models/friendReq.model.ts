import mongoose from 'mongoose';

const { Schema } = mongoose;

enum FriendReqStatus {
  requested,
  accepted,
  rejected,
}

interface IFriendReq extends mongoose.Document {
  _id: string;
  requesterId: string;
  requesterName: string;
  recipientId: string;
  status: FriendReqStatus;
}

const FriendReqSchema = new Schema({
  requesterId: {
    type: String,
    required: true,
  },
  requesterName: {
    type: String,
    required: true,
  },
  recipientId: {
    type: String,
    required: true,
  },
  status: {
    type: FriendReqStatus,
    required: true,
  },
});

const FriendReq = mongoose.model<IFriendReq>('Friend Request', FriendReqSchema);

export { FriendReq, IFriendReq, FriendReqStatus };
