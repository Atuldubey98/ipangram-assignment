import IProfile from "../profile/IProfile";
import IUser from "./IUser";

export default interface IRegisterUser {
  user: IUser;
  profile: IProfile;
}
