import { useSocket } from '@/redux/context/SocketContext'
import { setId } from '@/redux/features/profileSlice'
import { createNotification, setTab } from '@/redux/features/sideBarSlice'
import { formatDate, getImage } from '@/utils/helpers/functions'
import React from 'react'
import { useDispatch } from 'react-redux'

export default function NotifItem({ notif }: any) {
    const dispatch = useDispatch()
    const socket = useSocket()

    const viewProfile = (id: any) => {
        socket?.emit('send notif', {
            notifType: 'view',
            user: null,
            id: id,
        })
        dispatch(
            createNotification({
                notifType: 'view',
                user: null,
                id: id,
            })
        )
    }

    return (
        <div className="bg-white shadow-lg rounded-lg p-4 flex items-center space-x-4 mb-3 border-l-4 border-[#fd5564] hover:bg-pink-100 transition-all duration-200 ease-in-out">
            <img
                src={getImage(notif.profile_picture)}
                className="w-[50px] h-[50px] rounded-full shadow-md border-2 border-[#fd5564]"
                alt={`${notif.sender}'s profile picture`}
            />

            <div className="flex-1 text-left">
                <div className="text-gray-800 font-semibold text-[15px]">
                    {notif.sender}{' '}
                    <span className="text-gray-600 font-normal">
                        {notif.type === 'like'
                            ? 'liked your profile'
                            : notif.type === 'dislike'
                            ? 'disliked your profile'
                            : notif.type === 'message'
                            ? 'sent you a message'
                            : notif.type === 'view'
                            ? 'viewed your profile'
                            : notif.type === 'match'
                            ? 'matched with you'
                            : ''}
                    </span>
                </div>

                <div className="text-gray-500 text-xs mt-1">
                    {/* {new Date(notif.date).toLocaleString()}{' '} */}
                    {formatDate(notif.date)}
                </div>
            </div>

            {notif.type === 'like' && (
                <div
                    onClick={() => {
                        dispatch(setTab('details'))
                        dispatch(setId(notif.senderid))
                        viewProfile(notif.senderid)
                    }}
                    className="bg-[#fd5564] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-500 transition duration-200"
                >
                    View Profile
                </div>
            )}
        </div>
    )
}
