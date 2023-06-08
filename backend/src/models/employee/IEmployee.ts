export default interface IEmployee {
  firstName: string;
  lastName: string;
  user : string;
  gender: "male" | "female" | "others";
  hobbies: string[];
}
