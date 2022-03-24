/**
 * @file Implements mongoose schema to represent messages.
 */
import mongoose, {Schema} from "mongoose";
import Message from "../../models/messages/message";

const MessageSchema = new mongoose.Schema<Message>({
    to: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    from: {type: Schema.Types.ObjectId, ref: "UserModel", required: true},
    message: {type: String, required: true},
    sentOn: {type: Date, default: Date.now}
}, {collection: "messages"});

export default MessageSchema;