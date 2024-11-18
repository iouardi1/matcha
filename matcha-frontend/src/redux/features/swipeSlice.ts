import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { startLoading, stopLoading } from './loadingSlice'

export interface swipeState {
    // error: any
    // data: []
    matchNotif: any
    lastSwipedId: any
}

const initialState: swipeState = {
    // loading: false,
    // error: null,
    // data: [],
    matchNotif: null,
    lastSwipedId: null,
}

export const swipeRight: any = createAsyncThunk(
    'swipe/right',
    async (arg, { dispatch }) => {
        const response = await axiosInstance.post(
            '/filterMatches/swipeRight',
            arg
        )
        return response.data
    }
)

export const swipeLeft: any = createAsyncThunk(
    'swipe/left',
    async (arg, { dispatch }) => {
        const response = await axiosInstance.post('/filterMatches/swipeLeft', arg)
        return response.data
    }
)
export const blockUser: any = createAsyncThunk(
    'block',
    async (arg, { dispatch }) => {
        const response = await axiosInstance.post('/filterMatches/blockUser', arg)
        return response.data
    }
)

export const swipeSlice = createSlice({
    name: 'swipe',
    initialState,
    reducers: {
        setLastSwipedId(state, action) {
            state.lastSwipedId = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(swipeRight.fulfilled, (state, action) => {
            if (action.payload.message === 'New match') {
                state.matchNotif = 'match'
            }
        })
    },
})

export const { setLastSwipedId } = swipeSlice.actions

export default swipeSlice.reducer
