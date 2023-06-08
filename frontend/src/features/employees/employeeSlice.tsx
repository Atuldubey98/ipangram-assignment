import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import { EmployeeCompanyDetails } from "./EmployeeDetailsUpdateModal";
import {
  loadEmployeesData,
  updateEmployeeCompanyDetails,
  updateEmployeeData,
} from "./employeeAPI";
import { EmpQuery, Employee, EmployeesResponse } from "./interfaces";
import { MessageType } from "../common/useUserToast";
type EmployeesState = {
  employeesLoadingStatus: "loading" | "idle" | "success" | "failure";
  employeesResponse: EmployeesResponse | null;
  updateEmployeesIds: string[];
  updateEmployeeCompanyDetailsLoading:
    | "loading"
    | "idle"
    | "success"
    | "failure";
  udpateEmployeeDetailsStatus: "loading" | "idle" | "success" | "failure";
};
const initialState: EmployeesState = {
  employeesLoadingStatus: "idle",
  employeesResponse: null,
  updateEmployeesIds: [],
  udpateEmployeeDetailsStatus: "idle",
  updateEmployeeCompanyDetailsLoading: "idle",
};
const employeeSlice = createSlice({
  initialState,
  name: "employees",
  reducers: {
    setUpdateEmployeeDetailLoading: (state) => {
      state.udpateEmployeeDetailsStatus = "loading";
    },
    setUpdateEmployeeDetailError: (state) => {
      state.udpateEmployeeDetailsStatus = "failure";
    },
    setEmployeesLoading: (state) => {
      state.employeesLoadingStatus = "loading";
      console.log("Loading");
    },
    setEmployeesSucces: (state, action: PayloadAction<EmployeesResponse>) => {
      state.employeesResponse = action.payload;
      state.employeesLoadingStatus = "success";
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
        state.udpateEmployeeDetailsStatus = "success";
      }
    },
    setCompanyDetailsofEmployeesLoading: (state) => {
      state.updateEmployeeCompanyDetailsLoading = "loading";
    },
    setCompanyEmployeeStateDefault: (state) => {
      state.employeesLoadingStatus = "idle";
      state.employeesResponse = null;
      state.updateEmployeesIds = [];
    },
  },
});
export const {
  setEmployeesLoading,
  setEmployeesSucces,
  setCompanyEmployeeStateDefault,
  setUpdateEmployeById,
  setAllEmployeesForUpdate,
  setUpdateEmployeeDetailError,
  setUpdateEmployeeDetailLoading,
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
      dispatch(setEmployeesLoading());
      const { data } = await loadEmployeesData(query);
      dispatch(setEmployeesSucces(data));
    } catch (error) {}
  };
export const updateEmployeeDataAction =
  (
    query: EmployeeCompanyDetails,
    employeeId: string,
    onCloseEmployeeModal: VoidFunction,
    showToast: (props: MessageType) => void
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setUpdateEmployeeDetailLoading());
      const { data } = await updateEmployeeData(query, employeeId);
      dispatch(setUpdateEmployeById(data));
      showToast({ type: "success", message: "User record updated" });
      onCloseEmployeeModal();
    } catch (error) {
      dispatch(setUpdateEmployeeDetailError());
      showToast({ type: "success", message: "Some error has occured" });
    }
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
