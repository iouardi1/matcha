import { axiosInstance } from '@/_axios/instance'

export const removeByAttr = function (arr, attr, value) {
    var i = arr.length
    while (i--) {
        if (
            arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            arguments.length > 2 &&
            arr[i][attr] === value
        ) {
            arr.splice(i, 1)
        }
    }
    return arr
}

export const findByAttr = function (arr, attr, value) {
    var i = arr.length
    while (i--) {
        if (
            arr[i] &&
            arr[i].hasOwnProperty(attr) &&
            arguments.length > 2 &&
            arr[i][attr] === value
        ) {
            return arr[i][attr]
        }
    }
}

export const generateId = function () {
    let result = 'image-'
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const charactersLength = characters.length
    let counter = 0
    while (counter < 10) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        )
        counter += 1
    }
    return result
}

export const getImage = (path) => {
    if (!path) return null

    if (path.startsWith('http')) {
        return path
    }

    return `${process.env.BACKEND_LOCAL_DEV}/api/upload?path=${path}`
}

export const formatDate = (date) => {
    const currentDate = new Date()
    const inputDate = new Date(date)

    // Check if the input date is today
    if (
        inputDate.getDate() === currentDate.getDate() &&
        inputDate.getMonth() === currentDate.getMonth() &&
        inputDate.getFullYear() === currentDate.getFullYear()
    ) {
        // Same day: Hour:Minute (24-hour format)
        return inputDate.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        })
    }

    // Check if the input date is in the same year
    if (inputDate.getFullYear() === currentDate.getFullYear()) {
        // Same year: Day Month
        return inputDate.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'long',
        })
    }

    // Different year: Day Month Year
    return inputDate.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
    })
}
