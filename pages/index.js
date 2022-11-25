import TopForm from '../components/TopForm';
import '../utils/i18n';
import Chat from '../components/Chat';
import Video from '../components/Video';
import JoinPopup from '../components/JoinPopup';
import { useRef, useEffect, createContext } from 'react';
// const SocketContext = createContext()
import io from 'socket.io-client';
const socket = io('http://localhost:3000');
console.log(socket);

import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Always do navigations after the first render
    router.push('/?room=fhadjsfsdaj', undefined, { shallow: true });
  }, []);

  return (
    // <SocketContext.Provider value={socket}>
    <div className="body flex-center">
      <JoinPopup />
      <div className="flex w-full max-w-[1600px] flex-col justify-center md:flex-row">
        <div className="body-left md:mr-6 md:w-8/12">
          <div className="search h-[100px] bg-gray-200">
            <TopForm />
          </div>
          <div className="video mt-4 bg-gray-200 ">
            <div className="video-title h-[40px] bg-orange-200"></div>
            <Video socket={socket} />
            <div className="controls h-[50px] bg-red-200"></div>
          </div>
        </div>
        {/* h-[calc(206px+37.5vw)] is calculated height of body-lefy, and md:max-h-[806px] is based on max-w-[1600px] */}
        <div className="body-right chat mt-8 flex min-h-[500px] flex-col bg-gray-200 md:mt-0  md:h-[calc(206px+37.5vw)] md:max-h-[806px] md:min-h-max md:w-3/12">
          <div className="grow">avatars</div>
          <Chat socket={socket} />
        </div>
      </div>
    </div>
    // </SocketContext.Provider>
  );
}
