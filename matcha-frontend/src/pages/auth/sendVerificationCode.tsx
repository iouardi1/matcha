import { useDispatch, useSelector } from 'react-redux';
import { IconBrandTinder } from '@tabler/icons-react';
import { sendVerificationCodeSchema } from '@/validations';
import { Field, Form, Formik } from 'formik';
import { SparklesCore } from '@/components/ui/sparkles';
import { sendVerificationCodeUser } from "@/redux/features/sendVerificationCodeSlice";
import { unwrapResult } from '@reduxjs/toolkit';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const sendVerificationCode = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { loading, data,  error } = useSelector(
    (state: any) => state.sendVerificationCode
  )

  return (
    <div className="flex h-screen flex-col justify-center px-6 py-12 lg:px-8">
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
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IconBrandTinder color="#fd5564" fill="#fd5564" className="mx-auto h-[45px] w-auto" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:h-full sm:max-w-sm z-10">
        <Formik
          initialValues={{ email: '' }}
          validationSchema={sendVerificationCodeSchema}
          onSubmit={async (values, { resetForm }) => {
            try {
                const resultAction = await dispatch(sendVerificationCodeUser(values));
                const data = unwrapResult(resultAction);
                if (data) {
                    toast.success('Verification code sent successfully')
                    // resetForm();
                    router.push('./forgetPassword');
                }
            } catch (error: any) {
                toast.error(error);
            }
          }}
        >
          {({ errors, touched, handleSubmit }) => (
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium leading-6 text-white">
                  Enter your email address
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
                    <div className="text-red-600">{errors.email}</div>
                  )}
                </div>
              </div>

              <div>
                <button 
                    type="submit"
                    className="auth-submit"
                    disabled={loading}
                >
                  Send
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default sendVerificationCode;
