import { axiosInstance } from '@/_axios/instance'
import {
    getLocation,
    saveLocation,
    setLocation,
} from '@/redux/features/locationSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function App() {
    const dispatch = useDispatch()
    const { location } = useSelector((state: any) => state.location)

    const manageUserLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    const loc = { latitude, longitude }
                    dispatch(saveLocation(loc))
                    dispatch(setLocation(`${latitude},${longitude}`))
                },
                (error) => {
                    if (error.code === error.PERMISSION_DENIED) {
                        dispatch(getLocation())
                    } else if (error.code === error.POSITION_UNAVAILABLE) {
                        console.error('Location information is unavailable.')
                    } else if (error.code === error.TIMEOUT) {
                        console.error(
                            'The request to get user location timed out.'
                        )
                    } else {
                        console.error('An unknown error occurred.')
                    }
                }
            )
        } else {
            console.error('Geolocation is not supported by this browser.')
        }
    }
    
    useEffect(() => {
        manageUserLocation()
    }, [dispatch])

    return (
        <div>
            <button onClick={manageUserLocation}>Get User Location</button>
            {location && (
                <div>
                    <h2>User Location</h2>
                    <p>location: {location}</p>
                </div>
            )}
        </div>
    )
}

export default App
