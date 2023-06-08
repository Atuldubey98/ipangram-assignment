import { NextFunction, Request, Response } from "express";
import Employee from "../models/employee/Employee";
import { getEmployeeQuery } from "../utils/employeesUtil";
import { PaginateOptions } from "mongoose";

export default class EmployeeController {
  /**
   * getProfilesOfEmployees
   */
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
          select: "email _id",
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
