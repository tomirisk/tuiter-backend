/**
 * @file GroupMessageController RESTful Web service API for group messages resource
 */
import {Express} from "express";
import GroupMessageService from "../services/group-message-service";

/**
 * @class GroupMessageController Implements RESTful Web service API for group messages resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/group-messages/:gid to create a new group message instance sent by the user</li>
 *     <li>DELETE /api/group-messages/:mid to delete a group message</li>
 *     <li>GET /api/group-messages/:gid to retrieve all the messages sent in a group</li>
 *     <li>GET /api/group-messages/:mid to retrieve a group message</li>
 * </ul>
 * @property {GroupMessageService} groupMessageService Singleton service object implementing follows CRUD operations
 * @property {GroupMessageController} groupMessageController Singleton controller implementing
 * RESTful Web service API
 */
export default class GroupMessageController {
    private static groupMessageService: GroupMessageService = GroupMessageService.getInstance();
    private static groupMessageController: GroupMessageController | null = null;

    /**
     * Creates singleton controller instance
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @return GroupMessageController
     */
    public static getInstance = (app: Express): GroupMessageController => {
        if(GroupMessageController.groupMessageController === null) {
            GroupMessageController.groupMessageController = new GroupMessageController();

            app.post("/api/users/:uid/group-messages/:gid", GroupMessageController.groupMessageService.userSendsGroupMessage);
            app.delete("/api/group-messages/:mid", GroupMessageController.groupMessageService.userDeletesGroupMessage);
            app.get("/api/group-messages/:gid", GroupMessageController.groupMessageService.findAllMessagesBetweenGroup);
            app.get("/api/group-messages/:mid", GroupMessageController.groupMessageService.findGroupMessageById);

        }
        return GroupMessageController.groupMessageController;
    }

    private constructor() {}

};