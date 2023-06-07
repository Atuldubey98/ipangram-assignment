import mongoose, { Document, Schema, model } from "mongoose";
import IEmployee from "./IEmployee";
import {
  allowedCategoryNames,
  allowedDepartmentNames,
  allowedGenders,
} from "../../utils/validation";
import paginate from "mongoose-paginate-v2";
const employeeSchema = new Schema(
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
employeeSchema.plugin(paginate);
employeeSchema.virtual("name").get(function () {
  return [this.firstName, this.lastName].filter(Boolean).join(" ");
});
interface employeeDocument extends Document, IEmployee {}
const Employee = model<employeeDocument, mongoose.PaginateModel<IEmployee>>(
  "employee",
  employeeSchema
);
export default Employee;
