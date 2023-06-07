import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "./interfaces";
import { AppThunk } from "../../app/store";
import { loadEmployeeAPI } from "./employeeAPI";
type EmployeeState = {
  employee: Employee | null;
  employeeStatus: "loading" | "failure" | "idle" | "success";
};
const initialState: EmployeeState = {
  employee: null,
  employeeStatus: "idle",
};
const employeeSlice = createSlice({
  name: "employee",
  reducers: {
    setEmployeeLoading: (state) => {
      state.employeeStatus = "loading";
    },
    setEmployeeSuccess: (state, action: PayloadAction<Employee>) => {
      state.employeeStatus = "success";
      state.employee = action.payload;
    },
    setEmployeeLoadingError: (state) => {
      state.employeeStatus = "failure";
    },
  },
  initialState,
});
export const {
  setEmployeeLoading,
  setEmployeeSuccess,
  setEmployeeLoadingError,
} = employeeSlice.actions;
export default employeeSlice.reducer;
export const loadEmployeeAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setEmployeeLoading());
    const { data } = await loadEmployeeAPI();
    dispatch(setEmployeeSuccess(data));
  } catch (error) {
    dispatch(setEmployeeLoadingError());
  }
};
