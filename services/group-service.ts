/**
 * @file Group service RESTful Web service API for group messages resource
 */
import {Request, Response} from "express";
import GroupDao from "../daos/group-dao";
import Group from "../models/messages/group";
import GroupServiceI from "../interfaces/group-service-I";

/**
 * @class GroupService Implements RESTful Web service API for group resource
 * @property {GroupDao} groupDao Singleton DAO implementing follows CRUD operations
 * @property {GroupService} groupService Singleton controller implementing
 * RESTful Web service API
 */
export default class GroupService implements GroupServiceI{
    private static groupDao: GroupDao = GroupDao.getInstance();
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
            GroupService.groupDao.createGroup(allUids, req.body)
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
     * parameter uid1, uid2 representing the current user and the group
     * @param {Response} res Represents response to client, 1 or 0
     */
    isUserInGroup = (req: Request, res: Response) => {
        // @ts-ignore
        const userId = req.params.uid1 === "me" && req.session['profile'] ? req.session['profile']._id : req.params.uid1;
        const gid = req.params.uid2;

        if(userId === "me"  || !gid){
            res.sendStatus(503);
            return;
        }
        try {
            GroupService.groupDao.isUserInGroup(userId, gid)
                .then((status) => res.send(status));
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
     * Retrieves all groups from the database
     * @param {Request} req Represents request from client
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the group objects
     */
    findAllGroups = (req: Request, res: Response) =>
        GroupService.groupDao.findAllGroups()
            .then((groups: Group[]) => res.json(groups));


};