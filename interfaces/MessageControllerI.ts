import {Request, Response} from "express";
import Message from "../models/messages/Message";

/**
 * @file Declares API for messages resource
 */
export default interface MessageControllerI {
    findAllMessages (req: Request, res: Response): void;
    findAllMessagesReceivedByUser (req: Request, res: Response): void;
    findAllMessagesSentByUser (req: Request, res: Response): void;
    userSendsMessage (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    userUpdatesMessage (req: Request, res: Response): void;
    findMessageById (req: Request, res: Response): void;
    findAllMessagesBetweenSpecificUsers (req: Request, res: Response): void;
    deleteAllMessagesSentByUser (req: Request, res: Response): void;
    deleteAllMessagesReceivedByUser (req: Request, res: Response): void;
};

