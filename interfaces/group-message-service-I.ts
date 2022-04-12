import {Request, Response} from "express";

/**
 * @file Declares API for groupMessages resource
 */
export default interface GroupMessageServiceI {
    findAllGroupMessages (req: Request, res: Response): void;
    userSendsGroupMessage (req: Request, res: Response): void;
    userDeletesGroupMessage (req: Request, res: Response): void;
    findGroupMessageById (req: Request, res: Response): void;
    findAllMessagesBetweenGroup (req: Request, res: Response): void;
};