import mongoose from "mongoose";
import UserSchema from "./UserSchema";
import User from "../../models/users/User";
const UserModel = mongoose.model<User>('UserModel', UserSchema);
export default UserModel;

