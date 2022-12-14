require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
// eslint-disable-next-line import/no-extraneous-dependencies
const {
  createAdapter: createRedisAdapter,
} = require('@socket.io/redis-adapter');
const { createClient } = require('redis');
const { instrument } = require('@socket.io/admin-ui');

const app = express();

const roomName = 'room1';
const handleListen = () =>
  console.log(
    `Listening on http://localhost:${process.env.SOCKET_SERVER_PORT}`
  );

app.get('/', (req, res) => {
  res.end('socket server');
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io', process.env.CLIENT_URL],
    credentials: true,
  },
});

const pubClient = createClient({ url: process.env.REDIS_URL });
const subClient = pubClient.duplicate();

Promise.all([pubClient.connect(), subClient.connect()]).then(() => {
  io.adapter(createRedisAdapter(pubClient, subClient));

  instrument(io, {
    auth: false,
  });

  io.on('connection', (socket) => {
    socket.join(roomName);
    socket.on('enter', (nickname) => {
      socket.to(roomName).emit('enter', `${nickname}엔터`);
    });
  });

  server.listen(process.env.SOCKET_SERVER_PORT, handleListen);
});
