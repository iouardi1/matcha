import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeByAttr, findByAttr } from '@/utils/helpers/functions'
import { axiosInstance } from '@/_axios/instance'
import { startLoading, stopLoading } from './loadingSlice'

export interface profileSetupState {
    images: any[]
    imagesPlaceHolders: any[]
    bio: string
    interests: string[]
    selectedInterests: string[]
    error: {
        message: string
        exists: boolean
    }
    gender: string
    username: {
        initVal: any
        val: string
    }
    intrestedIn: string
    genderList: string[]
    relatioshipsList: string[]
    birthday: string
    loading: boolean
    relation: string
}

const initialState: profileSetupState = {
    images: [],
    bio: '',
    genderList: [],
    relatioshipsList: [],
    imagesPlaceHolders: [
        { id: 'placeholder-1' },
        { id: 'placeholder-2' },
        { id: 'placeholder-3' },
        { id: 'placeholder-4' },
        { id: 'placeholder-5' },
    ],
    interests: [],
    selectedInterests: [],
    error: {
        message: '',
        exists: false,
    },
    gender: '',
    relation: '',
    username: {
        initVal: null,
        val: '',
    },
    intrestedIn: '',
    birthday: '',
    loading: true,
}

function verifyData(data: any) {
    if (
        data.images.length < 1 ||
        data.selectedInterests < 3 ||
        data.gender === '' ||
        data.username === '' ||
        data.relation === ''
    )
        return false
    return true
}

export const profileInit: any = createAsyncThunk(
    'profile/init',
    async (arg, { dispatch }) => {
        dispatch(startLoading())
        const response = await axiosInstance.get('/profile/setup')
        if (!response.data.shouldRedirect) {
            dispatch(stopLoading())
        }
        return response.data
    }
)

export const profileSetup: any = createAsyncThunk(
    'profile/setup',
    async (arg, { getState }) => {
        const { profileSetup }: any = getState()

        if (verifyData(profileSetup)) {
            const response = await axiosInstance.post('/profile/setup', {
                images: profileSetup.images.map((item: any) => ({
                    path: item.path,
                })),
                bio: profileSetup.bio,
                interests: profileSetup.selectedInterests,
                gender: profileSetup.gender,
                intrestedIn: profileSetup.intrestedIn,
                username:
                    profileSetup.username.initVal === null
                        ? profileSetup.username.val
                        : profileSetup.username.initVal,
                birthday: profileSetup.birthday,
                relation: profileSetup.relation,
            })

            return response.data
        }
        return Promise.reject('insufficient data')
    }
)

export const uploadFile: any = createAsyncThunk(
    'files/uploadFile',
    async (file: any, { rejectWithValue }) => {
        try {
            const formData = new FormData()
            formData.append('file', file)

            const response = await axiosInstance.post('/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const deleteFile: any = createAsyncThunk(
    'files/deleteFile',
    async (filename: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete('/upload', {
                data: filename,
            })
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const populate: any = createAsyncThunk(
    'profile/populate',
    async (data: any, { rejectWithValue, dispatch }) => {
        try {
            const response = await axiosInstance.get('/profile/setupData')
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profileSetupSlice = createSlice({
    name: 'profileSetup',
    initialState,
    reducers: {
        addImage(state, action) {
            state.images.push(action.payload)
            state.imagesPlaceHolders.pop()
        },

        deleteImage(state, id: PayloadAction<number>) {
            removeByAttr(state.images, 'id', id.payload)
            state.imagesPlaceHolders.push({
                id: `placeholde-${state.imagesPlaceHolders.length + 1}`,
            })
        },

        profileImage(state, id: PayloadAction<number>) {
            let index = findByAttr(state.images, 'id', id.payload)
            state.images[index].isProfilePic = !state.images[index].isProfilePic
        },

        changeBio(state, bio: PayloadAction<string>) {
            state.bio = bio.payload
        },

        addSelectedInterest(state, interest: PayloadAction<any>) {
            if (!state.selectedInterests.includes(interest.payload)) {
                state.selectedInterests.push(interest.payload)
            }
        },

        deleteSelectedInterest(state, interest: PayloadAction<any>) {
            state.selectedInterests = state.selectedInterests.filter((i) => {
                return i !== interest.payload
            })
        },

        changeErrorProps(state) {
            state.error.exists = false
        },

        changeGenderValue(state, gender: PayloadAction<any>) {
            state.gender = gender.payload
            if (gender.payload === 'Man') state.intrestedIn = 'Woman'
            else state.intrestedIn = 'Man'
        },

        changeRelationValue(state, relation: PayloadAction<any>) {
            state.relation = relation.payload
        },

        setBirthday(state, birthday: PayloadAction<any>) {
            if (birthday.payload) {
                const dateObject: any = new Date(birthday.payload)
                if (!isNaN(dateObject)) {
                    const today = new Date()
                    const age = today.getFullYear() - dateObject.getFullYear()
                    const monthDiff = today.getMonth() - dateObject.getMonth()
                    const dayDiff = today.getDate() - dateObject.getDate()

                    if (
                        (age > 18 ||
                            (age === 18 &&
                                (monthDiff > 0 ||
                                    (monthDiff === 0 && dayDiff >= 0)))) &&
                        (age < 100 ||
                            (age === 100 &&
                                (monthDiff < 0 ||
                                    (monthDiff === 0 && dayDiff <= 0))))
                    ) {
                        state.birthday = birthday.payload
                    } else if (age < 18) {
                        state.error.exists = true
                        state.error.message =
                            'User must be at least 18 years old'
                        state.birthday = ''
                    } else {
                        state.error.exists = true
                        state.error.message =
                            'User must be younger than 100 years old'
                        state.birthday = ''
                    }
                } else {
                    state.error.exists = true
                    state.error.message = 'Invalid Date'
                    state.birthday = ''
                }
            }
        },

        setUsername(state, username: PayloadAction<any>) {
            if (!state.username.initVal) {
                state.username.val = username.payload
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadFile.pending, (state) => {})
            .addCase(uploadFile.fulfilled, (state, action) => {
                const i = state.images.length - 1
                state.images[i].path = action.payload
            })
            .addCase(uploadFile.rejected, (state, action) => {})
            .addCase(profileSetup.rejected, (state, action) => {
                state.error = { message: action.error.message, exists: true }
            })
            .addCase(profileInit.pending, (state, action) => {
                state.loading = true
            })
            .addCase(profileInit.fulfilled, (state, action) => {
                state.username.initVal = action.payload.username
                state.genderList = action.payload.genders
                state.interests = action.payload.interests
                state.relatioshipsList = action.payload.relationships
                state.loading = false
            })
            .addCase(populate.pending, (state, action) => {
                state.loading = true
            })
            .addCase(populate.fulfilled, (state, action) => {
                state.genderList = action.payload.genders
                state.interests = action.payload.interests
                state.relatioshipsList = action.payload.relationships
            })
    },
})

export const {
    addImage,
    deleteImage,
    profileImage,
    addSelectedInterest,
    deleteSelectedInterest,
    changeErrorProps,
    changeGenderValue,
    changeBio,
    changeRelationValue,
    setBirthday,
    setUsername,
} = profileSetupSlice.actions

export default profileSetupSlice.reducer
