import { MessageType } from "./messageType.enum";

export interface Message {
    text: string;
    type: MessageType;
}