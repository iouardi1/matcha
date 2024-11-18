import Image from '@/components/profile/Image'
import { addImage, uploadFile } from '@/redux/features/profileSetupSlice'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IconUpload, IconUserFilled } from '@tabler/icons-react'
import { generateId } from '@/utils/helpers/functions'
import ImagePlaceholder from './ImagePlaceholder'

export default function ImageUpload() {
    const uploadInput: any = useRef(null)
    const uploadImage: any = useRef(null)
    const gallery: any = useRef(null)
    let isEventListenerAdded = false

    const dispatch = useDispatch()
    const images = useSelector((state: any) => state.profileSetup.images)
    const placeholder = useSelector(
        (state: any) => state.profileSetup.imagesPlaceHolders
    )

    useEffect(() => {
        function uploadEvent(event: any) {
            const file = event.target.files[0]

            if (file) {
                const reader = new FileReader()
                const imageId = generateId()
                reader.onload = (e: any) => {
                    dispatch(
                        addImage({
                            id: imageId,
                            src: e.target.result,
                            path: null,
                        })
                    )
                }
                reader.readAsDataURL(file)
                dispatch(uploadFile(file))
            }
            uploadInput.current.addEventListener('click', (event: any) => {
                event.stopPropagation()
            })
        }

        if (!isEventListenerAdded) {
            uploadImage.current.addEventListener('click', () => {
                uploadInput.current.click()
            })
            isEventListenerAdded = true
        }
        if (uploadInput && uploadInput.current) {
            uploadInput.current.addEventListener('change', uploadEvent)
            return function cleanup() {
                uploadInput.current?.removeEventListener('change', uploadEvent)
            }
        }
    }, [])

    return (
        <section className="">
            <div className='flex justify-center items-center sm:flex-col'>
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
                            src={images[0].src}
                            alt="Bordered avatar"
                        />
                    )}
                    <div
                        ref={uploadImage}
                        id="uploadImage"
                        className="flex w-6 h-6 sm:w-8 sm:h-8 ml-4 bg-gray-100 border-gray-400 rounded-lg items-center cursor-pointer"
                    >
                        <input
                            id="upload"
                            ref={uploadInput}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            disabled={images.length > 4 ? true : false}
                        />
                        <IconUpload className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700 mx-auto" />
                    </div>
                </div>
            </div>

            <div ref={gallery} id="gallery" className="grid grid-cols-5 sm:grid-cols-3 gap-2 sm:gap-3 sm:max-w-[220px] mt-5 place-items-center sm:mx-auto">
                {images.map((image: any) => (
                    <Image key={image.id} image={image} />
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


