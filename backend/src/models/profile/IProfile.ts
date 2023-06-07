export default interface IProfile {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "others";
  hobbies: string[];
}
