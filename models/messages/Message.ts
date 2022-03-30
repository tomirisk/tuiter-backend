/**
 * @file Declares Message data type representing relationship between users, as in user messages another user
 */
import User from "../users/User";
import AttachmentType from "./AttachmentType";

/**
 * @typedef Message Represents messages relationship between two users, as in a user messages another user
 * @property {User} to User being messaged
 * @property {User} from User messaging the user
 * @property {string} message the message
 * @property {Date} sentOn date on which the message was sent
 */
export default interface Message {
    message: string,
    sender: User,
    recipient: User,
    sentOn: Date,
    attachments?: AttachmentType
};