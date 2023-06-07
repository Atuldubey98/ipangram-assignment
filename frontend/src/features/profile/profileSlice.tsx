import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Profile } from "./interfaces";
import { AppThunk } from "../../app/store";
import { loadProfileAPI } from "./profileAPI";
type ProfileState = {
  profile: Profile | null;
  profileStatus: "loading" | "failure" | "idle" | "success";
};
const initialState: ProfileState = {
  profile: null,
  profileStatus: "idle",
};
const profileSlice = createSlice({
  name: "profile",
  reducers: {
    setProfileLoading: (state) => {
      state.profileStatus = "loading";
    },
    setProfileSuccess: (state, action: PayloadAction<Profile>) => {
      state.profileStatus = "success";
      state.profile = action.payload;
    },
    setProfileLoadingError: (state) => {
      state.profileStatus = "failure";
    },
  },
  initialState,
});
export const { setProfileLoading, setProfileSuccess, setProfileLoadingError } =
  profileSlice.actions;
export default profileSlice.reducer;
export const loadProfileAction = (): AppThunk => async (dispatch) => {
  try {
    dispatch(setProfileLoading());
    const { data } = await loadProfileAPI();
    dispatch(setProfileSuccess(data));
  } catch (error) {
    dispatch(setProfileLoadingError());
  }
};
