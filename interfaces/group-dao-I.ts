import Group from "../models/messages/group";
import User from "../models/users/user";

/**
 * @file Declares API for Group related data access object methods
 */
export default interface GroupDaoI {
    findAllUserGroups (uid: string): Promise<Group[]>;
    createGroup (creatorUid: string, users: User[], group: Group): Promise<Group>;
    deleteGroup (gid: string): Promise<any>;
    findGroupById (gid: string): Promise<any>;
    isUserInGroup (uid: string, gid: string): Promise<number>;
    updateGroup (uid: string, group: Group): Promise<any>;
};
