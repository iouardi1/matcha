import { axiosInstance } from "@/_axios/instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface verifyCodeUserState {
	loading: boolean;
	error: any;
	data: any;
}

const initialState: verifyCodeUserState = {
	loading: false,
	error: null,
	data: null,
};

interface verifyCodeUserData {
  email: string;
  code: string;
  codeId: string;
}

export const verifyCodeUser = createAsyncThunk("verifyCodeUser", async (data: verifyCodeUserData, { rejectWithValue }) => {
	try {
    const response = await axiosInstance.post("auth/verifyCode", data);
    return response.data;
  } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
});


export const verifyCodeUserSlice = createSlice({
	name: "verifyCodeUser",
	initialState,
	reducers: {
    
	},
	extraReducers: (builder) => {
    builder
      .addCase(verifyCodeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyCodeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(verifyCodeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { } =
	verifyCodeUserSlice.actions;

export default verifyCodeUserSlice.reducer;
