/**
 * @file Implements mongoose model to CRUD documents in the messages collection.
 */
import mongoose from "mongoose";
import MessageSchema from "./MessageSchema";
import Message from "../../models/messages/Message";
const MessageModel = mongoose.model<Message>("MessageModel", MessageSchema);
export default MessageModel;