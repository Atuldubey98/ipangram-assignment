import * as bcryptjs from "bcryptjs";
import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import Employee from "../models/employee/Employee";
import IRegisterUser from "../models/user/IRegisterUser";
import User from "../models/user/User";
declare module "express-session" {
  export interface SessionData {
    user: { [key: string]: any };
  }
}
export default class UserController {
  /**
   * async
   */
  public static async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { user, employee }: IRegisterUser = req.body;
      if (!user) {
        throw createHttpError(400, "USER_PAYLOAD_ERROR");
      }
      const { email, password } = user;
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        throw createHttpError(409, "USER_EMAIL_CONFLICT");
      }
      const passwordHash = await bcryptjs.hash(
        password,
        await bcryptjs.genSalt(10)
      );
      const newUser = new User({ email, password: passwordHash });
      await newUser.save();
      const newEmployee = new Employee({ userId: newUser.id, ...employee });
      await newEmployee.save();
      return res.status(201).send("USER_REGISTRATION_SUCCESS");
    } catch (error) {
      next(error);
    }
  }
  /**
   * login
   */
  public static async loginUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw createHttpError(400, "USER_EMAIL_ERROR");
      }
      const matches = await bcryptjs.compare(password, user.password);
      if (!matches) {
        throw createHttpError(404, "USER_PASSWORD_ERROR");
      }
      const sessionUser = { _id: user.id, email, role: user.role };
      req.session.user = sessionUser;
      return res.status(200).send(sessionUser);
    } catch (error) {
      next(error);
    }
  }
  public static async getCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    return res.status(200).send(req.session.user);
  }
  public static async logoutCurrentUser(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.session.destroy((err) => {
      if (err) {
        next(err);
      } else {
        return res.sendStatus(200);
      }
    });
  }
}
