import { useDispatch, useSelector } from 'react-redux'
import { IconBrandGoogle, IconBrandTinder } from '@tabler/icons-react'
import { SparklesCore } from '../ui/sparkles'
import { SignInShema } from '@/validations'
import { Field, Form, Formik } from 'formik'
import { useState } from 'react'
import { loginFetch } from '@/redux/features/loginSlice'
import Cookies from 'js-cookie'
import { unwrapResult } from '@reduxjs/toolkit'
import toast, { Toaster } from 'react-hot-toast'
import { useRouter } from 'next/router'

const LoginForm = () => {
    const dispatch = useDispatch()
    const router = useRouter()
    const { loading, error, data } = useSelector((state: any) => state.login)
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
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
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <IconBrandTinder
                    color="#fd5564"
                    fill="#fd5564"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                    Sign in to your account
                </h2>
            </div>
            <form
                action={`${process.env.API}/auth/google`}
                className="flex flex-col mt-10 space-y-4 items-center sm:mx-auto sm:w-full sm:max-w-sm z-50"
            >
                <button
                    className="relative group/btn flex space-x-2 items-center justify-center px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-[#f1636f] dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                    type="submit"
                >
                    <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
                    <span className="text-neutral-700 dark:text-neutral-300 text-sm">
                        Continue with Google
                    </span>
                </button>
            </form>

            <div className="flex flex-col mt-10 space-y-4 items-center sm:mx-auto sm:w-full sm:max-w-sm">
                Or
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-10">
                <Formik
                    initialValues={{ email: '', password: '' }}
                    validationSchema={SignInShema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const resultAction = await dispatch(
                                loginFetch(values)
                            )
                            const data = await unwrapResult(resultAction)
                            if (data) {
                                resetForm()
                                Cookies.set('accessToken', data?.token, {
                                    expires: 7,
                                    secure: true,
                                })
                                toast.success('login successful!')
                                router.push('/accueil')
                            }
                        } catch (error: any) {
                            toast.error(error)
                            resetForm()
                        }
                    }}
                >
                    {({ errors, touched, handleSubmit }) => (
                        <Form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <label className="block text-sm font-medium leading-6 text-white">
                                    Email
                                </label>
                                <div className="mt-2">
                                    <Field
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="auth-input"
                                        placeholder="Email"
                                    />
                                    {touched.email && errors.email && (
                                        <div className="text-red-600">
                                            {errors.email}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <Toaster position="top-right" />
                            <div>
                                <div className="flex items-center justify-between">
                                    <label className="block text-sm font-medium leading-6 text-white">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <Field
                                        id="password"
                                        name="password"
                                        type={
                                            showPassword ? 'text' : 'password'
                                        }
                                        className="auth-input"
                                        placeholder="Password"
                                    />
                                    {touched.password && errors.password && (
                                        <div className="text-red-600">
                                            {errors.password}
                                        </div>
                                    )}
                                    <div className="text-sm">
                                        <a
                                            href="./sendVerificationCode"
                                            className="font-semibold text-[#fd5564] hover:text-[#fd5564"
                                        >
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="auth-submit"
                                    disabled={loading}
                                >
                                    {/* {loading ? <Spinner /> : 'Register'} */}
                                    Sign in
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <a
                        href="./register"
                        className="font-semibold leading-6 text-[#fd5564] hover:text-i[#fd5564"
                    >
                        register
                    </a>
                </p>
            </div>
        </div>
    )
}

export default LoginForm
