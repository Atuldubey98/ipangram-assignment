export interface Employee {
  _id: string;
  user: string;
  firstName: string;
  lastName: string;
  gender: string;
  hobbies?: string[] | null;
  departmentName: string;
  categoryName: string;
  location: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
}
