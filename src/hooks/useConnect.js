import { useState, useEffect } from 'react';
import io from 'socket.io-client'

 const useConnect = () => {
  const [socket, setSocket] = useState();

  useEffect(() => {
    setSocket(io.connect('http://localhost:3000'));
    console.log('connecting to server')
  }, []);
   return socket;
};

export default useConnect


