/**
 * @file GroupMessage service RESTful Web service API for group messages resource
 */
import {Request, Response} from "express";
import GroupMessageDao from "../daos/group-message-dao";
import GroupMessage from "../models/messages/group-message";
import GroupMessageServiceI from "../interfaces/group-message-service-I";

/**
 * @class GroupMessageService Implements RESTful Web service API for group messages resource
 * @property {GroupMessageDao} GroupMessageDao Singleton DAO implementing follows CRUD operations
 * @property {GroupMessageService} GroupMessageService Singleton controller implementing
 * RESTful Web service API
 */
export default class GroupMessageService implements GroupMessageServiceI{
    private static groupMessageDao: GroupMessageDao = GroupMessageDao.getInstance();
    private static groupMessageService: GroupMessageService | null = null;

    /**
     * Creates singleton service instance
     * @return GroupMessageService
     */
    public static getInstance = (): GroupMessageService => {
        if(GroupMessageService.groupMessageService === null) {
            GroupMessageService.groupMessageService = new GroupMessageService();
        }
        return GroupMessageService.groupMessageService;
    }

    private constructor() {}

    /**
     * Creates a new group message instance representing a message sent by a user to a group
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new message to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new message that was inserted in the
     * database
     */
    userSendsGroupMessage = (req: Request, res: Response) => {
        // @ts-ignore
        const senderUid = req.params.uid1 === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid1;
        const groupId = req.params.uid2;
        if(senderUid === "me" || !groupId){
            res.sendStatus(503);
            return;
        }
        try {
            GroupMessageService.groupMessageDao.userSendsGroupMessage(senderUid, groupId, req.body)
                .then((message: GroupMessage) => res.json(message));
        } catch (e) {
            console.log(e);
        }
    }


    /**
     * Removes a group message instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters mid identifying the primary key of the message to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the group message was successful or not
     */
    userDeletesGroupMessage = (req: Request, res: Response) =>
        GroupMessageService.groupMessageDao.userDeletesGroupMessage(req.params.mid)
            .then(status => res.send(status));

    /**
     * Retrieves all group messages sent between a group from the database
     * @param {Request} req Represents request from client, including the path
     * parameter uid1, uid2 representing the users in the group messaging
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findAllMessagesBetweenGroup = (req: Request, res: Response) => {
        const groupId = req.params.gid;
        if(!groupId){
            res.sendStatus(503);
            return;
        }
        try {
            GroupMessageService.groupMessageDao.findAllMessagesBetweenGroup(groupId)
                .then((messages: GroupMessage[]) => res.json(messages));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Retrieves one group message with its id from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the message objects
     */
    findGroupMessageById = (req: Request, res: Response) =>
        GroupMessageService.groupMessageDao.findGroupMessageById(req.params.mid)
            .then((message: GroupMessage) => res.json(message));


};