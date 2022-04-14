import {Request, Response} from "express";

/**
 * @file Declares API for groups resource
 */
export default interface GroupServiceI {
    findAllGroups (req: Request, res: Response): void;
    createGroup (req: Request, res: Response): void;
    deleteGroup (req: Request, res: Response): void;
    findGroupById (req: Request, res: Response): void;
    isUserInGroup (req: Request, res: Response): void;
};