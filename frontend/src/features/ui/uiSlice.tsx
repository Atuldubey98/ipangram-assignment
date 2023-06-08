import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Employee } from "../employees/interfaces";

type UIStateType = {
  employeeDetailsModal: {
    isOpen: boolean;
    employee: Employee | null;
  };
  employeeCompanyDetails: {
    isOpen: boolean;
  };
};
const initialState: UIStateType = {
  employeeDetailsModal: {
    isOpen: false,
    employee: null,
  },
  employeeCompanyDetails: {
    isOpen: false,
  },
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setEmployeeDetailsModalOpen: (state, action: PayloadAction<Employee>) => {
      state.employeeDetailsModal.isOpen = true;
      state.employeeDetailsModal.employee = action.payload;
    },
    setEmployeeDetailsModalClose: (state) => {
      state.employeeDetailsModal.isOpen = false;
      state.employeeDetailsModal.employee = null;
    },
    setEmpCompanyDetailsModalOpen: (state) => {
      state.employeeCompanyDetails.isOpen = true;
    },
    setEmpCompanyDetailsModalClose: (state) => {
      state.employeeCompanyDetails.isOpen = false;
    },
  },
});
export const {
  setEmployeeDetailsModalClose,
  setEmployeeDetailsModalOpen,
  setEmpCompanyDetailsModalClose,
  setEmpCompanyDetailsModalOpen,
} = uiSlice.actions;
export default uiSlice.reducer;
