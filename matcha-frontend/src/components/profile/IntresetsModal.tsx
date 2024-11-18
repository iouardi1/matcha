import React from 'react'
import {
    Dialog,
    DialogBackdrop,
    DialogPanel,
    DialogTitle,
} from '@headlessui/react'
import { useDispatch } from 'react-redux'
import { changeErrorProps } from '@/redux/features/profileSetupSlice'
import { IconAlertTriangle } from '@tabler/icons-react'

export default function IntresetsModal({
    isModalOpen,
    setIsModalOpen,
    filteredInterests,
    handleAddInterest,
}: any) {
    return (
        <Dialog
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)} // Close the modal
            className="relative "
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-gray-500 bg-opacity-40 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
            />

            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded relative">
                    <button
                        className="absolute top-2 right-2"
                        onClick={() => setIsModalOpen(false)}
                    >
                        X
                    </button>
                    <h3 className="mb-4 font-bold text-lg">Select Interests</h3>
                    <div className="flex flex-wrap">
                        {filteredInterests.map((interest: any, index: any) => (
                            <button
                                key={index}
                                className="p-2 m-1 bg-gray-700 text-white rounded"
                                onClick={() => handleAddInterest(interest)}
                            >
                                {interest}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </Dialog>
    )
}
