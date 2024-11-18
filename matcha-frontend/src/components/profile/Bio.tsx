import React, { useEffect } from 'react'
import { LabelInputContainer } from '../ui/labelInputContainer'
import { useDispatch, useSelector } from 'react-redux'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { changeBio } from '@/redux/features/profileSetupSlice'

export default function Bio() {
    const dispatch = useDispatch()
    const { values, errors, touched, handleChange, handleBlur }: any =
        useFormikContext()

    return (
        <div className="px-4 mt-2">
            <div className="mx-auto max-w-xl flex items-center">
                <label className="inline-block text-[12px] font-medium leading-6 text-white min-w-[100px]">
                    Bio
                </label>
                <Field
                    name="bio"
                    as="textarea"
                    maxLength="100"
                    className="auth-input w-[300px] h-[60px] max-w-[300px] max-h-[60px] sm:max-h-[80px] text-[5px]"
                    placeholder="Write your bio here..."
                    onChange={(e: any) => {
                        handleChange(e)
                        dispatch(changeBio(e.target.value))
                    }}
                />

                {touched.bio && errors.bio ? (
                    <div className="text-red-500 ml-1">{errors.bio}</div>
                ) : null}
            </div>
        </div>
    )
}
