import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { EmpQuery, EmployeesResponse } from "./interfaces";
import { AppThunk } from "../../app/store";
import { loadEmployeesData } from "./employeeAPI";
type EmployeesState = {
  employeesLoadingStatus: "loading" | "idle" | "success" | "failure";
  employeesResponse: EmployeesResponse | null;
  updateEmployeesIds: string[];
};
const initialState: EmployeesState = {
  employeesLoadingStatus: "idle",
  employeesResponse: null,
  updateEmployeesIds: [],
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
      console.log(action.payload);

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
  },
});
export const {
  setEmployeesLoading,
  setEmployeesSucces,
  setAllEmployeesForUpdate,
  setAddToUpdateEmployees,
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
