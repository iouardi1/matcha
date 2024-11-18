'use client'

import React, { useState } from "react";
import { cn } from "@/utils/cn";
import {
  IconBrandGoogle,
} from "@tabler/icons-react";
import { SparklesCore } from "../ui/sparkles";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { SignUpSchema } from "@/validations";
import  toast, { Toaster } from "react-hot-toast";
import { registerUser } from "@/redux/features/registerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import { LabelInputContainer } from "../ui/labelInputContainer";
import Loading from "../ui/loading";
import { useRouter } from "next/router";


export function RegisterForm() {
	const router = useRouter();
	const dispatch = useDispatch();
	const { loading } = useSelector((state: any) => state.register);

    if (loading) {
        return (
            <Loading/>
        )
    }

  return (
	<div className="flex h-screen items-center">
		<div className="w-full absolute inset-0 h-screen">
			<SparklesCore
				id="tsparticlesfullpage"
				background="transparent"
				minSize={0.6}
				maxSize={1.4}
				particleDensity={100}
				className="w-full h-full"
				particleColor="#FFFFFF"
			/>
		</div>
		<Toaster position="top-right" />
		<div className="max-w-md w-full h-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input  z-10">
			<h2 className="font-bold text-xl text-center text-white">
				Welcome to Matcha
			</h2>
			<Formik
				initialValues={{
					firstname: '',
					lastname: '',
					username: '',
					email: '',
					password: '',
					confirmPassword: ''
				}}
				validationSchema={SignUpSchema}
				onSubmit={async (values, { resetForm }) => {
                    try {
                        const resultAction = await dispatch(registerUser(values));
                        const data = unwrapResult(resultAction);
                        
                        if (data) {
							resetForm();
							toast.success('Please Verify your email!');
							router.push('/auth/login'); 
                        }
                    } catch (error: any) {
						toast.error(error);
						resetForm();

                    }
                }}
        	>
			{({ errors, touched, handleChange, handleSubmit }) => (
			<Form className="my-8" onSubmit={handleSubmit}>
				<div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
					<LabelInputContainer>
						<label className="block text-sm font-medium leading-6 text-white">
							First Name
						</label>
						<Field
							id="firstname"
							name="firstname"
							type="text"
							autoComplete=""
							onChange={handleChange}
							required
							// placeholder="First Name"
							className="auth-input"
						/>
						 {touched.firstname && errors.firstname && (
                   			 <div className="text-red-600">{errors.firstname}</div>
                  )}
					</LabelInputContainer>

					<LabelInputContainer>
						<label className="block text-sm font-medium leading-6 text-white">
							Last Name
						</label>
						<Field
							id="lastname"
							name="lastname"
							type="text"
							autoComplete=""
							onChange={handleChange}
							required
							// placeholder="Last Name"
							className="auth-input"
						/>
						 {touched.lastname && errors.lastname && (
							<div className="text-red-600">{errors.lastname}</div>
						)}
					</LabelInputContainer>
				</div>

				<LabelInputContainer className="mb-4">
					<label className="block text-sm font-medium leading-6 text-white">
						Username
					</label>
					<div className="mt-2">
						<Field
							id="username"
							name="username"
							type="text"
							autoComplete=""
							onChange={handleChange}
							required
							// placeholder="Username"
							className="auth-input"
						/>
						 {touched.username && errors.username && (
                    		<div className="text-red-600">{errors.username}</div>
                  )}
					</div>
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<label className="block text-sm font-medium leading-6 text-white">
						Email
					</label>
					<div className="mt-2">
						<Field
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							onChange={handleChange}
							required
							// placeholder="projectmayhem@fc.com"
							className="auth-input"
						/>
						  {touched.email && errors.email && (
                    		<div className="text-red-600">{errors.email}</div>
                  )}
					</div>
				</LabelInputContainer>

				<LabelInputContainer className="mb-4">
					<label className="block text-sm font-medium leading-6 text-white">
						Password
					</label>
					<div className="mt-2">
						<Field
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							onChange={handleChange}
							required
							placeholder="••••••••"
							className="auth-input"
						/>
						  {touched.password && errors.password && (
                    <div className="text-red-600">{errors.password}</div>
                  )}
					</div>
				</LabelInputContainer>

				<LabelInputContainer className="mb-8">
					<label className="block text-sm font-medium leading-6 text-white">
						Confirm Password
					</label>
					<div className="mt-2">
						<Field
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							autoComplete="current-password"
							onChange={handleChange}
							required
							placeholder="••••••••"
							className="auth-input"
						/>
						  {touched.confirmPassword && errors.confirmPassword && (
                    		<div className="text-red-600">{errors.confirmPassword}</div>
                  )}
					</div>
				</LabelInputContainer>

				<button
					className="auth-submit"
					type="submit"
					disabled={loading}
				>
					{/* {loading ? <Spinner /> : 'Register'} */}
					Sign up &rarr;
				</button>

				<div className="bg-gradient-to-r from-transparent via-neutral-300 to-transparent my-8 h-[1px] w-full" />
			</Form>
			)}
		</Formik>

			<form action={process.env.API + "/auth/google"}>
				<div className="flex flex-col space-y-4 items-center">
					<button
						className=" relative group/btn flex space-x-2 items-center justify-center px-4 w-[50%] text-black rounded-md h-10 font-medium shadow-input bg-gray-50"
						type="submit"
					>
						<IconBrandGoogle className="h-4 w-4 text-neutral-800" />
						<span className="text-neutral-700 text-sm">
							Google
						</span>
					</button>
				</div>
			</form>
		</div>
	</div>
	)
}

export default RegisterForm