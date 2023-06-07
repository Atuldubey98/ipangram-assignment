import IEmployee from "../employee/IEmployee";
import IUser from "./IUser";

export default interface IRegisterUser {
  user: IUser;
  employee: IEmployee;
}
