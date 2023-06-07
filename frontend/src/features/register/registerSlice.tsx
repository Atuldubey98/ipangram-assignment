import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";
import getFromAPICodes from "../../axios/apicodes";
import { registerUserAPI } from "./registerAPI";
import { RegisterUserType } from "./useRegisterPage";
import { MessageType } from "../common/useUserToast";
import { isAxiosError } from "axios";
export type RegisterStateType = {
  registerStatus: "loading" | "failure" | "idle" | "success";
  registerMessage: { isError: boolean; message: string };
};
const initialState: RegisterStateType = {
  registerStatus: "idle",
  registerMessage: {
    isError: false,
    message: "",
  },
};
const registeSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    setRegisterLoading: (state) => {
      state.registerStatus = "loading";
    },
    setRegisterFailure: (state) => {
      state.registerStatus = "failure";
    },
    setRegisterIdle: (state) => {
      state.registerStatus = "idle";
    },
    setRegisterSuccess: (state, action: PayloadAction<string>) => {
      state.registerStatus = "success";
      state.registerMessage = {
        isError: false,
        message: action.payload,
      };
    },
  },
});

export const {
  setRegisterLoading,
  setRegisterIdle,
  setRegisterSuccess,
  setRegisterFailure,
} = registeSlice.actions;
export default registeSlice.reducer;

export const registerUserAction =
  (
    registerUser: RegisterUserType,
    showToast: (messageType: MessageType) => void
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setRegisterLoading());
      const response = await registerUserAPI(registerUser);
      dispatch(setRegisterSuccess(getFromAPICodes(response.data)));
      showToast({ type: "success", message: getFromAPICodes(response.data) });
    } catch (error) {
      setRegisterFailure();
      showToast({
        type: "error",
        message: getFromAPICodes(
          isAxiosError(error) ? error.response?.data.message : "ERROR_OCCURED"
        ),
      });
    }
  };
