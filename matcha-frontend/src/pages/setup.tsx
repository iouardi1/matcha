import Bio from '@/components/profile/Bio'
import ImageUpload from '@/components/profile/ImageUpload'
import Tags from '@/components/profile/Tags'
import {
    populate,
    profileInit,
    profileSetup,
} from '@/redux/features/profileSetupSlice'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Modal from '@/components/profile/Modal'
import Gender from '@/components/profile/Gender'
import IntrestedIn from '@/components/profile/IntrestedIn'
import Birthday from '@/components/profile/Birthday'
import Username from '@/components/profile/Username'
import Loading from '@/components/ui/loading'
import Relationships from '@/components/profile/Relationships'
import { Form, Formik } from 'formik'
import { profileSetupSchema } from '@/validations/profileSetup'
import Location from '@/components/profile/Location'

export default function setup() {
    const dispatch = useDispatch()
    const error = useSelector((state: any) => state.profileSetup.error)
    const loading = useSelector((state: any) => state.loading.loading)
    const username = useSelector((state: any) => state.profileSetup.username)

    useEffect(() => {
        dispatch(profileInit())
    }, [dispatch])

    if (loading) return <Loading />
    return (
        <>
            <Location/>
            <Modal error={error} />
            <div className="w-full m-auto hidden justify-center sm:flex">
                <h1 className="font-bold text-xl">Create Account</h1>
            </div>
            <div className="flex flex-col w-screen h-screen sm:flex-row items-center sm:justify-evenly ">
                <div className="h-4/6 sm:h-[90%] mt-4">
                    <Formik
                        initialValues={{ bio: '' }}
                        context={{
                            isUsernameEditable: username.initVal === null,
                        }}
                        validationSchema={profileSetupSchema}
                        onSubmit={(values) => {
                            dispatch(profileSetup())
                        }}
                    >
                        <Form>
                            <Birthday />
                            <Gender />
                            <IntrestedIn />
                            <Bio />
                            <Username />
                            <Tags />
                            <Relationships />
                            <div className="flex items-center justify-center  absolute sm:bottom-5 left-[50%] mt-0 bottom-[0%]">
                                <button
                                    type="submit"
                                    className="bg-[#fd5564] rounded-lg shadow text-center text-white sm:text-base text-[8px] font-semibold sm:w-[100px] w-[70px] py-1"
                                >
                                    Continue
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
                <div className="h-2/6 sm:h-[90%]">
                    <ImageUpload />
                </div>
            </div>
        </>
    )
}

{
    /* <Modal error={error} />
			<div className="w-full m-auto flex justify-center">
				<h1 className="font-bold text-xl">Create Account</h1>
			</div>
			<div className="flex items-center h-[calc(100vh-100px)]">
				<div className="w-1/2">
					<Birthday />
					<Gender />
					<IntrestedIn />
					<Bio />
					<Username/>
					<Tags />
				</div>
				<div className="w-1/2">
					<ImageUpload />
				</div>
			</div>
			<div className="flex items-center justify-center">
				<button
					className="bg-indigo-900 rounded-lg shadow text-center text-white text-base font-semibold w-[100px] py-3"
					onClick={() => dispatch(profileSetup())}
				>
					Continue
				</button>
			</div> */
}
