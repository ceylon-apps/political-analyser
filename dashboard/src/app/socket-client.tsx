'use client'
import {useEffect, useState} from "react";
import {socket} from "@/socket";
import {useChatStore} from "@/context/providers/chat-store-provider";
import {Message, MessageType} from "@/context/data/chat-model";

const SocketClient = () => {
    const [isConnected, setIsConnected] = useState(false);
    const [transport, setTransport] = useState("N/A");

    const {addMessage} = useChatStore((state) => state,)

    useEffect(() => {
        if (socket.connected) {
            onConnect();
        }

        function onConnect() {
            setIsConnected(true);
            setTransport(socket.io.engine.transport.name);

            socket.io.engine.on("upgrade", (transport) => {
                setTransport(transport.name);
            });
        }

        function onDisconnect() {
            setIsConnected(false);
            setTransport("N/A");
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);

        socket.on("system_message", (data) => {
            console.log(data)
            const message: Message = {
                id: data.id,
                message: data.message,
                sender: 'system',
                time: data.time,
                type: MessageType.text,
            }
            addMessage(message)
        })

        return () => {
            socket.off("connect", onConnect);
            socket.off("system_message", onConnect);
            socket.off("disconnect", onDisconnect);
        };
    }, [addMessage]);
    return (
        <>

        </>
    )
}

export default SocketClient