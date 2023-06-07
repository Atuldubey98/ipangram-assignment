import { NextFunction, Request, Response } from "express";
import Employee from "../models/employee/Employee";

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
      const filter =
        typeof req.query.filter !== "object" ? {} : req.query.filter;
      const page =
        typeof req.query.page === "string" && !isNaN(Number(req.query.page))
          ? Number(req.query.page)
          : 1;
      const limit =
        typeof req.query.limit === "string" && !isNaN(Number(req.query.limit))
          ? Number(req.query.limit)
          : 5;
      const sort = typeof req.query.sort !== "object" ? {} : req.query.sort;
      const options = {
        limit,
        page,
        sort,
        populate: {
          path: "userId",
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
      const userId = req.session.user ? req.session.user._id : "";
      const employee = await Employee.findOne({ userId });
      return res.status(200).send(employee);
    } catch (error) {
      next(error);
    }
  }
}
