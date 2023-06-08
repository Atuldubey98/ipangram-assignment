export interface EmployeesResponse {
  docs?: Employee[] | null;
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage?: null;
  nextPage: number;
}
export interface Employee {
  _id: string;
  user: EmployeeUser;
  firstName: string;
  lastName: string;
  gender: string;
  hobbies?: null[] | null;
  departmentName: string;
  categoryName: string;
  location: string;
  salary: number;
  createdAt: string;
  updatedAt: string;
}
export interface EmployeeUser {
  _id: string;
  email: string;
  role: "manager" | "employee";
}
export interface EmployeeFilter {
  departmentName: string;
  categoryName: string;
  location: string;
  firstName: string;
  lastName: string;
  gender: string;
}
export interface EmployeeSort {
  salary: "asc" | "desc" | "";
  categoryName: "asc" | "desc" | "";
  departmentName: "asc" | "desc" | "";
  firstName: "asc" | "desc" | "";
  lastName: "asc" | "desc" | "";
  location: "asc" | "desc" | "";
}
export interface EmployeeQuery {
  filter: EmployeeFilter;
  sort: EmployeeSort;
  page: number;
  limit: number;
}
export interface EmpQuery {
  filter: { [key: string]: string };
  sort: { [key: string]: string };
  page: number;
  limit: number;
}
