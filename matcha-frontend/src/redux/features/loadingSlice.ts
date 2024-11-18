import { createSlice } from '@reduxjs/toolkit'

export interface loadingState {
    loading: boolean
}

const initialState: loadingState = {
    loading: true,
}

const loadingSlice = createSlice({
    name: 'loading',
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true
        },
        stopLoading(state) {
            state.loading = false
        },
    },
})

export const { startLoading, stopLoading } = loadingSlice.actions
export default loadingSlice.reducer
