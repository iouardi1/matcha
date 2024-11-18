import { axiosInstance } from '@/_axios/instance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface locationState {
	loading: boolean;
    location: string;
    error: any;
}

const initialState: locationState = {
	loading: false,
    location: '',
    error: null,
};

export const saveLocation = createAsyncThunk("saveLocation", async (location: any, { rejectWithValue }) => {
	try {
    const response = await axiosInstance.post("location", location );
    return response.data;
  } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
});
export const getLocation = createAsyncThunk("getLocation", async (location: any, { rejectWithValue }) => {
	try {
    const response = await axiosInstance.get("location");
    return response.data;
  } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message)
      } else {
        return rejectWithValue(error.message)
      }
    }
});

const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    setLocation: (state, action) => {
        state.location = action.payload;
    },
  },
  extraReducers:(builder) => {
    builder
    .addCase(getLocation.pending, (state) => {
        state.loading = true;
        state.location = '';
      })
      .addCase(getLocation.fulfilled, (state, action) => {
        state.loading = false;
        state.location = action.payload;
      })
      .addCase(getLocation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export const { setLocation} = locationSlice.actions;
export default locationSlice.reducer;