import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { PaginateOptions } from "mongoose";
import Employee from "../models/employee/Employee";
import User from "../models/user/User";
import { getEmployeeQuery } from "../utils/employeesUtil";

export default class EmployeeController {
  /**
   * getProfilesOfEmployees
   */

  public static async updateEmployeeData(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeId: string =
        typeof req.params.employeeId == "string" ? req.params.employeeId : "";
      const { role: roleBody, ...restDetail } = req.body;
      const role =
        ["manager", "employee"].indexOf(roleBody) !== -1
          ? roleBody
          : "employee";
      const updatedEmployee = await Employee.findByIdAndUpdate(
        employeeId,
        { ...restDetail },
        { new: true }
      );
      if (!updatedEmployee) {
        throw createHttpError(400, "EMPLOYEE_NOT_FOUND");
      }
      await User.updateOne(
        { _id: updatedEmployee.user },
        {
          role,
        },
        { new: true }
      ).select("_id email role");
      const employee = await Employee.findById(employeeId).populate(
        "user",
        "email _id role"
      );
      return res.status(201).send(employee);
    } catch (error) {
      next(error);
    }
  }
  public static async bulkUpdateEmployeeDetails(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const employeeIds = Array.isArray(req.body.employeeIds)
        ? req.body.employeeIds
        : [];
      if (employeeIds.some((e: unknown) => typeof e !== "string")) {
        throw createHttpError(400, "EMPLOYEES_PAYLOAD_ERROR");
      }
      let departmentName: string =
        typeof req.body.departmentName === "string"
          ? req.body.departmentName || "NA"
          : "NA";

      const categoryName =
        typeof req.body.categoryName === "string"
          ? req.body.categoryName || "NA"
          : "NA";
      const salary = typeof req.body.salary === "number" ? req.body.salary : 0;
      const location =
        typeof req.body.location === "string"
          ? req.body.location || "NA"
          : "NA";
      const updatedEmployees = await Employee.updateMany(
        { _id: { $in: employeeIds } },
        { departmentName, categoryName, salary, location },
        {
          new: true,
        }
      );
      return res.status(200).send(updatedEmployees);
    } catch (error) {
      next(error);
    }
  }
  public static async getProfilesOfEmployees(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { sort, page, limit, filter } = getEmployeeQuery(req);

      const options: PaginateOptions = {
        limit,
        page,
        sort,
        populate: {
          path: "user",
          select: "email _id role",
        },
      };
      const paginatedEmployees = await Employee.paginate(
        { ...filter },
        options
      );
      return res.status(200).send(paginatedEmployees);
    } catch (error) {
      next(error);
    }
  }
  public static async getCurrentLoggedInUserProfile(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const user = req.session.user ? req.session.user._id : "";
      const employee = await Employee.findOne({ user });
      return res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  }
}
