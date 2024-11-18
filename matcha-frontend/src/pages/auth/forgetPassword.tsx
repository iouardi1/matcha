import { useDispatch, useSelector } from 'react-redux';
import { verifyCodeUser } from "@/redux/features/verifyCodeUserSlice";
import { IconBrandGoogle, IconBrandTinder } from '@tabler/icons-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { ForgetPasswordSchema } from '@/validations';
import { Field, Form, Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

const VerifyCodeForm = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  // const { loading, error, data } = useSelector((state: any) => state.verifyCodeUser);
  const codeId = useSelector(
    (state: any) => state.sendVerificationCode.data
  )

//   if (error) {
//     return <div>Error! {error.message}</div>;
//   }

//   if (loading) {
//     return <div>Loading...</div>;
//   }

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
      <Toaster position="top-right" />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <IconBrandTinder color="#fd5564" fill="#fd5564" className="mx-auto h-10 w-auto" />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm z-10">
        <Formik
          initialValues={{ email: '', code: '' }}
          validationSchema={ForgetPasswordSchema}
          onSubmit={async (values, { resetForm }) => {
            if (codeId) {
              try {
                  const requestData = { ...values, codeId: codeId?.codeId };
                    const resultAction = await dispatch(verifyCodeUser(requestData));
                    const data = await unwrapResult(resultAction);
                    if (data) {
                      toast.success(data.message);
                      router.push('./resetPassword');
                    }
                  } catch (error: any) {
                    if (error.response && error.response.status === 400) {
                      toast.error(error.response.data.error || error.response.data.message);
                      resetForm();
                    } else {
                      toast.error(error || 'An error occurred');
                    }
                  }
              }
              else {
                toast.error('Invalid code');
                resetForm();
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
                    <div className="text-red-600">{errors.email}</div>
                  )}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Verification Code
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="code"
                    name="code"
                    type='text'
                    className="auth-input"
                    placeholder="Code"
                  />
                  {touched.code && errors.code && (
                    <div className="text-red-600">{errors.code}</div>
                  )}
                </div>
              </div>

              <div>
                <button type="submit" className="auth-submit">
                  Verify
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default VerifyCodeForm;
