import Group from "../models/messages/group";

/**
 * @file Declares API for GroupMessages related data access object methods
 */
export default interface GroupDaoI {
    findAllGroups (): Promise<Group[]>;
    createGroup (uids: string[], group: Group): Promise<Group>;
    deleteGroup (gid: string): Promise<any>;
    findGroupById (gid: string): Promise<Group>;
    isUserInGroup (uid: string, gid: string): Promise<any>;
};
