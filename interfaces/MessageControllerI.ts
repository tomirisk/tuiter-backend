import {Request, Response} from "express";

/**
 * @file Declares API for messages resource
 */
export default interface MessageControllerI {
    findAllMessagesReceivedByUser (req: Request, res: Response): void;
    findAllMessagesSentByUser (req: Request, res: Response): void;
    sendMessage (req: Request, res: Response): void;
    deleteMessage (req: Request, res: Response): void;
    updateMessage (req: Request, res: Response): void;
    deleteAllMessages (req: Request, res: Response): void;
};
