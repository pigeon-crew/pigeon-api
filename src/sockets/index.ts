import socket from 'socket.io';
import { Socket } from '../models/socket.model';
import { User } from '../models/user.model';
import { Like } from '../models/like.model';
import { Link } from '../models/link.model';

const onConnection = (client: socket.Socket, io: socket.Server) => {
  console.log('Connected...');
  client.on('bindUID', async (payload) => {
    console.log('Bind UID to Socket');
    const { _id: uid } = payload;
    const socketId = client.id;

    const existingSocket = await Socket.findOne({ socketId });
    // if a live socket connection exists
    // simply update the user binding
    if (existingSocket) {
      existingSocket.uid = uid;
      await existingSocket.save();
    } else {
      const newSocket = new Socket({
        uid,
        socketId,
      });

      await newSocket.save();
    }
  });

  client.on('unbindUID', async () => {
    console.log('Unbind UID to Socket');
    const socketId = client.id;

    await Socket.updateOne({ socketId }, { uid: '' });
  });

  client.on('disconnect', async () => {
    console.log('Disconnected');
    const socketId = client.id;

    await Socket.deleteMany({ socketId });
  });

  client.on('linkSent', async (payload) => {
    console.log('Link Sent Event Received');
    const { senderId, recipientEmail } = payload;
    // find sender
    const sender = await User.findById(senderId);
    if (!sender) return;
    // find recipient socket
    const recipient = await User.findOne({ email: recipientEmail });
    if (!recipient) return;
    const recipientId = recipient._id;
    const recipientSockets = await Socket.find({ uid: recipientId });

    // update notification count
    recipient.notificationCount += 1;
    await recipient.save();

    if (recipientSockets) {
      const payloadEmit = {
        title: 'New Link from Pigeon',
        message: `${sender.firstName} ${sender.lastName} just sent you a link!`,
      };

      recipientSockets.forEach((recipientSocket) => {
        io.to(recipientSocket.socketId).emit('notifyNewLink', payloadEmit);
      });
      console.log('Notify new link');
    }
  });

  client.on('linkLiked', async (payload) => {
    console.log('Link Liked Event Received');
    const { senderId, linkId } = payload;

    const sender = await User.findById(senderId);
    if (!sender) return;

    const targetLink = await Link.findById(linkId);
    if (!targetLink) return;

    const posterId = targetLink.senderId;

    if (String(senderId) === posterId) return;

    // find poster's socket
    const posterSockets = await Socket.find({ uid: posterId });

    if (posterSockets) {
      const payloadEmit = {
        title: `${sender.firstName} just starred your link!`,
        message: `${sender.firstName} ${sender.lastName} just starred your recent link: ${targetLink.linkUrl}`,
      };

      posterSockets.forEach((posterSocket) => {
        io.to(posterSocket.socketId).emit('notifyNewLike', payloadEmit);
      });
    }
  });
};

export default onConnection;
