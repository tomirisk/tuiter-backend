/**
 * @file Declares Message data type representing relationship between users, as in user messages another user
 */
import User from "../users/user";
import mongoose from "mongoose";

/**
 * @typedef Message Represents messages relationship between two users, as in a user messages another user
 * @property {User} to User being messaged
 * @property {User} from User messaging the user
 * @property {string} message the message
 * @property {Date} sentOn date on which the message was sent
 */
export default interface Message {
    _id?: mongoose.Schema.Types.ObjectId,
    to: User,
    from: User,
    message: string,
    sentOn: Date
};