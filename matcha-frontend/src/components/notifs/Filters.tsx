import {
    getListOfPotentialMatches,
    updateFilter,
} from '@/redux/features/sideBarSlice'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Filters({ setShow }: any) {
    const dispatch = useDispatch()
    const initFilters = useSelector((state: any) => state.sideBar.filter)
    const [ageGap, setAgeGap] = useState({ min: 18, max: 100 })
    const [distance, setDistance] = useState(1)
    const [fameRate, setFameRate] = useState(10)

    const handleAgeGapChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'min' | 'max'
    ) => {
        const value = parseInt(e.target.value, 10)
        setAgeGap((prev) => ({
            ...prev,
            [type]:
                type === 'min'
                    ? Math.min(value, prev.max)
                    : Math.max(value, prev.min),
        }))
        dispatch(updateFilter({ attribute: `${type}AgeGap`, value: value }))
    }

    return (
        <>
            <div className="w-full space-y-6">
                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700">
                        Age Gap
                    </label>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{ageGap.min} years</span>
                        <span>{ageGap.max} years</span>
                    </div>
                    <div className="relative flex items-center">
                        <input
                            type="range"
                            min="18"
                            max="100"
                            step="1"
                            value={ageGap.min}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FE3C72]"
                            onChange={(e) => handleAgeGapChange(e, 'min')}
                        />
                        <input
                            type="range"
                            min="18"
                            max="100"
                            step="1"
                            value={ageGap.max}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FE3C72]"
                            onChange={(e) => handleAgeGapChange(e, 'max')}
                        />
                    </div>
                </div>

                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700">
                        Distance
                    </label>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{distance} km</span>
                    </div>
                    <input
                        type="range"
                        min="1"
                        max="1000"
                        step="1 "
                        value={distance}
                        className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#FF7854]"
                        onChange={(e) => {
                            setDistance(parseInt(e.target.value, 10))
                            dispatch(
                                updateFilter({
                                    attribute: `distance`,
                                    value: parseInt(e.target.value, 10),
                                })
                            )
                        }}
                    />
                </div>

                <div className="w-full">
                    <label className="text-sm font-semibold text-gray-700">
                        Famerate
                    </label>
                    <div className="flex justify-between text-xs text-gray-500">
                        <span>{fameRate} FR</span>
                    </div>
                    <input
                        type="range"
                        min="0"
                        max="20"
                        step="1"
                        value={fameRate}
                        className="w-full mt-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[#007AFF]"
                        onChange={(e) => {
                            setFameRate(parseInt(e.target.value, 10))
                            dispatch(
                                updateFilter({
                                    attribute: `fameRate`,
                                    value: parseInt(e.target.value, 10),
                                })
                            )
                        }}
                    />
                </div>

                <div
                    onClick={() => {
                        if (
                            !initFilters.minAgeGap &&
                            !initFilters.maxAgeGap &&
                            !initFilters.distance &&
                            !initFilters.fameRate
                        ) {
                            dispatch(
                                updateFilter({
                                    attribute: `fameRate`,
                                    value: 10,
                                })
                            )
                            dispatch(
                                updateFilter({
                                    attribute: `distance`,
                                    value: 1,
                                })
                            )
                            dispatch(
                                updateFilter({
                                    attribute: `minAgeGap`,
                                    value: 18,
                                })
                            )
                            dispatch(
                                updateFilter({
                                    attribute: `maxAgeGap`,
                                    value: 100,
                                })
                            )
                        }
                        dispatch(getListOfPotentialMatches())
                        setShow(false)
                    }}
                    className="w-full py-2 mt-4 bg-[#FE3C72] hover:bg-[#FF7854] text-white font-semibold rounded-lg transition duration-200"
                >
                    Apply
                </div>
            </div>
        </>
    )
}
