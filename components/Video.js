import { useRef, useEffect, useCallback, useContext, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCurrent } from "../utils/store.js";

export default function video({ socket }) {
    const roomId = useSelector((state) => state.room.id);
    const [videoPosition, setVideoPosition] = useState(0);
    const [isVideoPaused, setIsVideoPaused] = useState(true);
    const [isVideoHovered, setIsVideoHovered] = useState(false);
    const dispatch = useDispatch();
    let duration = 0;
    const videoRef = useRef();
    const anotherUserCurrent = useRef();

    useEffect(() => {
        const update = (currentTime) => {
            console.log("roomId", roomId);
            socket.emit("videoCurrent", roomId, currentTime);
            dispatch(updateCurrent(currentTime));
        };

        duration = videoRef.current.duration;
        const intervalSending = () => {
            return setInterval(() => {
                update(videoRef.current.currentTime);
            }, 1000);
        };
        let timer;

        socket.on("connection", () => {
            let roomId = locatoin.pathname;
            if (!roomid || roomId === "/") {
            }
            socket.emit("join_room", roomId, socket.id);
        });

        socket.on("videoCurrent2", (current) => {
            console.log("position", (current / duration) * 100);
            setVideoPosition((current / duration) * 100);
        });

        videoRef.current.onplay = () => {
            console.log("play", videoRef.current.currentTime);
            update(videoRef.current.currentTime);
            timer = intervalSending();
            setIsVideoPaused(false);
        };
        videoRef.current.onpause = () => {
            console.log("pause", videoRef.current.currentTime);
            update(videoRef.current.currentTime);
            clearInterval(timer);
            setIsVideoPaused(true);
        };

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            <video
                ref={videoRef}
                onMouseEnter={() => setIsVideoHovered(true)}
                onMouseLeave={() => setIsVideoHovered(false)}
                controls
                className="w-sfull aspect-video"
                src="http://1252244310.vod2.myqcloud.com/9089671fvodtransgzp1252244310/8178d9898602268011578964191/v.f100030.mp4"
            ></video>
            <div className="flex-center">
                <div
                    style={{
                        transform: `translateX(${videoPosition}%)`,
                        opacity: isVideoHovered || isVideoPaused ? "1" : "0",
                    }}
                    className="pointer-events-none relative top-[-24px] z-0 mx-[14px] h-[5px] grow rounded duration-500"
                >
                    <div ref={anotherUserCurrent} className="h-3 w-3 -translate-y-1 translate-x-[-50%] rounded-full bg-red-200"></div>
                </div>
            </div>
        </>
    );
}
