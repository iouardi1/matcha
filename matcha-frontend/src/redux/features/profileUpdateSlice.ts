import { axiosInstance } from '@/_axios/instance'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { removeByAttr, findByAttr, generateId } from '@/utils/helpers/functions'
import path from 'path'

export interface profileState {
    loading: boolean
    error: any
    data: any
    updatedData: any
    disable: any
    imagesPlaceHolders: any[]
    images: any[]
}

const initialState: profileState = {
    loading: false,
    error: null,
    data: null,
    updatedData: null,
    disable: true,
    imagesPlaceHolders: [],
    images: [],
}

function verifyData(data: any, images: any) {
    console.log(data, images)
    if (
        images.length < 1 ||
        data.firstname === '' ||
        data.lastname === '' ||
        data.email === '' ||
        data.aboutme === '' ||
        data.username === '' ||
        data.gender === '' ||
        data.interests.length < 3 ||
        data.relation_type === '' ||
        (data.password && data.password.length < 8)
    )
        return false
    return true
}

export const profileUpdate: any = createAsyncThunk(
    'profile/update',
    async (arg, { dispatch, getState }: any) => {
        const data = getState().profileUpdate.updatedData
        const images = getState().profileUpdate.images.map((image: any) => ({
            src: path.basename(image.src),
        }))

        if (verifyData(data, images)) {
            const response = await axiosInstance.put('/profile/updateProfile', {
                data,
                images,
            })
            return response.data
        }
        return Promise.reject('insufficient data')
    }
)

export const uploadEditFile: any = createAsyncThunk(
    'files/uploadEditFile',
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

export const deleteEditFile: any = createAsyncThunk(
    'files/deleteEditFile',
    async (filename: any, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(
                `/upload/deleteByFile?filepath=${filename}`
            )
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const profileUpdateSlice = createSlice({
    name: 'profileUpdate',
    initialState,
    reducers: {
        ProfileUpdateData(state, action) {
            state.data = action.payload.data
        },
        UpdateSave(state, action) {
            state.disable = action.payload
        },
        FillUpdatedData(state, action) {
            state.updatedData = action.payload
        },
        FillEditImages(state, action) {
            if (!state.images.length) {
                for (let index = 0; index < action.payload.length; index++) {
                    state.images.push({
                        id: generateId(),
                        src: action.payload[index],
                    })
                    // state.images = action.payload
                    // console.log({
                    //     id: generateId(),
                    //     src: action.payload[index],
                    // })
                }
                for (
                    let index = 0;
                    index < 5 - action.payload.length;
                    index++
                ) {
                    state.imagesPlaceHolders.push({
                        id: `placeholder-${index + 1}`,
                    })
                }
            }
        },
        addEditImage(state, action) {
            state.images.push(action.payload)
            state.imagesPlaceHolders.pop()
        },
        deleteEditImage(state, id: PayloadAction<number>) {
            removeByAttr(state.images, 'id', id.payload)
            state.imagesPlaceHolders.push({
                id: `placeholde-${state.imagesPlaceHolders.length + 1}`,
            })
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadEditFile.pending, (state) => {})
            .addCase(uploadEditFile.fulfilled, (state, action) => {
                const i = state.images.length - 1
                state.images[i].src = action.payload.url
                state.disable = false
            })
            .addCase(uploadEditFile.rejected, (state, action) => {})
            .addCase(deleteEditFile.fulfilled, (state, action) => {
                state.disable = false
            })
            .addCase(profileUpdate.fulfilled, (state, action) => {
                state.error = action.payload.message
            })
    },
})

export const {
    ProfileUpdateData,
    UpdateSave,
    FillUpdatedData,
    FillEditImages,
    addEditImage,
    deleteEditImage,
} = profileUpdateSlice.actions

export default profileUpdateSlice.reducer
