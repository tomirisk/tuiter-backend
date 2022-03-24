/**
 * @file Implements mongoose schema to represent tuits.
 */
import mongoose from "mongoose";
import Tuit from "../../models/tuits/tuit";
const TuitSchema = new mongoose.Schema<Tuit>({
    tuit: {type: String, required: true},
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: "UserModel", required: true},
    postedOn: {type: Date, default: Date.now}
}, {collection: 'tuits'});

export default TuitSchema;
