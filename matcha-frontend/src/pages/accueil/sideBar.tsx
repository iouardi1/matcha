"use client"
import Image from 'next/image'
import profilePath from '/Users/macos/Desktop/matcha-backend/uploads/1725296132754.jpeg'
import defaultImage from '/Users/macos/Desktop/matcha-front/src/utils/pictures/woman1.jpeg'
import blurred from '@/utils/pictures/blurred.jpg'
import settingPath from '@/utils/pictures/icons8-adjust-50.png'
import logoutPath from '@/utils/pictures/icons8-logout-50.png'
import notifPath from '@/utils/pictures/icons8-notification-50.png'
import { useDispatch, useSelector } from 'react-redux'
import {
    addNotif,
    getConversations,
    getListOfMatches,
    getListOfNotifications,
    getListOfPotentialMatches,
    getProfile,
    initiateNewDM,
    setActiveConversation,
    setTab,
    toggleSidebar,
} from '@/redux/features/sideBarSlice'
import { useEffect, useState } from 'react'
import { getImage } from '@/utils/helpers/functions'
// import { useSocket } from '@/redux/context/SocketContext'
import Loading from '@/components/ui/loading'
import { profileInit, profileSetup } from '@/redux/features/profileSetupSlice'
import {
    profileDetailsFetch,
    profileFetch,
    setId,
} from '@/redux/features/profileSlice'
import { useSocket } from '@/redux/context/SocketContext'
import NotifItem from '@/components/notifs/NotifItem'
import menuIconSidebar from '@/utils/pictures/icons-menu-sidebar.png'
import Filters from '@/components/notifs/Filters'
import { logoutFetch } from '@/redux/features/loginSlice'

const SideBar = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector((state: any) => state.sideBar.tab)
    const matches = useSelector((state: any) => state.sideBar.matches)
    const potentialMatches = useSelector((state: any) => state.sideBar.potentialMatch)
    const likes = useSelector((state: any) => state.sideBar.likes)
    const notifs = useSelector((state: any) => state.sideBar.notifications)
    const conversations = useSelector(
        (state: any) => state.sideBar.conversations
    )
    const Profile = useSelector((state: any) => state.sideBar.profile)
    const isSidebarVisible = useSelector(
        (state: any) => state.sideBar.isSidebarVisible
    )
    const notifSocket = useSocket()
    const loading = useSelector((state: any) => state.loading.loading)

    const fetchProfile = () => {
        dispatch(getProfile())
        dispatch(getListOfMatches())
        dispatch(getListOfPotentialMatches())
        dispatch(getConversations())
        dispatch(getListOfNotifications())
    }

    const [notif, setNotif] = useState(false)
    const [showNotif, setShowNotif] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const displaySidebar = () => {
        dispatch(toggleSidebar());
    };

    const handleNotif = () => {
        setShowNotif(!showNotif)
        if (notif) setNotif(false)
        if (showFilter) setShowFilter(false)
    }

    const handleFilters = () => {
        setShowFilter(!showFilter)
        if (showNotif) setShowNotif(false)
    }
    useEffect(() => {
        fetchProfile()
    }, [dispatch, isSidebarVisible, matches, potentialMatches])

    // useEffect notif
    useEffect(() => {
        notifSocket?.on('notif received', (notif) => {
            dispatch(addNotif(notif))
            setNotif(true)
            if (notif?.type == 'match') {
                dispatch(getListOfMatches())
            }
        })
        return () => {
            notifSocket?.off('notif received')
        }
    }, [notif])

    const handleButtonClick = (tab: 'matches' | 'messages') => {
        dispatch(setTab(tab))
        dispatch(getConversations())
    }

    const handleConversationClick = (id: string) => {
        dispatch(setActiveConversation(id))
        dispatch(setTab('messages'))
    }

    const initiateDM = (match_id: string) => {
        const Conv = conversations.find((c: any) => c.match_id == match_id)
        if (Conv) {
            dispatch(setActiveConversation(Conv.id))
        } else {
            const participants = {
                participant_id: match_id,
                user_id: Profile.id,
            }
            dispatch(initiateNewDM(participants))
        }
        dispatch(setTab('messages'))
        dispatch(getConversations())
    }

    if (loading) {
        return <Loading />
    }

    return (
        <div className={'sidebar'}>
            <div className="header">
                <div className="profile-info">
                    <button onClick={displaySidebar}>
                        <Image
                            src={menuIconSidebar}
                            alt=""
                            className="menu-icon-sidebar"
                        />
                    </button>
                    <button
                        onClick={() => {
                            dispatch(setId(Profile.id))
                            dispatch(setTab('details'))
                            dispatch(profileDetailsFetch())
                        }}
                    >
                        <img
                            src={getImage(Profile?.profile_picture)}
                            alt=""
                            className="picture"
                        />
                    </button>
                    <span className="username">{Profile?.username}</span>
                </div>
                <div className="icons">
                    {/* logout */}
                    <button
                        className="relative"
                        onClick={() => {
                            dispatch(logoutFetch())
                        }}
                    >
                        <Image
                            src={logoutPath}
                            width={50}
                            height={50}
                            alt=""
                            className="icon2"
                        />
                    </button>
                    <button
                        className="relative"
                        onClick={() => {
                            handleFilters()
                        }}
                    >
                        <div
                            className={`${
                                showFilter ? '' : 'hidden'
                            } flex flex-col items-center bg-white w-[400px] h-auto p-6 absolute rounded-xl z-20 left-9 top-6 space-y-6`}
                            onClick={(event) => event.stopPropagation()}
                        >
                            <Filters setShow={setShowFilter}/>
                        </div>
                        <Image
                            src={settingPath}
                            width={50}
                            height={50}
                            alt=""
                            className="icon2"
                        />
                    </button>
                    {/* notif */}
                    <button
                        className="relative"
                        onClick={(e) => {
                            handleNotif()
                            e.stopPropagation()
                        }}
                    >
                        <div
                            className={` ${
                                notif ? '' : 'hidden'
                            } w-[10px] h-[10px] bg-green-500 rounded-[20px] absolute left-9 -top-1`}
                        ></div>
                        <div
                            onClick={(event) => event.stopPropagation()}
                            className={`${
                                showNotif ? '' : 'hidden'
                            } flex flex-col items-center bg-white w-[400px] h-[200px] absolute top-6 left-7 rounded-xl z-20 overflow-y-scroll scrollbar-hide`}
                        >
                            <div className="h-full w-full">
                                {notifs.map((notif: any, key: any) => {
                                    return <NotifItem notif={notif} key={key} />
                                })}
                            </div>
                        </div>
                        <Image
                            src={notifPath}
                            width={50}
                            height={50}
                            alt=""
                            className="icon2"
                        />
                    </button>
                </div>
            </div>
            <div className="matches-messages">
                <button
                    className={activeTab === 'matches' ? 'active' : ''}
                    onClick={() => handleButtonClick('matches')}
                >
                    Matches
                </button>
                <button
                    className={activeTab === 'messages' ? 'active' : ''}
                    onClick={() => handleButtonClick('messages')}
                >
                    Messages
                </button>
            </div>
            <div className="content">
                {activeTab == 'matches' ? (
                    <div className="matches-content">
                        <div className="match">
                            <Image
                                src={blurred}
                                alt="User's profile"
                                className="match-number"
                                priority
                            />
                            <p className="likes-count">
                                {Profile?.number_of_likes} likes
                            </p>
                        </div>
                        {matches.length > 0 &&
                            matches?.map((match: any) => (
                                <button
                                    key={match?.id}
                                    className="match"
                                    onClick={() => initiateDM(match?.id)}
                                >
                                    <img
                                        src={getImage(match?.profile_picture)}
                                        alt=""
                                        className="match-picture"
                                    />
                                    <p className="match-name">
                                        {match?.username}
                                    </p>
                                </button>
                            ))}
                    </div>
                ) : (
                    <div className="messages-content">
                        {conversations.map((conversation: any) => (
                            <button
                                key={conversation?.id}
                                className="conversation"
                                onClick={() =>
                                    handleConversationClick(conversation?.id)
                                }
                            >
                                <img
                                    src={getImage(conversation?.photo)}
                                    alt="Profile picture"
                                    className="conversation-picture"
                                />
                                <div className="conv-details">
                                    <p className="name">
                                        {conversation?.username}
                                    </p>
                                    <p className="last-message">
                                        {conversation?.last_message
                                            ? conversation?.last_message
                                            : '--- ---'}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SideBar
