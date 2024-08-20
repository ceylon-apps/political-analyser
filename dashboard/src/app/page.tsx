import ChatUiComponent from "@/components/parts/chat";
import ChatSidePanelComponent from "@/components/parts/side-panel";
import {ChatStoreProvider} from "@/context/providers/chat-store-provider";
import {CounterStoreProvider} from "@/context/providers/counter-store-provider";
import SocketClient from "@/app/socket-client";

export default function Home() {


    return (
        <ChatStoreProvider>
            <CounterStoreProvider>
                <SocketClient/>
                <main className="grid grid-cols-3 gap-4 w-full h-full">
                    <div className={"col-span-1 flex flex-col justify-between space-y-2"}>
                        <ChatUiComponent/>
                    </div>
                    <div className={"col-span-2 flex flex-col-reverse justify-items-stretch"}>
                        <ChatSidePanelComponent/>
                    </div>
                </main>
            </CounterStoreProvider>
        </ChatStoreProvider>
    );
}