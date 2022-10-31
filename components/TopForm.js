import { Trans } from "react-i18next";

export default function TopForm() {
    return (
        <div className="flex flex-col shadow">
            <div className="room-info flex-center flex-wrap">
                <div className="flex-center p-1">
                    <span>
                        <Trans>Room name</Trans>
                    </span>
                    <input type="text" className="rounded-md outline-none" />
                </div>
                <div className="flex-center p-1">
                    <span>
                        <Trans>Make it public</Trans>
                    </span>
                    <input type="checkbox" className="rounded" />
                </div>
                <button className="ml-8 rounded-sm bg-white px-2 shadow-sm">
                    sync with host
                </button>
            </div>
            <div className="mx-4 flex overflow-hidden rounded-md border-2 border-purple-600">
                <input type="text" className="grow outline-none" />
                <span className="block w-[80px] text-center">
                    <Trans>Search</Trans>
                </span>
            </div>
        </div>
    );
}
