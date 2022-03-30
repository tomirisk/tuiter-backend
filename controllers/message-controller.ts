// /**
//  * @file Controller RESTful Web service API for follows resource
//  */
// import {Express, Request, Response} from "express";
// import MessageDao from "../daos/message-dao";
// import MessageControllerI from "../interfaces/MessageControllerI";
// import Message from "../models/messages/Message";
//
// /**
//  * @class MessageController Implements RESTful Web service API for messages resource.
//  * Defines the following HTTP endpoints:
//  * <ul>
//  *     <li>POST /api/users/:uid1/messages/:uid2 to create a new message instance sent by the user</li>
//  *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by a user</li>
//  *     <li>GET /api/users/:uid/received-messages to retrieve all the messages received by a user</li>
//  *     <li>DELETE /api/messages/:mid to delete a message</li>
//  *     <li>PUT /api/messages/:mid to modify a message</li>
//  *     <li>DELETE /api/users/:uid/delete-sent-messages to delete all messages sent by a user</li>
//  *     <li>DELETE /api/users/:uid/delete-received-messages to delete all messages received by a user</li>
//  *     <li>GET /api/users/:uid1/messages/:uid2 to get all messages sent between users</li>
//  *     <li>GET /api/messages/:mid to get single message</li>
//  *     <li>GET /api/messages to get all messages </li>
//  * </ul>
//  * @property {MessageDao} messageDao Singleton DAO implementing follows CRUD operations
//  * @property {MessageController} messageController Singleton controller implementing
//  * RESTful Web service API
//  */
// export default class MessageController implements MessageControllerI {
//     private static messageDao: MessageDao = MessageDao.getInstance();
//     private static messageController: MessageController | null = null;
//
//     /**
//      * Creates singleton controller instance
//      * @param {Express} app Express instance to declare the RESTful Web service
//      * API
//      * @return MessageController
//      */
//     public static getInstance = (app: Express): MessageController => {
//         if(MessageController.messageController === null) {
//             MessageController.messageController = new MessageController();
//
//             app.post("/api/users/:uid1/messages/:uid2", MessageController.messageController.userSendsMessage);
//             app.get("/api/users/:uid/messages", MessageController.messageController.findAllMessagesSentByUser);
//             app.get("/api/users/:uid/received-messages", MessageController.messageController.findAllMessagesReceivedByUser);
//             app.delete("/api/messages/:mid", MessageController.messageController.userDeletesMessage);
//             app.put("/api/messages/:mid", MessageController.messageController.userUpdatesMessage);
//             app.delete("/api/users/:uid/delete-sent-messages", MessageController.messageController.deleteAllMessagesSentByUser);
//             app.delete("/api/users/:uid/delete-received-messages", MessageController.messageController.deleteAllMessagesReceivedByUser);
//             app.get("/api/users/:uid1/messages/:uid2", MessageController.messageController.findAllMessagesBetweenSpecificUsers);
//             app.get("/api/messages/:mid", MessageController.messageController.findMessageById);
//             app.get("/api/messages", MessageController.messageController.findAllMessages);
//
//         }
//         return MessageController.messageController;
//     }
//
//     private constructor() {}
//
//     /**
//      * Retrieves all messages received by a user from the database
//      * @param {Request} req Represents request from client, including the path
//      * parameter uid representing the receiver user
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON arrays containing the message objects
//      */
//     findAllMessagesReceivedByUser = (req: Request, res: Response) =>
//         MessageController.messageDao.findAllMessagesReceivedByUser(req.params.uid)
//             .then((messages: Message[]) => res.json(messages));
//
//     /**
//      * Retrieves all messages sent by a user from the database
//      * @param {Request} req Represents request from client, including the path
//      * parameter uid representing the sender user
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON arrays containing the message objects
//      */
//     findAllMessagesSentByUser = (req: Request, res: Response) =>
//         MessageController.messageDao.findAllMessagesSentByUser(req.params.uid)
//             .then((messages: Message[]) => res.json(messages));
//
//     /**
//      * Creates a new message instance representing a message sent by a user to another user
//      * @param {Request} req Represents request from client, including the path parameters uid
//      * and body containing the JSON object for the new message to be inserted in the database
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON containing the new message that was inserted in the
//      * database
//      */
//     userSendsMessage = (req: Request, res: Response) =>
//         MessageController.messageDao.userSendsMessage(req.params.uid1, req.params.uid2, req.body)
//             .then((message: Message) => res.json(message));
//
//     /**
//      * Removes a message instance from the database
//      * @param {Request} req Represents request from client, including the
//      * path parameters mid identifying the primary key of the message to be removed
//      * @param {Response} res Represents response to client, including status
//      * on whether deleting the message was successful or not
//      */
//     userDeletesMessage = (req: Request, res: Response) =>
//         MessageController.messageDao.userDeletesMessage(req.params.mid)
//             .then(status => res.send(status));
//
//     /**
//      * Modifies an existing message instance
//      * @param {Request} req Represents request from client, including path
//      * parameter mid identifying the primary key of the message to be modified
//      * @param {Response} res Represents response to client, including status
//      * on whether updating a message was successful or not
//      */
//     userUpdatesMessage = (req: Request, res: Response) =>
//         MessageController.messageDao.userUpdatesMessage(req.params.mid, req.body)
//             .then(status => res.send(status));
//
//     /**
//      * Removes all message instance sent by a user from the database
//      * @param {Request} req Represents request from client, including the
//      * path parameters uid identifying the primary key of the user whose sent messages to be removed
//      * @param {Response} res Represents response to client, including status
//      * on whether deleting the messages was successful or not
//      */
//     deleteAllMessagesSentByUser = (req: Request, res: Response) =>
//         MessageController.messageDao.deleteAllMessagesSentByUser(req.params.uid)
//             .then(status => res.send(status));
//
//     /**
//      * Removes all message instance sent by a user from the database
//      * @param {Request} req Represents request from client, including the
//      * path parameters uid identifying the primary key of the user whose sent messages to be removed
//      * @param {Response} res Represents response to client, including status
//      * on whether deleting the messages was successful or not
//      */
//     deleteAllMessagesReceivedByUser = (req: Request, res: Response) =>
//         MessageController.messageDao.deleteAllMessagesReceivedByUser(req.params.uid)
//             .then(status => res.send(status));
//
//     /**
//      * Retrieves all messages sent between users from the database
//      * @param {Request} req Represents request from client, including the path
//      * parameter uid1, uid2 representing the users messaging each other
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON arrays containing the message objects
//      */
//     findAllMessagesBetweenSpecificUsers = (req: Request, res: Response) =>
//         MessageController.messageDao.findAllMessagesBetweenSpecificUsers(req.params.uid1, req.params.uid2)
//             .then((messages: Message[]) => res.json(messages));
//
//     /**
//      * Retrieves one message with its id from the database
//      * @param {Request} req Represents request from client
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON arrays containing the message objects
//      */
//     findMessageById = (req: Request, res: Response) =>
//         MessageController.messageDao.findMessageById(req.params.mid)
//             .then((message: Message) => res.json(message));
//
//     /**
//      * Retrieves all messages from the database
//      * @param {Request} req Represents request from client
//      * @param {Response} res Represents response to client, including the
//      * body formatted as JSON arrays containing the message objects
//      */
//     findAllMessages = (req: Request, res: Response) =>
//         MessageController.messageDao.findAllMessages()
//             .then((messages: Message[]) => res.json(messages));

// };