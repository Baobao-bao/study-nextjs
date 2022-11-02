import { useRef, useEffect } from "react";

export default function video() {
    const videoRef = useRef();

    useEffect(() => {
        console.log("videoRef", videoRef.current);
        videoRef.current.onplay = () => {
            console.log(videoRef.current.currentTime);
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
