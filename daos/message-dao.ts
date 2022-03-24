/**
 * @file Implements DAO managing data storage of messages. Uses mongoose MessageModel
 * to integrate with MongoDB
 */
import MessageDaoI from "../interfaces/MessageDaoI";
import MessageModel from "../mongoose/messages/message-model";
import Message from "../models/messages/message";

/**
 * @class MessageDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessageDao} messageDao Private single instance of MessageDao
 */
export default class MessageDao implements MessageDaoI {
    private static messageDao: MessageDao | null = null;

    /**
     * Creates singleton DAO instance
     * @returns MessageDao
     */
    public static getInstance = (): MessageDao => {
        if(MessageDao.messageDao === null) {
            MessageDao.messageDao = new MessageDao();
        }
        return MessageDao.messageDao;
    }

    private constructor() {}

    /**
     * Uses MessageModel to retrieve all message documents received by the user
     * from message collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllMessagesReceivedByUser = async (uid: string): Promise<Message[]> => {
        return MessageModel.find({to: uid}).populate("from");
    }

    /**
     * Uses MessageModel to retrieve all message documents sent by the user
     * from message collection
     * @param {string} uid User's primary key
     * @returns Promise To be notified when the messages are retrieved from database
     */
    findAllMessagesSentByUser = async (uid: string): Promise<Message[]> => {
        return MessageModel.find({from: uid}).populate("to");
    }

    /**
     * Inserts message instance into the database
     * @param {string} uid User's primary key
     * @param {Message} message Instance to be inserted into the database
     * @returns Promise To be notified when message is inserted into the database
     */
    sendMessage = async (uid: string, message: Message): Promise<any> => {
        return MessageModel.create({...message, from: uid});
    }

    /**
     * Removes message from the database.
     * @param {string} mid Primary key of message to be removed
     * @returns Promise To be notified when message is removed from the database
     */
    deleteMessage = async (mid: string): Promise<any> => {
        return MessageModel.deleteOne({_id: mid});
    }

    /**
     * Updates message with new values in database
     * @param {string} mid Primary key of message to be modified
     * @param {Message} message Message object containing properties and their new values
     * @returns Promise To be notified when message is updated in the database
     */
    updateMessage = async (mid: string, message: Message): Promise<any> => {
        return MessageModel.updateOne({_id: mid}, {$set: message});
    }

    /**
     * Removes all messages sent by the user from the database.
     * @param {string} uid Primary key of user
     * @returns Promise To be notified when all messages are removed from the
     * database
     */
    deleteAllMessages = async (uid: string): Promise<any> => {
        return MessageModel.deleteMany({from: uid});
    }
}
