import { configureStore } from '@reduxjs/toolkit'
import { enableMapSet } from 'immer'
import profileReducer from './features/profileSlice'
import profileSetupReducer from './features/profileSetupSlice'

enableMapSet()

import loginReducer from './features/loginSlice'
import loadingReducer from './features/loadingSlice'
import registerReducer from './features/registerSlice'
import sendVerificationCodeReducer from './features/sendVerificationCodeSlice'
import verifyCodeUserReducer from './features/verifyCodeUserSlice'
import resetPasswordUserReducer from './features/resetPasswordSlice'
import sideBarReducer from './features/sideBarSlice'
import layoutReducer from './features/layoutSlice'
import conversationReducer from './features/conversationSlice'
import socketReducer from './features/socketSlice'
import locationRedudcer from './features/locationSlice'
import swipeRedudcer from './features/swipeSlice'
import profileUpdateReducer from './features/profileUpdateSlice'


export const store = configureStore({
    reducer: {
        profileUpdate: profileUpdateReducer,
        profile: profileReducer,
        profileSetup: profileSetupReducer,
        login: loginReducer,
        register: registerReducer,
        sendVerificationCode: sendVerificationCodeReducer,
        verifyCodeUser: verifyCodeUserReducer,
        resetPassword: resetPasswordUserReducer,
        sideBar: sideBarReducer,
        layout: layoutReducer,
        conversation: conversationReducer,
        socket: socketReducer,
        loading: loadingReducer,
        location: locationRedudcer,
        swipe: swipeRedudcer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
