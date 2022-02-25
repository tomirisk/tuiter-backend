/**
 * @file Controller RESTful Web service API for follows resource
 */
import {Express, Request, Response} from "express";
import MessageDao from "../daos/MessageDao";
import MessageControllerI from "../interfaces/MessageControllerI";
import Message from "../models/messages/Message";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/messages to create a new message instance sent by the user</li>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by a user</li>
 *     <li>GET /api/users/:uid/received-messages to retrieve all the messages received by a user</li>
 *     <li>DELETE /api/messages/:mid to delete a message</li>
 *     <li>PUT /api/messages/:mid to modify a message</li>
 *     <li>DELETE /api/users/:uid/messages to delete all messages sent by a user</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing follows CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessageControllerI {
    private static messageDao: MessageDao = MessageDao.getInstance();
    private static messageController: MessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return MessageController
     */
    public static getInstance = (app: Express): MessageController => {
        if(MessageController.messageController === null) {
            MessageController.messageController = new MessageController();

            app.post("/api/users/:uid/messages", MessageController.messageController.sendMessage);
            app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesSentByUser);
            app.get("/api/users/:uid/received-messages", MessageController.messageController.findAllMessagesReceivedByUser);
            app.delete("/api/messages/:mid", MessageController.messageController.deleteMessage);
            app.put("/api/messages/:mid", MessageController.messageController.updateMessage);
            app.delete("/api/users/:uid/messages", MessageController.messageController.deleteAllMessages);
        }
        return MessageController.messageController;
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
        MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid).then((messages: Message[]) => res.json(messages));

    /**
     * Retrieves all messages sent by a user from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid representing the sender user
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesSentByUser = (req: Request, res: Response) =>
        MessageController.messageDao.findAllMessagesSentByUser(req.params.uid).then((messages: Message[]) => res.json(messages));

    /**
     * Creates a new message instance representing a message sent by a user to another user
     * @param {Request} req Represents request from client, including the path parameters uid
     * and body containing the JSON object for the new message to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    sendMessage = (req: Request, res: Response) =>
        MessageController.messageDao.sendMessage(req.params.uid, req.body).then((message: Message) => res.json(message));

    /**
     * Removes a message instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the message was successful or not
     */
    deleteMessage = (req: Request, res: Response) =>
        MessageController.messageDao.deleteMessage(req.params.mid).then(status => res.send(status));

    /**
     * Modifies an existing message instance
     * @param {Request} req Represents request from client, including path
     * parameter mid identifying the primary key of the message to be modified
     * @param {Response} res Represents response to client, including status
     * on whether updating a message was successful or not
     */
    updateMessage = (req: Request, res: Response) =>
        MessageController.messageDao.updateMessage(req.params.mid, req.body).then(status => res.send(status));

    /**
     * Removes all message instance sent by a user from the database
     * @param {Request} req Represents request from client, including the
     * path parameters uid identifying the primary key of the user whose sent messages to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the messages was successful or not
     */
    deleteAllMessages = (req: Request, res: Response) =>
        MessageController.messageDao.deleteAllMessages(req.params.uid).then(status => res.send(status));

};