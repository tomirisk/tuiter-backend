/**
 * @file Implements mongoose schema to represent stories.
 */
import mongoose, {Schema} from "mongoose";
import Story from "../../models/stories/story";
import Visibility from "../../models/stories/visibility";


const StorySchema = new mongoose.Schema<Story>({
  image: {type: String, required: true},
  visibility: {type: String, enum: Visibility},
  description: String,
  postedOn: {type: Date, default: Date.now},
  postedBy: {type: Schema.Types.ObjectId, ref: "UserModel", required: true}
}, {collection: "stories"});

export default StorySchema;