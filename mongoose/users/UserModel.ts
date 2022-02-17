/**
 * @file Implements mongoose model to CRUD
 * documents in the users collection
 */
import mongoose from "mongoose";
import UserSchema from "./UserSchema";
import User from "../../models/users/User";
const UserModel = mongoose.model<User>('UserModel', UserSchema);
export default UserModel;
