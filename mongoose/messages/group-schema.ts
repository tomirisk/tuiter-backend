/**
 * @file Implements mongoose schema
 * for the groups collection
 */

import mongoose, {Schema} from "mongoose";
import Group from "../../models/messages/group";

const GroupSchema = new mongoose.Schema<Group>({
    groupName: {type: String, required: true},
    users: {
        user: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    },
    createdOn: {type: Date, default: Date.now},
}, {collection: "groups"});
export default GroupSchema;