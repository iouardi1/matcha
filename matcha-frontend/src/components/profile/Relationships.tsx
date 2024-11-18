import React from 'react'
import { Radio, RadioGroup } from '@headlessui/react'
import { IconCheck } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    changeGenderValue,
    changeRelationValue,
} from '@/redux/features/profileSetupSlice'
type ValuePiece = Date | null

type Value = ValuePiece | [ValuePiece, ValuePiece]
export default function Relationships() {
    const dispatch = useDispatch()
    const relation = useSelector((state: any) => state.profileSetup.relation)
    const relationshipsList = useSelector(
        (state: any) => state.profileSetup.relatioshipsList
    )

    return (
        <div className="flex flex-col items-center sm:mt-4 ">
            <div className="">
                <h1 className="text-[12px] sm:text-[15px] sm:font-semibold">Relation Type</h1>
            </div>
            <div className="flex flex-wrap  gap-2 ml-4">
                <RadioGroup
                    value={relation}
                    onChange={(e: string) => dispatch(changeRelationValue(e))}
                    className="w-full flex justify-start flex-wrap"
                >
                    {relationshipsList.map((item: string) => {
                        return (
                            <Radio
                                key={item}
                                value={item}
                                className={`group relative flex cursor-pointer rounded-full h-[15px] bg-white/5 py-[8px] px-[8px] sm:py-[15px] sm:px-[15px] text-white mx-3 border ${
                                    relation === item ? 'border-[#fd5564]' : ''
                                }`}
                                style={{ minWidth: '100px', maxWidth: '100%' }} // Constraint the radio size for small screens
                            >
                                <div className="flex w-full items-center justify-between">
                                    <div className="text-sm/6 w-full">
                                        <p className="font-semibold text-white text-[8px] sm:text-[12px] break-words">
                                            {item}
                                        </p>
                                    </div>
                                </div>
                            </Radio>
                        )
                    })}
                </RadioGroup>
            </div>
        </div>
    )
}

{
    /* <div className="px-4">
             <div className="mx-auto max-w-xl flex items-center">
                 <label className="inline-block text-[12px] sm:text-[15px] font-medium leading-6 text-white min-w-[100px]">
                     Relationship type
                 </label>
                 <RadioGroup
                     value={relation}
                     onChange={(e: string) => dispatch(changeRelationValue(e))}
                     className="w-full flex justify-start"
                 >
                     {relationshipsList.map((item: string) => {
                         return (
                             <Radio
                                 key={item}
                                 value={item}
                                 className={`group relative flex cursor-pointer rounded-full h-[10px]  bg-white/5 py-[12px] px-[12px] sm:py-[15px] sm:px-[15px] text-white  mx-3 border ${
                                   relation === item ? 'border-[#fd5564]' : ''
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
                                           relation === item
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
         </div> */
}
