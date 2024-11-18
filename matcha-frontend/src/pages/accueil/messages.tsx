import { useDispatch, useSelector } from "react-redux";
import Image from "next/image"
import menuIcon from "@/utils/pictures/icons-menu.png"
import { useEffect, useRef, useState } from "react";
import { addNewMessage, addNewMessages, fetchConversationMessages } from "@/redux/features/conversationSlice";
import { useSocket } from "@/redux/context/SocketContext";
import { createNotification, getConversations, getListOfMatches, getListOfNotifications, setTab, toggleSidebar, updateLastMessage} from "@/redux/features/sideBarSlice";
import { getImage } from "@/utils/helpers/functions";
import locationIcon from "@/utils/pictures/location-icon.png"
import heartIcon from "@/utils/pictures/heart-icon.png"
import blockIcon from "@/utils/pictures/icons-block.png"
import { blockUser } from "@/redux/features/swipeSlice";

const Messages = () => {
    const dispatch = useDispatch();
    const socket = useSocket();
    const convs = useSelector((state: any) => state.sideBar.conversations)
    const activeConversationId = useSelector((state: any) => state.sideBar.activeConversationId);
    const activeConversation = convs.find((conv: any) => conv.id === activeConversationId);
    
    const messages = useSelector((state: any) => state.conversation.activeConversationMessages);
    
    const Profile = useSelector((state: any) => state.sideBar.profile);
    const [newMessage, setNewMessage] = useState("");
    const conversationEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (activeConversationId) {
            dispatch(fetchConversationMessages(activeConversationId));

            socket?.emit('join conversation', activeConversationId);

            socket?.on('message received', (message: any) => {
                dispatch(addNewMessages(message));
                dispatch(updateLastMessage(message));
                // dispatch(getConversations(Profile.id));
            });
        }

        // Clean up the socket events when the component unmounts or when activeConversationId changes
        return () => {
            socket?.emit('leave conversation', activeConversationId);
            socket?.off('message received');
        };
    }, [activeConversationId, dispatch, socket]);

    useEffect(() => {
        // Scroll to the bottom whenever messages change
        if (conversationEndRef.current) {
            conversationEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleBlock = () => {
        dispatch(blockUser(activeConversation))
        dispatch(setTab('matches'))
        dispatch(getListOfMatches())
        dispatch(getConversations(Profile.id));
        dispatch(getListOfNotifications())
    }

    const displaySidebar = () => {
        dispatch(toggleSidebar());
    };


    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const messageData = {
                participant_id: Profile.id,
                message_text: newMessage,
                conversationId: activeConversationId,
                sender_id: Profile.id,
            };

            socket?.emit('new message', messageData);
            dispatch(addNewMessage(messageData));
            dispatch(addNewMessages(messageData));
            dispatch(updateLastMessage(messageData));

            socket?.emit('send notif', {
                notifType: 'message',
                id: activeConversation.match_id,
                user: null,
            })
            dispatch(
                createNotification({
                    notifType: 'message',
                    user: null,
                    id: activeConversation.match_id,
                })
            )
            setNewMessage('')
        }
    };

    // Handle Enter key press in the input field
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSendMessage();
        }
    };

    if (!activeConversationId) {
        return (
            <div className="no-conv-yet">
                <p>
                    You got it Hottie :3
                </p>
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
        activeConversationId &&
        activeConversation && (
            <div className="conv">
                <div className="conv-era">
                    <div className="header">
                        <button onClick={displaySidebar}>
                            <Image
                                src={menuIcon}
                                alt=""
                                className="menu-icon"
                            />
                        </button>
                        <div className="userInfos">
                            <img
                                src={getImage(activeConversation?.photo)}
                                alt=""
                                className="userPicture"
                            />
                            <p className="user-details">
                                You matched with {activeConversation?.username}{' '}
                                on {activeConversation?.matchingdate}
                            </p>
                        </div>
                        <div className="conv-settings">
                            <button onClick={handleBlock}>
                                <Image
                                    src={blockIcon}
                                    alt="Profile picture"
                                    className="icon-picture"
                                />
                            </button>
                        </div>
                        <div></div>
                    </div>
                    <div className="conversation-history">
                        {messages?.map((message: any, index: number) => (
                            <div
                                key={index}
                                className={`message ${
                                    message.sender_id == Profile.id
                                        ? 'user'
                                        : 'match'
                                }`}
                            >
                                <p>{message.message_text}</p>
                            </div>
                        ))}
                        {/* This element will always be scrolled into view */}
                        <div ref={conversationEndRef} />
                    </div>
                    <div className="message-input">
                        <button
                            className="send-button"
                            onClick={handleSendMessage}
                        >
                            Send
                        </button>
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            onKeyDown={handleKeyDown}
                        />
                    </div>
                </div>
                <div className="profile">
                    <div className="pictures">
                        <img
                            src={getImage(activeConversation.photo)}
                            alt=""
                            className="match-picture"
                        />
                    </div>
                    <div className="bio">
                        <div className="name-age">
                            <p className="username">
                                {activeConversation?.username}{' '}
                                {activeConversation?.age}{' '}
                            </p>
                            <div className="location">
                                <Image
                                    src={locationIcon}
                                    alt=""
                                    className="location-icon"
                                />
                                <p id="location">
                                    {activeConversation?.distance} km away
                                </p>
                            </div>
                        </div>
                        <div className="intrested-in-relation">
                            <div className="tag">
                                <Image
                                    src={heartIcon}
                                    alt=""
                                    className="heart-icon"
                                />
                                <p>
                                    Looking for{' '}
                                    {activeConversation?.interested_in_relation}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    )
}

export default Messages