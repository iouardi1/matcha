import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ProfileUpdateData } from './profileUpdateSlice'

export interface profileState {
    loading: boolean
    error: any
    data: any
    id: number | null
}

const initialState: profileState = {
    loading: false,
    error: null,
    data: [],
    id: null,
}

export const profileFetch: any = createAsyncThunk(
    'profile/fetch',
    async (arg, { dispatch }) => {
        // dispatch(startLoading())
        const response = await axiosInstance.get('/profile')
        if (!response.data.shouldRedirect) {
            //   dispatch(stopLoading())
        }
        return response.data
    }
)

export const profileDetailsFetch: any = createAsyncThunk(
    'profileDetails/fetch',
    async (arg, { dispatch, getState }: any) => {
        const id = getState().profile.id
        // dispatch(startLoading())
        const response = await axiosInstance.get(`/profile/details?id=${id}`)
        // if (!response.data.shouldRedirect) {
        // dispatch(stopLoading())
        // }
        dispatch(ProfileUpdateData(response.data))
        return response.data
    }
)

export const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setId(state, action) {
            state.id = action.payload
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(profileFetch.pending, (state) => {
                state.error = null
            })
            .addCase(profileFetch.fulfilled, (state, action) => {
                state.data = action.payload.data
            })
            .addCase(profileFetch.rejected, (state, action) => {
                state.error = action.error.message
            })
            .addCase(profileDetailsFetch.pending, (state) => {
                state.error = null
            })
            .addCase(profileDetailsFetch.fulfilled, (state, action) => {
                if (state.data.id !== action.payload.data.id) {
                    state.data = action.payload.data
                }
            })
            .addCase(profileDetailsFetch.rejected, (state, action) => {
                state.error = action.error.message
            })
    },
})

export const { setId } = profileSlice.actions

export default profileSlice.reducer
