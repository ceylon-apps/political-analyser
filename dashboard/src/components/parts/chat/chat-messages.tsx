'use client'
import {Card, CardContent} from "@/components/ui/card";
import {useChatStore} from "@/context/providers/chat-store-provider";

const ChatMessages = () => {
    const {messages} = useChatStore((state) => state,)
    return <Card className="overflow-hidden w-full h-full">
        <CardContent className={"py-2"}>
            <ul>
                {messages.map((message, index) => {
                    return <li key={index} className="py-2">
                        <div className="flex items-center space-x-3">
                            <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
                                {/*<img*/}
                                {/*    src={message.authorAvatar}*/}
                                {/*    alt={message.authorName}*/}
                                {/*    className="h-full w-full object-cover"*/}
                                {/*/>*/}
                            </div>
                            <div className="flex-1">
                                <div className="text-sm">
                                    <div className="font-medium text-gray-900 dark:text-slate-100">
                                        {message.sender}
                                    </div>
                                </div>
                                <div className="mt-1 text-sm text-blue-700 dark:text-blue-100">
                                    <p>
                                        {message.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                })}
            </ul>
        </CardContent>
    </Card>;
};

export default ChatMessages