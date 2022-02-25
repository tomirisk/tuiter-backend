import Message from "../models/messages/Message";

/**
 * @file Declares API for Messages related data access object methods
 */
export default interface MessageDaoI {
    findAllMessagesReceivedByUser (uid: string): Promise<Message[]>;
    findAllMessagesSentByUser (uid: string): Promise<Message[]>;
    sendMessage (uid: string, message: Message): Promise<Message>;
    deleteMessage (mid: string): Promise<any>;
    updateMessage (mid: string, message: Message): Promise<any>;
    deleteAllMessages (uid: string): Promise<any>;
};
