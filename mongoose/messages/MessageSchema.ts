/**
 * @file Implements mongoose schema
 * for the messages collection
 */

import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/Message";

const MessageSchema = new mongoose.Schema<Message>({
    message: {type: String, required: true},
    sender: {type: Schema.Types.ObjectId, ref: "UserModel"},
    recipient: {type: Schema.Types.ObjectId, ref: "UserModel"},
    sentOn: {type: Date, default: Date.now},
    attachments: {type: String, enum: ["pdf", "jpg"]}
}, {collection: "dislikes"});
export default MessageSchema;