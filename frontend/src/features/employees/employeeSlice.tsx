import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { EmployeeCompanyDetails } from "./EmployeeDetailsUpdateModal";
import {
  loadEmployeesData,
  updateEmployeeCompanyDetails,
  updateEmployeeData,
} from "./employeeAPI";
import { EmpQuery, Employee, EmployeesResponse } from "./interfaces";
type EmployeesState = {
  employeesLoadingStatus: "loading" | "idle" | "success" | "failure";
  employeesResponse: EmployeesResponse | null;
  updateEmployeesIds: string[];
  updateEmployeeCompanyDetailsLoading:
    | "loading"
    | "idle"
    | "success"
    | "failure";
};
const initialState: EmployeesState = {
  employeesLoadingStatus: "idle",
  employeesResponse: null,
  updateEmployeesIds: [],
  updateEmployeeCompanyDetailsLoading: "idle",
};
const employeeSlice = createSlice({
  initialState,
  name: "employees",
  reducers: {
    setEmployeesLoading: (state) => {
      state.employeesLoadingStatus = "loading";
    },
    setEmployeesSucces: (state, action: PayloadAction<EmployeesResponse>) => {
      state.employeesResponse = action.payload;
    },
    setAddToUpdateEmployees: (state, action: PayloadAction<string>) => {

      state.updateEmployeesIds = [action.payload, ...state.updateEmployeesIds];
    },
    setRemoveFromUpdateEmployees: (state, action: PayloadAction<string>) => {
      state.updateEmployeesIds = state.updateEmployeesIds.filter(
        (id) => id !== action.payload
      );
    },
    setAllEmployeesForUpdate: (state, action: PayloadAction<string[]>) => {
      state.updateEmployeesIds = action.payload;
    },
    setRemoveAllEmployeesForUpdate: (state) => {
      state.updateEmployeesIds = [];
    },
    setUpdateEmployeById: (state, action: PayloadAction<Employee>) => {
      if (state.employeesResponse) {
        state.employeesResponse.docs = state.employeesResponse.docs
          ? state.employeesResponse.docs.map((doc) =>
              doc._id === action.payload._id ? action.payload : doc
            )
          : null;
      }
    },
    setCompanyDetailsofEmployeesLoading: (state) => {
      state.updateEmployeeCompanyDetailsLoading = "loading";
    },
  },
});
export const {
  setEmployeesLoading,
  setEmployeesSucces,
  setUpdateEmployeById,
  setAllEmployeesForUpdate,
  setAddToUpdateEmployees,
  setCompanyDetailsofEmployeesLoading,
  setRemoveFromUpdateEmployees,
  setRemoveAllEmployeesForUpdate,
} = employeeSlice.actions;
export default employeeSlice.reducer;
export const loadEmployeesTableAction =
  (query: EmpQuery): AppThunk =>
  async (dispatch) => {
    try {
      setEmployeesLoading();
      const { data } = await loadEmployeesData(query);
      dispatch(setEmployeesSucces(data));
    } catch (error) {}
  };
export const updateEmployeeDataAction =
  (query: EmployeeCompanyDetails, employeeId: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await updateEmployeeData(query, employeeId);
      dispatch(setUpdateEmployeById(data));
    } catch (error) {}
  };

export const updateEmployeeCompanyDetailsAction =
  (empDetails: EmployeeCompanyDetails, employeeIds: string[]): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setCompanyDetailsofEmployeesLoading());
      await updateEmployeeCompanyDetails(empDetails, employeeIds);
      window.location.reload();
    } catch (error) {}
  };
