import React, { useState } from 'react';

import io from 'socket.io-client';
import { ENDPOINT } from '../utils/config';

// this is for testing socket only
const SocketTest = () => {
  const [jwtToken, setJwtToken] = useState('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJwtToken(event.target.value);
  };

  const connectSocket = () => {
    const socket = io.connect(ENDPOINT);
    socket.on('connect', () => {
      socket
        .emit('authenticate', { token: jwtToken }) //send the jwt
        .on('authenticated', () => {
          //do other things
          socket.on('server-connected', () => {
            alert('Server says hi');
          });
        })
        .on('unauthorized', (msg: any) => {
          alert('Unauthorized');
        });
    });
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '5%' }}>
      <h1>Socket Testing Page</h1>

      <div className="ui input">
        <input
          type="text"
          placeholder="JWT Token"
          value={jwtToken}
          onChange={handleChange}
        />
        <button
          className="ui primary button"
          style={{ display: 'block' }}
          onClick={connectSocket}
        >
          Connect
        </button>
      </div>
    </div>
  );
};

export default SocketTest;
