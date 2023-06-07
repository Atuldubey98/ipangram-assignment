import { NextFunction, Request, Response } from "express";
import { allowedUserRoles } from "../utils/validation";
import createHttpError from "http-errors";

export default function isAuthorized(role: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.session.user ? req.session.user.role : "";
    if (allowedUserRoles.indexOf(role) !== -1 && role === userRole) {
      console.log(userRole);
      next();
    } else {
      next(createHttpError(403, "UNAUTHORIZED"));
    }
  };
}
