/**
 * @file Declares API for groupMessages resource
 */

import {Request, Response} from "express";

export default interface GroupMessageServiceI {
    userSendsGroupMessage (req: Request, res: Response): void;
    userDeletesGroupMessage (req: Request, res: Response): void;
    findGroupMessageById (req: Request, res: Response): void;
    findAllMessagesBetweenGroup (req: Request, res: Response): void;
};