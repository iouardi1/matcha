import { axiosInstance } from "@/_axios/instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface sendVerificationCodeState {
	loading: boolean;
	error: any;
	data: any;
}

const initialState: sendVerificationCodeState = {
	loading: false,
	error: null,
	data: null,
};

interface sendVerificationCodeData {
  email: string;
}

export const sendVerificationCodeUser = createAsyncThunk("sendVerificationCode", async (data: sendVerificationCodeData, { rejectWithValue }) => {
	try {
    const response = await axiosInstance.post("auth/sendVerificationCode", data);
    return response.data;
  } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
});

export const sendVerificationCodeSlice = createSlice({
	name: "sendVerificationCode",
	initialState,
	reducers: {
    
	},
	extraReducers: (builder) => {
    builder
      .addCase(sendVerificationCodeUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendVerificationCodeUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(sendVerificationCodeUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { } =
	sendVerificationCodeSlice.actions;

export default sendVerificationCodeSlice.reducer;
