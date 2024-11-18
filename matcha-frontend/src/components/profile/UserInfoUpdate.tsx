import React, { useEffect, useRef, useState } from 'react'
import { IconTrash, IconArrowsExchange } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    FillUpdatedData,
    ProfileUpdateData,
    UpdateSave,
} from '@/redux/features/profileUpdateSlice'
import { populate } from '@/redux/features/profileSetupSlice'
import IntresetsModal from './IntresetsModal'
export default function UserInfoUpdate() {
    const dispatch = useDispatch()

    const user = useSelector((state: any) => state.profileUpdate.data)
    const [formData, setFormData] = useState(user)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const ref = useRef<any>()

    const availableInterests = useSelector(
        (state: any) => state.profileSetup.interests
    )

    const relationshipTypes = useSelector(
        (state: any) => state.profileSetup.relatioshipsList
    )

    const filteredInterests = availableInterests.filter(
        (interest: any) => !formData.interests.includes(interest)
    )

    const handleUpdate = (type: string, value?: any, index?: number) => {
        switch (type) {
            case 'input':
                setFormData({ ...formData, [value.name]: value.value })
                break
            case 'deleteInterest':
                const updatedInterests = formData.interests.filter(
                    (_: any, i: any) => i !== index
                )
                setFormData({ ...formData, interests: updatedInterests })
                break
            case 'addInterest':
                if (!formData.interests.includes(value)) {
                    setFormData({
                        ...formData,
                        interests: [...formData.interests, value],
                    })
                }
                setIsModalOpen(false)
                break
            case 'toggleGender':
                if (value === 'Man') {
                    setFormData({
                        ...formData,
                        gender: 'Woman',
                    })
                } else if (value === 'Woman') {
                    setFormData({
                        ...formData,
                        gender: 'Man',
                    })
                }
                break
            case 'relationship':
                setFormData({ ...formData, relation_type: value })
                break
            case 'password':
                setFormData({ ...formData, password: value.value })
                break
            case 'confirmPassword':
                setFormData({ ...formData, confirmPassword: value.value })
            default:
                break
        }
    }

    useEffect(() => {
        dispatch(populate())
        if (JSON.stringify(formData) !== JSON.stringify(user)) {
            dispatch(UpdateSave(false))
            dispatch(ProfileUpdateData({ data: formData }))
        }
        dispatch(FillUpdatedData(formData))
    }, [formData, user, dispatch])

    return (
        <>
            <label className="font-semibold">First Name :</label>
            <input
                name="firstname"
                placeholder={user.firstname}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => handleUpdate('input', e.target)}
            />
            <label className="font-semibold">Last Name :</label>
            <input
                name="lastname"
                placeholder={user.lastname}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => handleUpdate('input', e.target)}
            />
            <label className="font-semibold">Email :</label>
            <input
                name="email"
                placeholder={user.email}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => handleUpdate('input', e.target)}
            />
            <label className="font-semibold">Password :</label>
            <input
                type="password"
                name="password"
                placeholder="Enter new password"
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => handleUpdate('password', e.target)}
            />

            <label className="font-semibold">Username :</label>
            <input
                name="username"
                placeholder={user.username}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => handleUpdate('input', e.target)}
            />
            <label className="font-semibold">About Me :</label>
            <textarea
                name="aboutme"
                placeholder={user.aboutme}
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => {
                    handleUpdate('input', e.target)
                }}
            />
            <label className="font-semibold">Birthday :</label>
            <input
                type="date"
                name="birthday"
                value={
                    user.birthday
                        ? new Date(
                              new Date(user.birthday).getTime() + 60 * 60 * 1000
                          )
                              .toISOString()
                              .split('T')[0]
                        : ''
                }
                className="p-2 rounded-md bg-gray-800 border border-gray-500"
                onChange={(e) => handleUpdate('input', e.target)}
            />
            <label className="font-semibold">Gender :</label>
            <div className="flex items-center">
                <input
                    name="gender"
                    ref={ref}
                    value={formData.gender}
                    readOnly
                    className="p-2 rounded-md bg-gray-800 border border-gray-500 mr-2"
                />

                <IconArrowsExchange
                    onClick={() => {
                        handleUpdate('toggleGender', ref.current.value)
                    }}
                    className="ml-2 cursor-pointer hover:text-red-500"
                    size={20}
                />
            </div>
            <label className="font-semibold mt-4">Relationship Status :</label>
            <div className="flex flex-col">
                {relationshipTypes.map((type: any, index: any) => (
                    <label key={index} className="flex items-center mt-2">
                        <input
                            type="radio"
                            name="relationship"
                            value={type}
                            checked={formData.relation_type === type}
                            onChange={() => handleUpdate('relationship', type)}
                            className="mr-2"
                        />
                        {type}
                    </label>
                ))}
            </div>
            <label className="font-semibold">Intreset :</label>
            <div className="flex flex-wrap justify-center mt-2">
                {user.interests && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {user.interests.map((interest: any, index: any) => (
                            <button
                                key={index}
                                type="button"
                                className="inline-flex items-center justify-between border text-white rounded-full px-3 py-1 text-sm font-medium transition-colors duration-200 ease-in-out hover:bg-blue-700 focus:outline-none"
                            >
                                <span className="mr-2">{`#${interest}`}</span>
                                <IconTrash
                                    className="ml-2 cursor-pointer hover:text-red-500"
                                    onClick={() =>
                                        handleUpdate(
                                            'deleteInterest',
                                            undefined,
                                            index
                                        )
                                    }
                                    size={20}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
            <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => setIsModalOpen(true)}
            >
                Add Interests
            </button>
            <IntresetsModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                filteredInterests={filteredInterests}
                handleAddInterest={(interest: any) =>
                    handleUpdate('addInterest', interest)
                }
            />
        </>
    )
}
