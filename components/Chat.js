// import io from "socket.io-client";
// const socket = io("http://localhost:3000");
import { useEffect, useState } from 'react';
import { useSelector, useDispatch, useContext } from 'react-redux';

export default function Chat({ socket }) {
  const [msgs, setMsgs] = useState(['hi111']);
  const [isConnected, setIsConnected] = useState(socket.connected);
  const roomId = useSelector((state) => state.room.id);

  const socketInitializer = async () => {
    // We just call it because we don't need anything else out of it
    await fetch('/api/socket');
  };

  useEffect(() => {
    socketInitializer();

    socket.on('connect', () => {
      console.log('connected to server!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected!');
      setIsConnected(false);
    });

    socket.on('message', (msg) => {
      if (!msg) return;
      msgs.push(msg);
      setMsgs([...msgs]);
      // let a = [...msgs, msg];
      // setMsgs(a);
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('message');
    };
  }, []);

  const sendMsg = (e) => {
    e.preventDefault();
    console.log('e.target[0].value :>> ', e.target[0].value);
    console.log('roomId ', roomId);
    socket.emit('message', roomId, e.target[0].value);
    e.target[0].value = '';
  };

  return (
    <div className="hide-scrollbar overflow-y-scroll">
      <div>
        {msgs.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <form action="" onSubmit={(e) => sendMsg(e)}>
        <input type="text" className="w-full" />
      </form>
    </div>
  );
}
