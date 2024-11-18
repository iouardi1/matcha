import { setBirthday } from '@/redux/features/profileSetupSlice'
import { relative } from 'path'
import React from 'react'
import { BirthdayPicker } from 'react-birthday-picker'
import { useDispatch } from 'react-redux'

export default function Birthday() {
    const dispatch = useDispatch()
    return (
        <div className="px-4">
            <div className="mx-auto max-w-xl flex items-center">
                <label className="inline-block text-[12px] sm:text-[15px] font-medium leading-6 text-white min-w-[100px]">
                    Birthday
                </label>
                <div className="w-full flex justify-start py-[6px] px-[6px] h-[40px]">
                    <BirthdayPicker
												inputStyle={{
													height:"28px",
													border:" 1px solid #fd5564",
													backgroundColor:"transparent",
													color:"white"
												}}
                        onChange={(e) => {
                            dispatch(setBirthday(e))
                        }}
                        placeHolders={['DD', 'MM', 'YYYY']}
                        style={{
                            width: '200px',
                            maxHeight: '30px',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}
