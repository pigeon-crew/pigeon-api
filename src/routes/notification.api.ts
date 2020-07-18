import express from 'express';
import eventEmitter from '../utils/eventEmitter';

const router = express.Router();

// sse example
// https://github.com/Orang-utan/ts-canvas/blob/dev/src/routes/canvas.route.ts

// notification
router.get('/', (req, res) => {
  res.writeHead(200, {
    Connection: 'keep-alive',
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
  });

  req.on('close', () => {
    eventEmitter.removeAllListeners();
    res.end();
    console.log('Stop sending events since client closed connection.');
  });
});

export default router;
