import type { NextPage } from 'next';
import React, { useState } from 'react';
import { io } from 'socket.io-client';

const socketClient = io(process.env.NEXT_PUBLIC_SERVER_URL as string, {
  path: '/socket.io/socket.io.js',
});

const Socket: NextPage = () => {
  const [nickname, setNickname] = useState('');

  socketClient.on('enter', (message: string) => {
    console.log(message);
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        socketClient.emit('enter', nickname);
      }}
    >
      <label>닉네임</label>
      <input
        type="input"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <button type="submit">제출</button>
    </form>
  );
};

export default Socket;
