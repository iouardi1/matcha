
import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export interface loginState {
    loading: boolean
    error: any
    data: []
}

const initialState: loginState = {
    loading: false,
    error: null,
    data: [],
}

interface LoginData {
    email: string
    password: string
}

export const loginFetch = createAsyncThunk(
    'login',
    async (data: LoginData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('auth/login', data)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const logoutFetch = createAsyncThunk(
    'logout',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/logout')
            if (response.status == 200) {
            }
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loginFetch.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginFetch.fulfilled, (state, action) => {
                state.loading = false
                state.data = action.payload
            })
            .addCase(loginFetch.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            });
    },
})

export const {} = loginSlice.actions

export default loginSlice.reducer
