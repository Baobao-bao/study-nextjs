import { useRef, useEffect, useCallback, useContext, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrent } from '../utils/store.js';

export default function video({ socket }) {
  const user = useSelector((state) => state.user);
  const [videoPosition, setVideoPosition] = useState(0);
  // const videoCurrent = useSelector((state) => state.users[user].videoCurrent);
  const dispatch = useDispatch();
  let duration = 0;

  const videoRef = useRef();
  const anotherUserCurrent = useRef();

  const update = useCallback((currentTime) => {
    socket.emit('videoCurrent', currentTime);
    dispatch(updateCurrent(currentTime));
  });

  useEffect(() => {
    duration = videoRef.current.duration;

    socket.on('videoCurrent', (current) => {
      console.log('current', current);
      console.log('duration', duration);
      setVideoPosition(current / duration);
    });

    videoRef.current.onplay = () => {
      console.log('play', videoRef.current.currentTime);
      update(videoRef.current.currentTime);
    };
    videoRef.current.onpause = () => {
      console.log('pause', videoRef.current.currentTime);
      update(videoRef.current.currentTime);
    };
    let timer = setInterval(() => {
      update(videoRef.current.currentTime);
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <>
      <video
        ref={videoRef}
        controls
        className="w-sfull aspect-video"
        src="http://1252244310.vod2.myqcloud.com/9089671fvodtransgzp1252244310/8178d9898602268011578964191/v.f100030.mp4"
      ></video>
      <div className="flex-center">
        <div
          style={{ transform: `translateX(${videoPosition}%)` }}
          className="relative top-[-24px] z-0 mx-[14px] h-[5px] grow rounded pointer-events-none bg-green-200"
        >
          <div
            ref={anotherUserCurrent}
            className="w-4 h-4 rounded-full bg-red-200 translate-y-[-50%] translate-x-[-50%]"
          ></div>
        </div>
        {/* <input
          className="relative top-[-24px] z-0 mx-[14px] h-[5px] grow"
          min="0"
          max="100"
          type="range"
          id="host-progress"
        /> */}
      </div>
    </>
  );
}
