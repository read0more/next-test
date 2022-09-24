require('dotenv').config();
const http = require('http');
const express = require('express');
const { Server } = require('socket.io');
// eslint-disable-next-line import/no-extraneous-dependencies
const { instrument } = require('@socket.io/admin-ui');

const app = express();

const roomName = 'room1';
const handleListen = () =>
  console.log(`Listening on http://localhost:${process.env.SERVER_PORT}`);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['https://admin.socket.io', process.env.CLIENT_URL],
    credentials: true,
  },
});

instrument(io, {
  auth: false,
});

io.on('connection', (socket) => {
  socket.join(roomName);
  socket.on('enter', (nickname) => {
    socket.to(roomName).emit('enter', `${nickname}엔터`);
  });
});

server.listen(process.env.SERVER_PORT, handleListen);
