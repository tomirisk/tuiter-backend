import {Request, Response} from "express";
import Message from "../models/messages/message";

/**
 * @file Declares API for messages resource
 */
export default interface MessageServiceI {
    findAllMessages (req: Request, res: Response): void;
    userSendsMessage (req: Request, res: Response): void;
    userDeletesMessage (req: Request, res: Response): void;
    userUpdatesMessage (req: Request, res: Response): void;
    findMessageById (req: Request, res: Response): void;
    findAllMessagesBetweenSpecificUsers (req: Request, res: Response): void;

};

