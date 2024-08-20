"use client"

import {CornerDownLeft, Mic, Paperclip} from "lucide-react"
import { v4 as uuidv4 } from 'uuid';

import {Button} from "@/components/ui/button"
import {Label} from "@/components/ui/label"
import {Textarea} from "@/components/ui/textarea"
import {Tooltip, TooltipContent, TooltipTrigger,} from "@/components/ui/tooltip"
import {useChatStore} from "@/context/providers/chat-store-provider";
import {useForm} from "react-hook-form";
import {Message, MessageType} from "@/context/data/chat-model";

export default function ChatUiComponent() {
    const {addMessage} = useChatStore((state) => state,)

    const {
        reset,
        register,
        handleSubmit,
        formState: {errors},
    } = useForm();

    return (
        <form
            onSubmit={handleSubmit((data) => {
                const message: Message = {
                    id: uuidv4(),
                    message: data.message,
                    sender: 'user',
                    time: new Date(),
                    type: MessageType.text,
                }
                addMessage(message)

                fetch('http://localhost:7878/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(message),
                }).then(() => {
                    reset()
                });

            })}
            className="relative overflow-hidden rounded-lg border bg-background focus-within:ring-1 focus-within:ring-ring"
        >
            <Label htmlFor="message" className="sr-only">
                Message
            </Label>
            <Textarea
                {...register('message', {required: true})}
                id="message"
                placeholder="Type your message here..."
                className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
            />
            <div className="flex items-center p-4 pt-0">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Paperclip className="size-4"/>
                            <span className="sr-only">Attach file</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Attach File</TooltipContent>
                </Tooltip>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Mic className="size-4"/>
                            <span className="sr-only">Use Microphone</span>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Use Microphone</TooltipContent>
                </Tooltip>
                <Button type="submit" size="sm" className="ml-auto gap-1.5 mb-2">
                    Send Message ss
                    <CornerDownLeft className="size-3.5"/>
                </Button>
            </div>
        </form>
    )
}
