import { Schema, model } from "mongoose";
import IUser from "./IUser";
import { allowedUserRoles } from "../../utils/validation";

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: allowedUserRoles,
      default: "employee",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = model<IUser>("user", userSchema);
export default User;
