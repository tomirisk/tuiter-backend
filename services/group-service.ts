/**
 * @file Group service RESTful Web service API for group messages resource
 */
import {Request, Response} from "express";
import GroupDao from "../daos/group-dao";
import Group from "../models/messages/group";
import GroupServiceI from "../interfaces/group-service-I";
import GroupMessageDao from "../daos/group-message-dao";

/**
 * @class GroupService Implements RESTful Web service API for group resource
 * @property {GroupDao} groupDao Singleton DAO implementing follows CRUD operations
 * @property {GroupService} groupService Singleton controller implementing
 * RESTful Web service API
 */
export default class GroupService implements GroupServiceI{
    private static groupDao: GroupDao = GroupDao.getInstance();
    private static groupMessageDao: GroupMessageDao = GroupMessageDao.getInstance();
    private static groupService: GroupService | null = null;

    /**
     * Creates singleton service instance
     * @return GroupService
     */
    public static getInstance = (): GroupService => {
        if(GroupService.groupService === null) {
            GroupService.groupService = new GroupService();
        }
        return GroupService.groupService;
    }

    private constructor() {}

    /**
     * Creates a new group instance
     * @param {Request} req Represents request from client, including the
     * body containing the JSON object for the new group to be inserted in the database
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON containing the new group that was inserted in the
     * database
     */
    createGroup = (req: Request, res: Response) => {
        // @ts-ignore
        const creatorUid = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        const usersAddedIds = req.body.usersAddedIds;
        const allUids = usersAddedIds.append(creatorUid);

        if(creatorUid === "me" || !usersAddedIds){
            res.sendStatus(503);
            return;
        }
        try {
            GroupService.groupDao.createGroup(creatorUid, allUids, req.body)
                .then((group: Group) => res.json(group));
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Removes a group instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters gid identifying the primary key of the group to be removed
     * @param {Response} res Represents response to client, including status
     * on whether deleting the group was successful or not
     */
    deleteGroup = (req: Request, res: Response) =>
        GroupService.groupDao.deleteGroup(req.params.gid)
            .then(status => res.send(status));

    /**
     * Finds out if a user is part of a group
     * @param {Request} req Represents request from client, including the path
     * parameter uid, gid representing the current user and the group
     * @param {Response} res Represents response to client, 1 or 0
     */
    isUserInGroup = (req: Request, res: Response) => {
        // @ts-ignore
        const userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        const gid = req.params.gid;

        if(userId === "me"  || !gid){
            res.sendStatus(503);
            return;
        }
        try {
            return GroupService.groupDao.isUserInGroup(userId, gid);
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Retrieves one group with its id from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the group objects
     */
    findGroupById = (req: Request, res: Response) =>
        GroupService.groupDao.findGroupById(req.params.gid)
            .then((group: Group) => res.json(group));

    /**
     * Retrieves all user's groups from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the group objects
     */
    findAllUserGroups = async (req: Request, res: Response) => {
        // @ts-ignore
        const userId = req.params.uid === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid;
        if(userId === "me"){
            res.sendStatus(503);
            return;
        }

        try {
            const groups: Group[] = await GroupService.groupDao.findAllUserGroups(userId);

            if (req.query.metadata && req.query.metadata === "latest-message") {
                const metadata : any[] = [];
                await Promise.all(groups.map(async (group: Group) => {
                    if (group._id) {
                        const latestMessage = await GroupService.groupMessageDao.findMostRecentMessage(String(group._id));
                        if (latestMessage) {
                            metadata.push({_id: group._id, latestMessage});
                        }
                    }
                }));
                res.json({groups, metadata});
            } else {
                res.json(groups)
            }
        } catch (e) {
            console.log(e);
        }
    }

    /**
     * Updates a group instance from the database
     * @param {Request} req Represents request from client, including the
     * path parameters gid identifying the primary key of the group to be updated
     * @param {Response} res Represents response to client, including status
     * on whether updating the group was successful or not
     */
    updateGroup = (req: Request, res: Response) =>
        GroupService.groupDao.updateGroup(req.params.gid, req.body)
            .then(status => res.send(status));
};