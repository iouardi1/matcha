import React, { createContext, useContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import Cookies from 'js-cookie'

const SocketContext = createContext<Socket | null>(null)

export const useSocket = () => {
    return useContext(SocketContext)
}

export const SocketProvider = ({ children }: any) => {
    const [socket, setSocket] = useState<Socket | null>(null)
    // const [token, setToken] = useState<string | null>(null)
    useEffect(() => {
        const token = Cookies.get('accessToken')

        const newSocket = io(`${process.env.BACKEND_LOCAL_DEV}`, {
            auth: {
                token: token,
            },
        })
        setSocket(newSocket)

        return () => {
            newSocket.close()
        }
    }, [])

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    )
}
