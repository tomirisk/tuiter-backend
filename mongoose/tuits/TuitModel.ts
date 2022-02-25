/**
 * @file Implements mongoose model to CRUD documents in the tuits collection.
 */
import mongoose from "mongoose";
import TuitSchema from "./TuitSchema";
import Tuit from "../../models/tuits/Tuit";
const TuitModel = mongoose.model<Tuit>('TuitModel', TuitSchema);
export default TuitModel;

