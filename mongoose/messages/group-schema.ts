/**
 * @file Implements mongoose schema
 * for the groups collection
 */

import mongoose, {Schema} from "mongoose";
import Group from "../../models/messages/group";

const UserSchema = new Schema({ name: String });


const GroupSchema = new mongoose.Schema<Group>({
    name: {type: String, required: true},
    users: [UserSchema],
    // users:[
    //     {
    //         user: {type: Schema.Types.ObjectId, ref: "UserModel"},
    //     }
    // ],
    createdOn: {type: Date, default: Date.now},
}, {collection: "groups"});
export default GroupSchema;