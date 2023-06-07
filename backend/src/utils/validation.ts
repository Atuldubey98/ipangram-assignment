import { NextFunction, Request, Response } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (result.array().length) break;
    }

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};
export const allowedDepartmentNames = [
  "google",
  "ipangram",
  "facebook",
  "wipro",
  "wallmart",
  "NA",
];
export const allowedUserRoles = ["employee", "manager"];
export const allowedGenders = ["male", "female", "others"];
export const allowedCategoryNames = [
  "HR",
  "IT",
  "sales",
  "product",
  "marketting",
  "NA",
];
export const regiserValidation = [
  body("user.email").isEmail(),
  body("user.password").isStrongPassword({
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
  }),
  body("employee.firstName").isString(),
  body("employee.gender").isIn(allowedGenders),
];
export const loginValidation = [
  body("email").isEmail(),
  body("password").isString(),
];
