/**
 * @file MessageController RESTful Web service API for messages resource
 */
import {Express} from "express";
import MessageService from "../services/message-service";

/**
 * @class MessageController Implements RESTful Web service API for messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid1/messages/:uid2 to create a new message instance sent by the user</li>
 *     <li>GET /api/users/:uid/messages to retrieve all the messages sent by a user</li>
 *     <li>GET /api/users/:uid/received-messages to retrieve all the messages received by a user</li>
 *     <li>DELETE /api/messages/:mid to delete a message</li>
 *     <li>PUT /api/messages/:mid to modify a message</li>
 *     <li>DELETE /api/users/:uid/delete-sent-messages to delete all messages sent by a user</li>
 *     <li>DELETE /api/users/:uid/delete-received-messages to delete all messages received by a user</li>
 *     <li>GET /api/users/:uid1/messages/:uid2 to get all messages sent between users</li>
 *     <li>GET /api/messages/:mid to get single message</li>
 *     <li>GET /api/messages to get all messages </li>
 * </ul>
 * @property {MessageService} messageService Singleton service object implementing follows CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController {
    private static messageService: MessageService = MessageService.getInstance();
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

            app.post("/api/users/:uid1/messages/:uid2", MessageController.messageService.userSendsMessage);
            app.delete("/api/messages/:mid", MessageController.messageService.userDeletesMessage);
            app.put("/api/messages/:mid", MessageController.messageService.userUpdatesMessage);
            app.get("/api/users/:uid1/messages/:uid2", MessageController.messageService.findAllMessagesBetweenSpecificUsers);
            app.get("/api/messages/:mid", MessageController.messageService.findMessageById);

        }
        return MessageController.messageController;
    }

    private constructor() {}

};