/**
 * @file Message service RESTful Web service API for messages resource
 * and firebase connection services
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/message-dao";
import Message from "../models/messages/message";
import MessageServiceI from "../interfaces/message-service-I";

/**
 * @class MessageService Implements RESTful Web service API for messages resource and firebase
 * connection.
 *
 * @property {MessageDao} messageDao Singleton DAO implementing follows CRUD operations
 * @property {MessageService} messageService Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageService implements MessageServiceI{
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageService: MessageService | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (): MessageService => {
        if(MessageService.messageService === null) {
            MessageService.messageService = new MessageService();
        }
        return MessageService.messageService;
    }

    private constructor() {}

    /**
     * Retrieves all messages received by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the receiver user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesReceivedByUser = (req: Request, res: Response) =>
        MessageService.messageDao.findAllMessagesReceivedByUser(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the sender user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageService.messageDao.findAllMessagesSentByUser(req.params.uid)
            .then((messages: Message[]) => res.json(messages));

    /**
     * Creates a new message instance representing a message sent by a user to another user
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new message to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsMessage = (req: Request, res: Response) => {
        // @ts-ignore
        let uid = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        try {
            MessageService.messageDao.userSendsMessage(uid, req.body)
                .then((message: Message) => res.json(message));
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    userDeletesMessage = (req: Request, res: Response) =>
        MessageService.messageDao.userDeletesMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Modifies an existing message instance
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a message was successful or not
     */
    userUpdatesMessage = (req: Request, res: Response) =>
        MessageService.messageDao.userUpdatesMessage(req.params.mid, req.body)
            .then(status => res.send(status));

    /**
     * Removes all message instance sent by a user from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid identifying the primary key of the user whose sent messages
     * to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the messages was successful or not
     */
    deleteAllMessagesSentByUser = (req: Request, res: Response) => {
        // @ts-ignore
        let uid = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        try {
            MessageService.messageDao.deleteAllMessagesSentByUser(uid).then(status => res.send(status));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Removes all message instance received by a user from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid identifying the primary key of the user whose received messages
     * to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the messages was successful or not
     */
    deleteAllMessagesReceivedByUser = (req: Request, res: Response) => {
        // @ts-ignore
        let uid = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        try {
            MessageService.messageDao.deleteAllMessagesReceivedByUser(uid)
                .then(status => res.send(status));
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Retrieves all messages sent between users from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid1, uid2 representing the users messaging each other
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesBetweenSpecificUsers = (req: Request, res: Response) => {
        // @ts-ignore
        let uid = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;

        try {
            MessageService.messageDao.findAllMessagesBetweenSpecificUsers(uid, req.params.uid2)
                .then((messages: Message[]) => res.json(messages));
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Retrieves one message with its id from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findMessageById = (req: Request, res: Response) =>
        MessageService.messageDao.findMessageById(req.params.mid)
            .then((message: Message) => res.json(message));

    /**
     * Retrieves all messages from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessages = (req: Request, res: Response) =>
        MessageService.messageDao.findAllMessages()
            .then((messages: Message[]) => res.json(messages));

};