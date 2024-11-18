import React from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { IconCheck } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import { changeGenderValue } from '@/redux/features/profileSetupSlice'

export default function Gender() {
    const dispatch = useDispatch()
    const gender = useSelector((state: any) => state.profileSetup.gender)
    const genderList = useSelector(
        (state: any) => state.profileSetup.genderList
    )

    return (
        <div className="px-4">
            <div className="mx-auto max-w-xl flex items-center">
                <label className="inline-block text-[12px] sm:text-[15px] font-medium leading-6 text-white min-w-[100px]">
                    Gender
                </label>
                <RadioGroup
                    value={gender}
                    onChange={(e: string) => dispatch(changeGenderValue(e))}
                    className="w-full flex justify-start"
                >
                    {genderList.map((item: string) => {
                        return (
                            <Radio
                                key={item}
                                value={item}
                                className={`group relative flex cursor-pointer rounded-full h-[10px]  bg-white/5 py-[12px] px-[12px] sm:py-[15px] sm:px-[15px] text-white  mx-3 border ${
                                    gender === item ? 'border-[#fd5564]' : ''
                                }`}
                            >
                                <div className="flex w-full items-center justify-between">
                                    <div className="text-sm/6">
                                        <p className="font-semibold text-white text-[10px] sm:text-[15px]">
                                            {item}
                                        </p>    
                                    </div>
                                    <IconCheck
                                        className={
                                            gender === item
                                                ? 'visible'
                                                : 'hidden'
                                        }
                                    />
                                </div>
                            </Radio>
                        )
                    })}
                </RadioGroup>
            </div>
        </div>
    )
}
