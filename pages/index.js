import TopForm from "../components/TopForm";
import "../utils/i18n";
import Chat from "../components/Chat";
import Video from "../components/Video";
import JoinPopup from "../components/JoinPopup";
import Quiz from "../components/Quiz";
import { useEffect } from "react";
import { useRouter } from "next/router";
import io from "socket.io-client";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setRoomId } from "../utils/store.js";
import classNames from "classnames";

const socket = io("/");
console.log(socket);

export default function Home() {
    const router = useRouter();
    const isPrivate = useSelector((state) => state.room.isPrivate);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!router.query.room) {
            router.push("/?room=this-is-room-id", undefined, { shallow: true });
        }
    }, []);

    useEffect(() => {
        if (!router.query.room) return;
        console.log("router.query.room", router.query.room);
        socket.emit("join-room", router.query.room, socket.id); // send roomId and userId
        dispatch(setRoomId(router.query.room));
        socket.on("user-joining-room", (userId) => {
            let user = {
                userId: userId,
            };
            dispatch(addUser(user));
        });
        socket.on("room-member", (room) => {
            console.log(typeof room, room);
            room.map((userId) => {
                let user = {
                    userId: userId,
                };
                dispatch(addUser(user));
            });
        });
        socket.on("closeReason", (reason) => {
            console.log("close reason: >>>", reason);
        });

        socket.on("leaving", (id) => {
            console.log(`user ${id} is leaving`);
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    }, [router.query.room]);

    return (
        // <SocketContext.Provider value={socket}>
        <div className="body flex-center max-md:flex-col">
            {isPrivate && <JoinPopup />}
            <div className={classNames("flex w-full max-w-[1600px] flex-col justify-center md:flex-row", isPrivate && "blur-md")}>
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
            <Quiz></Quiz>
        </div>
        // </SocketContext.Provider>
    );
}
