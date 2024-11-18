import React, { useEffect, useRef, useState } from 'react'
import Image from "next/image"
import menuIcon from "@/utils/pictures/icons-menu.png"
import Swipeable from 'react-swipy'
import Swiper from './utils/Swiper' // Adjust the path as needed
import Card from './Card'
import Button from './Button'
import { IconHeartFilled, IconX, IconUserCancel } from '@tabler/icons-react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createNotification,
    getListOfMatches,
    getListOfNotifications,
    getListOfPotentialMatches,
    setTab,
    toggleSidebar,
} from '@/redux/features/sideBarSlice'
import { getImage } from '@/utils/helpers/functions'
import {
    blockUser,
    setLastSwipedId,
    swipeLeft,
    swipeRight,
} from '@/redux/features/swipeSlice'
import { useSocket } from '@/redux/context/SocketContext'
import { IconUserCircle } from '@tabler/icons-react'
import { setId } from '@/redux/features/profileSlice'

const SwiperComponent = () => {
    const [cards, setCards] = useState<any>([])
    const [centerX, setCenterX] = useState<any>()
    const [swipeDirection, setSwipeDirection] = useState<any>(null)
    const [hoverLike, setHoverLike] = useState(false)
    const [hoverDislike, setHoverDislike] = useState(false)
    const cardRef = useRef(null)
    const dispatch = useDispatch()
    const matches = useSelector((state: any) => state.sideBar.potentialMatch)
    const matchNotif = useSelector((state: any) => state.swipe.matchNotif)
    const lastSwipedId = useSelector((state: any) => state.swipe.lastSwipedId)

    const socket = useSocket()

    useEffect(() => {
        dispatch(getListOfPotentialMatches())
        setCards([...matches])
    }, [matches, dispatch])

    useEffect(() => {
        if (matchNotif && lastSwipedId) {
            socket?.emit('send notif', {
                notifType: 'match',
                user: null,
                id: lastSwipedId,
            })

            dispatch(
                createNotification({
                    notifType: 'match',
                    user: null,
                    id: lastSwipedId,
                })
            )
        }
        dispatch(getListOfMatches())
    }, [dispatch, matchNotif, lastSwipedId])

    const remove = () => {
        setCards(cards.slice(1))
    }

    useEffect(() => {
        if (cards.length === 0) {
            dispatch(getListOfPotentialMatches())
        }
    }, [dispatch, cards.length])

    const handleSwipe = (direction: any) => {
        if (direction === 'right') {
            dispatch(setLastSwipedId(cards[0]?.id))
            dispatch(swipeRight(cards[0]))
            socket?.emit('send notif', {
                notifType: 'like',
                user: cards[0].email,
                id: null,
            })
            dispatch(
                createNotification({
                    notifType: 'like',
                    user: cards[0].email,
                    id: null,
                })
            )
        } else if (direction === 'left') {
            dispatch(swipeLeft(cards[0]))
            socket?.emit('send notif', {
                notifType: 'dislike',
                user: cards[0].email,
                id: null,
            })
            dispatch(
                createNotification({
                    notifType: 'dislike',
                    user: cards[0].email,
                    id: null,
                })
            )
        }
    }

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

    const handleBlock = () => {
        dispatch(blockUser(cards[0]))
        dispatch(getListOfNotifications())
        remove()
    }

    const handlemouse = (e: any) => {
        setCenterX(e.clientX)
    }
    const handlemousemove = (e: any) => {
        if (centerX) {
            if (e.clientX > centerX && swipeDirection != 'right') {
                setSwipeDirection('right')
            } else if (e.clientX < centerX && swipeDirection != 'left') {
                setSwipeDirection('left')
            }
        }
    }
    const handlemouseup = () => {
        setCenterX(null)
        setSwipeDirection(null)
    }

    const displaySidebar = () => {
        dispatch(toggleSidebar());
    };

    if (matches.length == 0) {
        return (
            <div className='no-conv-yet'>
                <p>No Matches Yet :c</p>
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
            </div>
        )
    }

    return (
        <div className="h-full relative flex justify-center items-center w-full overflow-hidden">
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
            <div className="relative sm:w-[350px] sm:h-[500px] xs:w-[300px] xs:h-[450px]  w-[230px] h-[450px]">
                {cards.length > 0 && (
                    <div
                        ref={cardRef}
                        className="relative sm:w-[350px] sm:h-[500px] xs:w-[300px] xs:h-[450px]  w-[230px] h-[450px]"
                        onMouseDown={handlemouse}
                        onMouseMove={handlemousemove}
                        onMouseUp={handlemouseup}
                    >
                        <Swipeable
                            onSwipe={handleSwipe}
                            onAfterSwipe={remove}
                            buttons={({ right, left }: any) => {
                                const swipeFunction = { right, left }
                                Swiper.initializeSwiper(swipeFunction)
                                return (
                                    <div className="flex justify-between mt-2">
                                        <Button
                                            name={'dislike'}
                                            className={`${
                                                swipeDirection === 'left'
                                                    ? 'bg-[#f59795]'
                                                    : ''
                                            } w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-[#f59795] hover:bg-[#f59795] flex items-center justify-center cursor-pointer`}
                                            onClick={Swiper.swipeLeft}
                                            callbacks={{
                                                setHoverDislike,
                                            }}
                                        >
                                            {swipeDirection === 'left' ? (
                                                <IconX color="white" />
                                            ) : (
                                                <IconX
                                                    color={
                                                        hoverDislike == true
                                                            ? 'white'
                                                            : '#f59796'
                                                    }
                                                />
                                            )}
                                        </Button>
                                        <Button
                                            name={'block'}
                                            className="w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-red-500 hover:bg-red-500 flex items-center justify-center cursor-pointer"
                                            onClick={handleBlock}
                                        >
                                            <IconUserCancel color="white"/>
                                        </Button>
                                        <Button
                                            name={'like'}
                                            className={`${
                                                swipeDirection === 'right'
                                                    ? 'bg-[#20dab6]'
                                                    : ''
                                            } w-[50px] h-[50px] rounded-full bg-transparent border-[2px] border-[#20dab6] hover:bg-[#20dab6] flex items-center justify-center cursor-pointer`}
                                            onClick={Swiper.swipeRight}
                                            callbacks={{
                                                setHoverLike,
                                            }}
                                        >
                                            {swipeDirection === 'right' ? (
                                                <IconHeartFilled color="white" />
                                            ) : (
                                                <IconHeartFilled
                                                    color={
                                                        hoverLike == true
                                                            ? 'white'
                                                            : '#20dab5'
                                                    }
                                                />
                                            )}
                                        </Button>
                                       
                                    </div>
                                )
                            }}
                        >
                            <Card>
                                <div
                                    className={`${
                                        swipeDirection == 'right'
                                            ? 'visible'
                                            : 'hidden'
                                    } bg-[#20dab5]  absolute left-[20px] top-[20px] z-10 w-[60px] h-[30px] text-center text-xl text-uppercase font-bold text-white rounded-[5px]`}
                                >
                                    like
                                </div>
                                <div
                                    className={`${
                                        swipeDirection == 'left'
                                            ? 'visible'
                                            : 'hidden'
                                    } bg-[#f59796] absolute right-[20px] top-[20px] z-10 w-[80px] h-[30px] text-center text-xl text-uppercase font-bold text-white rounded-[5px] `}
                                >
                                    dislike
                                </div>

                                <div className="w-full h-[20%] justify-between text-white font-light xs:font-bold capitalize p-2 text-center z-10 flex bg-black bg-opacity-10">
                                    <div className='flex flex-col-reverse items-center'>
                                        <div className="flex font-light xs:font-bold text-base ">
                                            <p>Famerate</p>
                                            <span>&nbsp;&nbsp;</span>
                                            <p>10</p>
                                        </div>
                                        <div className="flex font-light text-xl xs:font-bold xs:text-2xl">
                                            <p className="">
                                                {cards[0].username}
                                            </p>
                                            <span>&nbsp;&nbsp;</span>
                                            <p>{cards[0].age}</p>{' '}
                                        </div>
                                    </div>
                                    <div className='flex items-center h-full' onClick={() => {
                                        dispatch(setTab('details'))
                                        dispatch(setId(cards[0].id))
                                        viewProfile(cards[0].id)
                                    }}>
                                        <IconUserCircle color="#ffffff" className='xs:w-[50px] xs:h-[50px] w-[30px] h-[30px]'/>
                                    </div>
                                </div>

                                <img
                                    onDragStart={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    src={getImage(cards[0].profile_picture)}
                                    alt="userprofile"
                                    className="object-cover w-full h-full rounded-[15px] absolute"
                                />
                            </Card>
                        </Swipeable>

                        {cards.length > 1 && (
                            <Card zIndex={-1}>
                                <div className="w-full h-[20%] items-start text-white font-bold capitalize p-2 text-center z-10 flex flex-col-reverse bg-black bg-opacity-10">
                                    <div className="flex font-extrabold text-2xl">
                                        <p className="">{cards[1].username}</p>
                                        <span>&nbsp;&nbsp;</span>
                                        <p>{cards[1].age}</p>{' '}
                                    </div>
                                </div>
                                <img
                                    onDragStart={(e) => {
                                        e.preventDefault()
                                        e.stopPropagation()
                                    }}
                                    src={getImage(cards[1].profile_picture)}
                                    alt="userprofile"
                                    className="object-cover w-full h-full rounded-[15px] absolute"
                                />
                            </Card>
                        )}
                    </div>
                )}
                {cards.length <= 1 && (
                    <Card zIndex={-2}>No more suggestions</Card>
                )}
            </div>
        </div>
    )
}

export default SwiperComponent
