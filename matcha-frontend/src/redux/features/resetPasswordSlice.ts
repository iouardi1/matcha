import { axiosInstance } from "@/_axios/instance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface resetPasswordState {
	loading: boolean;
	error: any;
	data: any;
}

const initialState: resetPasswordState = {
	loading: false,
	error: null,
	data: null,
};

interface resetPasswordData {
  password: string;
  confirmPassword: string;
  codeId: string;
}

export const resetPasswordUser = createAsyncThunk("resetPassword", async (data: resetPasswordData, { rejectWithValue }) => {
	try {
    const response = await axiosInstance.post("auth/resetPassword", data);
    return response.data;
  } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
});

export const resetPasswordSlice = createSlice({
	name: "resetPassword",
	initialState,
	reducers: {
    
	},
	extraReducers: (builder) => {
    builder
      .addCase(resetPasswordUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPasswordUser.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(resetPasswordUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { } =
	resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
