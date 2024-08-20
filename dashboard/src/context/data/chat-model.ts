export enum MessageType {
    text = "text",
}

export interface Message {
    id: string
    message: string
    sender: string
    time: Date
    type: MessageType
}