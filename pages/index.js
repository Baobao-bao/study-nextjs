import TopForm from "../components/TopForm";
import "../utils/i18n";
import Chat from "../components/Chat";
import Video from "../components/Video";

export default function Home() {
    return (
        <div className="body center">
            <div className="flex w-full max-w-[1600px] flex-col justify-center md:flex-row">
                <div className="div-left md:mr-6 md:w-8/12">
                    <div className="search h-[100px] bg-gray-200">
                        <TopForm />
                    </div>
                    <div className="video mt-4 bg-gray-200 ">
                        <div className="video-title h-[40px] bg-orange-200"></div>
                        {/* <video
                            controls
                            className="w-sfull aspect-video"
                            src="http://1252244310.vod2.myqcloud.com/9089671fvodtransgzp1252244310/8178d9898602268011578964191/v.f100030.mp4"
                        ></video> */}
                        <Video />
                        <div className="controls h-[50px] bg-red-200"></div>
                    </div>
                </div>
                <div className="body-right chat mt-8 flex min-h-[500px]  flex-col bg-gray-200 md:mt-0 md:min-h-max md:w-3/12">
                    <div className="grow"></div>
                    <Chat />
                </div>
            </div>
        </div>
    );
}
