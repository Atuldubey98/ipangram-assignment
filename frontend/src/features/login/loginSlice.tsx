import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../app/store";

import { AuthenticatedUser } from "./interfaces";
import { LoginUserType } from "./useLoginPage";
import { MessageType } from "../common/useUserToast";
import getFromAPICodes from "../../axios/apicodes";
import { isAxiosError } from "axios";
import { loadUserAPI, loginUserAPI, logoutAPI } from "./loginAPI";

type LoginState = {
  status: "success" | "loading" | "failed" | "idle";
  user: AuthenticatedUser | null;
};
const initialState: LoginState = {
  status: "idle",
  user: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
    },
    setFailed: (state) => {
      state.status = "failed";
    },
    setSuccess: (state, action: PayloadAction<AuthenticatedUser>) => {
      state.status = "success";
      state.user = action.payload;
    },
    setIdle: (state) => {
      state.status = "idle";
      state.user = null;
    },
  },
});
export const { setFailed, setLoading, setSuccess, setIdle } =
  loginSlice.actions;
export const loginUserAction =
  (
    loginUser: LoginUserType,
    navigateToProfile: () => void,
    showToast: (messageBody: MessageType) => void
  ): AppThunk =>
  async (dispatch) => {
    try {
      dispatch(setLoading());
      const { data } = await loginUserAPI(loginUser);
      dispatch(setSuccess(data));
      navigateToProfile();
    } catch (error) {
      showToast({
        type: "error",
        message: getFromAPICodes(
          isAxiosError(error) ? error.response?.data.message : "ERROR_OCCURED"
        ),
      });
      dispatch(setFailed());
    }
  };
export const loadUserAction = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await loadUserAPI();
    dispatch(setSuccess(data));
  } catch (error) {
    setIdle();
  }
};
export const logoutUserAction =
  (resetAllStates: VoidFunction): AppThunk =>
  async (dispatch) => {
    try {
      const response = await logoutAPI();
      if (response.status === 200) {
        dispatch(setIdle());
        resetAllStates();
      }
    } catch (error) {
      setIdle();
    }
  };

export default loginSlice.reducer;
