import {
    getLocation,
    saveLocation,
    setLocation,
} from '@/redux/features/locationSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function Location() {
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

    return <></>
}
