'use client'
import Image from "next/image"
import menuIcon from "@/utils/pictures/icons-menu.png"
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileDetailsFetch } from '../../redux/features/profileSlice'
import UserInfo from '@/components/profile/UserInfo'
import UserImageSlider from '@/components/profile/UserImageSlider'
import UserInfoUpdate from '@/components/profile/UserInfoUpdate'
import CurrentUserInfo from '@/components/profile/CurrentUserInfo'
import { profileUpdate } from '@/redux/features/profileUpdateSlice'
import ImageUploadEdit from '@/components/profile/ImageUploadEdit'
import toast, { Toaster } from 'react-hot-toast'
import { Button } from '@headlessui/react'
import { IconHeartFilled, IconUserCancel, IconX } from '@tabler/icons-react'
import { blockUser, setLastSwipedId, swipeLeft, swipeRight } from '@/redux/features/swipeSlice'
import { createNotification, getListOfNotifications, setTab, toggleSidebar } from '@/redux/features/sideBarSlice'
import { useSocket } from '@/redux/context/SocketContext'

export default function Profile() {
    const dispatch = useDispatch()
    const socket = useSocket()
    const user = useSelector((state: any) => state.profile.data)
    const images = useSelector((state: any) => state.profile.data.photos)
    const currentId = useSelector((state: any) => state.sideBar.profile.id)
    const id = useSelector((state: any) => state.profile.id)
    const disable = useSelector((state: any) => state.profileUpdate.disable)
    const error = useSelector((state: any) => state.profileUpdate.error)
    useEffect(() => {
        dispatch(profileDetailsFetch())
    }, [dispatch, user])

    useEffect(() => {
        setTimeout(() => {
            if (error) {
                toast.error(error)
            }
        }, 1000)
    }, [error])
    const [isEditMode, setIsEditMode] = useState(false)
    const toggleEditMode = () => setIsEditMode(!isEditMode)

    const displaySidebar = () => {
        dispatch(toggleSidebar());
    };


    return (
        <div className="p-10 h-full w-full text-white bg-[#121113]">
            <button
                onClick={displaySidebar}
                className='absolute top-0 left-0 m-[10px] md:hidden'
            >
                <Image
                    src={menuIcon}
                    alt=""
                    className='w-[35px] h-[35px]'
                />
            </button>
            <Toaster position="top-right" />
            <div className="bg-black p-4 mx-auto h-full max-w-md rounded-2xl shadow-2xl">
                <div className="mt-8">
                    {isEditMode ? (
                        <>
                            <ImageUploadEdit userImages={images} />
                        </>
                    ) : (
                        <>
                            {images && images.length > 0 && (
                                <UserImageSlider images={images} />
                            )}
                        </>
                    )}
                </div>
                <div className="grid grid-cols-1 overflow-y-scroll sm:max-h-[30%] max-h-[30%]">
                    {currentId === id ? (
                        isEditMode ? (
                            <>{user && <UserInfoUpdate />}</>
                        ) : (
                            <>{user && <CurrentUserInfo user={user} />}</>
                        )
                    ) : (
                        <>{user ? <UserInfo user={user} /> : <></>}</>
                    )}
                </div>
                <>
                    {currentId === id ? (
                        <></>
                    ) : (
                        <div className="flex w-full justify-evenly">
                            <Button
                                name={'dislike'}
                                className={`w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-[#f59795] hover:bg-[#f59795] flex items-center justify-center cursor-pointer`}
                                onClick={() => {
                                    dispatch(swipeLeft(user))
                                    dispatch(setTab('matches'))
                                    socket?.emit('send notif', {
                                        notifType: 'dislike',
                                        user: user?.email,
                                        id: null,
                                    })
                                    dispatch(
                                        createNotification({
                                            notifType: 'dislike',
                                            user: user?.email,
                                            id: null,
                                        })
                                    )
                                }}
                            >
                                <IconX />
                            </Button>
                            <Button
                                name={'block'}
                                className="w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-red-500 hover:bg-red-500 flex items-center justify-center cursor-pointer"
                                onClick={() => {
                                    dispatch(blockUser(user))
                                    dispatch(setTab('matches'))
                                    dispatch(getListOfNotifications())
                                }}
                            >
                                <IconUserCancel color="white" />
                            </Button>
                            <Button
                                name={'like'}
                                className={`w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-[#20dab6] hover:bg-[#20dab6] flex items-center justify-center cursor-pointer`}
                                onClick={() => {
                                    dispatch(setLastSwipedId(user.id))
                                    dispatch(swipeRight(user))
                                    dispatch(setTab('matches'))
                                    socket?.emit('send notif', {
                                        notifType: 'like',
                                        user: user?.email,
                                        id: null,
                                    })
                                    dispatch(
                                        createNotification({
                                            notifType: 'like',
                                            user: user?.email,
                                            id: null,
                                        })
                                    )
                                }}
                            >
                                <IconHeartFilled />
                            </Button>
                        </div>
                    )}
                </>
                {currentId === id ? (
                    <div className="w-full flex justify-center items-center h-[50px]">
                        {isEditMode ? (
                            <button
                                disabled={disable}
                                onClick={() => {
                                    toggleEditMode()
                                    dispatch(profileUpdate())
                                }}
                                className={`bg-pink-500 text-white px-2 py-1 rounded-md hover:bg-pink-600`}
                            >
                                Save Changes
                            </button>
                        ) : (
                            <button
                                onClick={toggleEditMode}
                                className="bg-pink-500 text-white px-2 py-1 rounded-md hover:bg-pink-600"
                            >
                                Edit Profile
                            </button>
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    )
}
