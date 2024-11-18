import { axiosInstance } from "@/_axios/instance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch conversation messages
export const fetchConversationMessages = createAsyncThunk(
    "conversation/fetchMessages",
    async (conversationId, { rejectWithValue }) => {
        try {
                const response = await axiosInstance.get(`conversations/fetchMessages/${conversationId}`);
                return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);


// new message is created directly from server
export const addNewMessage = createAsyncThunk(
    "addNewMessage",
    async (message, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post(`conversations/addNewMessage`, message);
            return response.data;
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message)
            } else {
                return rejectWithValue(error.message)
            }
        }
    }
);

const initialState = {
    activeConversationId: null,
    activeConversationMessages: [],
    status: 'idle',
    error: null,
};

const conversationSlice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setActiveConversation: (state, action) => {
            state.activeConversationId = action.payload;
            state.activeConversationMessages = [];
        },
        addNewMessages: (state, action) => {
            state.activeConversationMessages.push(action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchConversationMessages.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchConversationMessages.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.activeConversationMessages = action.payload;
            })
            .addCase(fetchConversationMessages.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export const { setActiveConversation, addNewMessages } = conversationSlice.actions;

export default conversationSlice.reducer;