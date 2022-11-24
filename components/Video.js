import { useRef, useEffect, useCallback, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCurrent } from '../utils/store.js';

export default function video({socket}) {
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
      console.log('play', videoRef.current.currentTime);
      update(videoRef.current.currentTime);
    };
    videoRef.current.onpause = () => {
      console.log('pause', videoRef.current.currentTime);
      update(videoRef.current.currentTime);
    };
    setInterval(()=> {
      update(videoRef.current.currentTime);
    }, 3000)
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
        <input
          className="relative top-[-24px] z-0 mx-[14px] h-[5px] grow"
          min="0"
          max="100"
          type="range"
          id="host-progress"
        />
      </div>
    </>
  );
}
