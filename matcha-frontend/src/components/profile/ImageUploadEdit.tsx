import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconUpload, IconUserFilled } from '@tabler/icons-react'
import { generateId, getImage } from '@/utils/helpers/functions'
import ImagePlaceholder from './ImagePlaceholder'
import { IconTrash } from '@tabler/icons-react'
import {
    addEditImage,
    deleteEditFile,
    deleteEditImage,
    FillEditImages,
    uploadEditFile,
} from '@/redux/features/profileUpdateSlice'

export default function ImageUploadEdit({ userImages }: any) {
    const dispatch = useDispatch()

    const images = useSelector((state: any) => state.profileUpdate.images)

    const uploadEditInput: any = useRef(null)
    const uploadEditImage: any = useRef(null)
    const galleryEdit: any = useRef(null)
    let isEventListenerAdded = false
    const placeholder = useSelector(
        (state: any) => state.profileUpdate.imagesPlaceHolders
    )

    useEffect(() => {
        dispatch(FillEditImages(userImages))
        function uploadEvent(event: any) {
            const file = event.target.files[0]

            if (file) {
                const reader = new FileReader()
                const imageId = generateId()
                reader.onload = (e: any) => {
                    dispatch(
                        addEditImage({
                            id: imageId,
                            src: e.target.result,
                            path: null,
                        })
                    )
                }
                reader.readAsDataURL(file)
                dispatch(uploadEditFile(file))
            }
            uploadEditInput.current.addEventListener('click', (event: any) => {
                event.stopPropagation()
            })
        }

        if (!isEventListenerAdded) {
            uploadEditImage.current.addEventListener('click', () => {
                uploadEditInput.current.click()
            })
            isEventListenerAdded = true
        }
        if (uploadEditInput && uploadEditInput.current) {
            uploadEditInput.current.addEventListener('change', uploadEvent)
            return function cleanup() {
                uploadEditInput.current?.removeEventListener(
                    'change',
                    uploadEvent
                )
            }
        }
    }, [])

    return (
        <section>
            <div className="flex justify-center items-center sm:flex-col">
                <div className="text-[12px] sm:text-[1em]">
                    <h1>Profile photos</h1>
                </div>
                <div className="flex items-center">
                    {!images.length ? (
                        <IconUserFilled
                            className="rounded-full ring-2 ring-[#fd5564]  sm:w-[50px] sm:h-[50px]"
                            size={35}
                        />
                    ) : (
                        <img
                            className="object-cover w-[35px] h-[35px]  sm:w-[50px] sm:h-[50px] p-1 rounded-full ring-2 ring-[#fd5564]"
                            src={getImage(images[0].src)}
                            alt="Bordered avatar"
                        />
                    )}
                    <div
                        ref={uploadEditImage}
                        id="uploadEditImage"
                        className="flex w-6 h-6 sm:w-8 sm:h-8 ml-4 bg-gray-100 border-gray-400 rounded-lg items-center cursor-pointer"
                    >
                        <input
                            id="upload"
                            ref={uploadEditInput}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            disabled={images.length > 4 ? true : false}
                        />
                        <IconUpload className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 mx-auto" />
                    </div>
                </div>
            </div>

            <div
                ref={galleryEdit}
                id="galleryEdit"
                className="grid grid-cols-3 gap-[3px] sm:gap-3 sm:max-w-[220px] mt-5 place-items-center sm:mx-auto"
            >
                {images.map((image: any, key: any) => (
                    <div
                        key={key}
                        className="relative hover:blur-none flex max-w-[70px] h-[100px]"
                    >
                        <img
                            className="h-auto w-full rounded-lg"
                            src={getImage(image.src)}
                            alt=""
                        />
                        <div className="absolute top-2 right-2 flex space-x-2">
                            <button
                                className="text-white bg-black bg-opacity-50 p-1 rounded-full hover:bg-opacity-75"
                                onClick={() => {
                                    dispatch(deleteEditImage(image.id))
                                    dispatch(deleteEditFile(image.src))
                                }}
                            >
                                <IconTrash className="w-[15px] h-[15px]" />
                            </button>
                        </div>
                    </div>
                ))}
                {placeholder.map((image: any) => (
                    <ImagePlaceholder key={image.id} />
                ))}
            </div>
            <div className="flex text-[12px] sm:text-[1em] justify-center">
                <p>
                    upload 1 photo to start, add up to 4 to make your profile
                    stand out
                </p>
            </div>
        </section>
    )
}
