export default interface IEmployee {
  firstName: string;
  lastName: string;
  gender: "male" | "female" | "others";
  hobbies: string[];
}
