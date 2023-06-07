import mongoose, { Document, Schema, model } from "mongoose";
import IProfile from "./IProfile";
import {
  allowedCategoryNames,
  allowedDepartmentNames,
  allowedGenders,
} from "../../utils/validation";
import paginate from "mongoose-paginate-v2";
const profileSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: true,
      enum: allowedGenders,
    },
    hobbies: {
      type: [String],
      default: [],
    },
    departmentName: {
      type: String,
      enum: allowedDepartmentNames,
      default: "NA",
    },
    categoryName: {
      type: String,
      enum: allowedCategoryNames,
      default: "NA",
    },
    location: {
      type: String,
      default: "NA",
    },
    salary: {
      type: Number,
      default: 0,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);
profileSchema.plugin(paginate);
profileSchema.virtual("name").get(function () {
  return [this.firstName, this.lastName].filter(Boolean).join(" ");
});
interface ProfileDocument extends Document, IProfile {}
const Profile = model<ProfileDocument, mongoose.PaginateModel<IProfile>>(
  "profile",
  profileSchema
);
export default Profile;
