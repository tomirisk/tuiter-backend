/**
 * @file Implements model to represent tuits.
 */
import User from "../users/User";

export default interface Tuit {
    tuit: string,
    postedBy: User,
    postedOn?: Date,
};