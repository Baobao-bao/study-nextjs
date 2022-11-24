import { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrent } from '../../utils/store.js';
import './video.css';

export default function video({ socket }) {
  const user = useSelector((state) => state.user);

  const videoCurrent = useSelector((state) => state.users[user].videoCurrent);
  const dispatch = useDispatch();

  const videoRef = useRef();

  const update = useCallback((currentTime) => {
    socket.emit('videoCurrent', currentTime);
    dispatch(updateCurrent(currentTime));
  });

  useEffect(() => {
    videoRef.current.onplay = () => {
      update(videoRef.current.currentTime);
    };
    videoRef.current.onpause = () => {
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
        <div className=" relative top-[-24px] z-0 mx-[14px] h-[5px] grow">
          fsda
        </div>
        {/* <input
          className="control-bar relative top-[-24px] z-0 mx-[14px] h-[5px] grow"
          min="0"
          max="100"
          type="range"
          id="host-progress"
        /> */}
      </div>
    </>
  );
}
