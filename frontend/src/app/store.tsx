import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import registerReducer from "../features/register/registerSlice";
import loginReducer from "../features/login/loginSlice";
import profileReducer from "../features/employee/employeeSlice";
import employeesReducer from "../features/employees/employeeSlice";
import uiReducer from "../features/ui/uiSlice";
export const store = configureStore({
  reducer: {
    register: registerReducer,
    auth: loginReducer,
    profile: profileReducer,
    employees: employeesReducer,
    ui: uiReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
