import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import profilePath from '@/utils/pictures/person.jpg'
import { axiosInstance } from '@/_axios/instance'
import { startLoading, stopLoading } from './loadingSlice'

interface Match {
    id: number
    email: string
    username: string
    profile_picture: any
}

interface PotentialMatch {
    id: number
    username: string
    age: string
    location: string
    distance: string
    gender: string
    profile_picture: any
}

interface Profile {
    id: number
    username: string
    profile_picture: any
    number_of_likes: number
}

interface Conversation {
    id: number
    conv_id: number
    match_id: number
    username: string
    photo: string
    last_message: string
    matchingdate: string
    interested_in_relation: string
    age: string
    distance: string
}

interface Notification {
    sender_id: number
    sender_photo: string
    type: string
}

interface SideBarState {
    tab: 'matches' | 'messages' | 'details'
    matches: Match[]
    notifications: Notification[]
    potentialMatch: PotentialMatch[]
    likes: number
    conversations: Conversation[]
    profile: Profile | null
    activeConversationId: null
    loading: boolean
    error: any
    isSidebarVisible: boolean
    filter: any
}

const initialState: SideBarState = {
    tab: 'matches',
    matches: [],
    notifications: [],
    potentialMatch: [],
    likes: 30,
    conversations: [],
    profile: null,
    activeConversationId: null,
    loading: false,
    error: null,
    isSidebarVisible: false,
    filter: {
        minAgeGap: null,
        maxAgeGap: null,
        distance: null,
        fameRate: null,
        limit: 10,
        offset: 0,
    },
}

export const initiateNewDM: any = createAsyncThunk(
    'initiateNewDM',
    async (participants, { rejectWithValue, dispatch }) => {
        try {
            dispatch(startLoading())
            const response = await axiosInstance.post(
                `conversations/initiateNewDM`,
                participants
            )
            dispatch(stopLoading())
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.participants) {
                return rejectWithValue(error.response.data.participants)
            } else {
                return rejectWithValue(error.participants)
            }
        }
    }
)

export const getConversations: any = createAsyncThunk(
    'getConversations',
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(
                `conversations/getAllConversations`
            )
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const getTest: any = createAsyncThunk(
    'getProfileTest',
    async (arg, { dispatch }) => {
        dispatch(startLoading())
        const response = await axiosInstance.get(`/conversations`)
        if (!response.data.shouldRedirect) {
            dispatch(stopLoading())
        }
        return response.data
    }
)

export const getProfile: any = createAsyncThunk(
    'getProfileInfos',
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(`profile/getProfileInfos`)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data) {
                return rejectWithValue(error.response.data)
            } else {
                return rejectWithValue(error)
            }
        }
    }
)

export const getListOfMatches: any = createAsyncThunk(
    'getListOfMatches',
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(`profile/getListOfMatches`)
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
)

export const getListOfNotifications: any = createAsyncThunk(
    'getListOfNotifications',
    async (user_id, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.get(
                `profile/getListOfNotifications`
            )
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
)

export const createNotification: any = createAsyncThunk(
    'createNotification',
    async (notifData, { rejectWithValue }: any) => {
        try {
            const response = await axiosInstance.post(
                `profile/createNotification`,
                notifData
            )
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
)
export const getListOfPotentialMatches: any = createAsyncThunk(
    'getListOfPotentialMatches',
    async (user_id, { rejectWithValue, getState, dispatch }: any) => {
        const state = getState().sideBar.filter
        const params: any = {
            ...(state.distance && { location: state.distance }),
            ...(state.minAgeGap !== null &&
                state.maxAgeGap !== null && {
                    ageGap: `${state.minAgeGap}-${state.maxAgeGap}`,
                }),
            ...(state.fameRate !== null && { fameRate: state.fameRate }),
            limit: state.limit,
            offset: state.offset, 
        }

        try {
            const response = await axiosInstance.get(`filterMatches`, {
                params,
            })
            return response.data
        } catch (error: any) {
            if (error.response && error.response.data.user_id) {
                return rejectWithValue(error.response.data.user_id)
            } else {
                return rejectWithValue(error.user_id)
            }
        }
    }
)

const sideBarSlice = createSlice({
    name: 'sideBar',
    initialState,
    reducers: {
        setTab(
            state,
            action: PayloadAction<'matches' | 'messages' | 'details'>
        ) {
            state.tab = action.payload
        },
        setActiveConversation(state, action) {
            state.activeConversationId = action.payload
        },
        updateLastMessage: (state, action) => {
            const { conversationId, message_text } = action.payload
            const conversation = state.conversations.find(
                (conv) => conv.id === conversationId
            )
            if (conversation) {
                conversation.last_message = message_text
            }
        },
        addNotif: (state, action) => {
            state.notifications.unshift(action.payload)
        },
        toggleSidebar: (state) => {
            state.isSidebarVisible = !state.isSidebarVisible
        },
        updateFilter(
            state,
            action: PayloadAction<{ attribute: keyof SideBarState; value: any }>
        ) {
            const { attribute, value } = action.payload
            state.filter[attribute] = value
        },
        updateOffset: (state, action) => {
            state.filter.offset += action.payload;
          },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getConversations.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getConversations.fulfilled, (state, action) => {
                state.loading = false
                state.conversations = action.payload.data
            })
            .addCase(getConversations.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getProfile.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload.data
            })
            .addCase(getProfile.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getListOfMatches.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getListOfMatches.fulfilled, (state, action) => {
                state.loading = false
                if (JSON.stringify(state.matches) !== JSON.stringify(action.payload.data)) {
                    state.matches = action.payload.data
                }
            })
            .addCase(getListOfMatches.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(getListOfNotifications.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getListOfNotifications.fulfilled, (state, action) => {
                state.loading = false
                state.notifications = action.payload.data
            })
            .addCase(getListOfPotentialMatches.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getListOfPotentialMatches.fulfilled, (state, action) => {
                state.loading = false
                if (JSON.stringify(state.potentialMatch) !== JSON.stringify(action.payload.matches)) {
                    state.potentialMatch = action.payload.matches
                }
            })
            .addCase(getListOfPotentialMatches.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
            .addCase(initiateNewDM.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(initiateNewDM.fulfilled, (state, action) => {
                state.loading = false
                state.activeConversationId = action.payload.data.id
            })
            .addCase(initiateNewDM.rejected, (state, action) => {
                state.loading = false
                state.error = action.error.message
            })
    },
})

export const {
    setTab,
    setActiveConversation,
    updateLastMessage,
    addNotif,
    toggleSidebar,
    updateFilter,
    updateOffset,
} = sideBarSlice.actions
export default sideBarSlice.reducer
