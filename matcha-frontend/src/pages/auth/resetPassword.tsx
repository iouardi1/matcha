import { useDispatch, useSelector } from 'react-redux';
import { IconBrandGoogle, IconBrandTinder } from '@tabler/icons-react';
import { SparklesCore } from '@/components/ui/sparkles';
import { ResetPasswordSchema } from '@/validations';
import { Field, Form, Formik } from 'formik';
import { unwrapResult } from '@reduxjs/toolkit';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import { resetPasswordUser } from '@/redux/features/resetPasswordSlice';

const resetPasswordForm = () => {
  const dispatch = useDispatch();
  const router = useRouter()
  const { loading, error, data } = useSelector((state: any) => state.resetPassword);
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
          initialValues={{ password: '', confirmPassword: '' }}
          validationSchema={ResetPasswordSchema}
          onSubmit={async (values, { resetForm }) => {
            if (codeId) {
              try {
                    const requestData = { ...values, codeId: codeId?.codeId };
                    const resultAction = await dispatch(resetPasswordUser(requestData));
                    const data = await unwrapResult(resultAction);
                    if (data) {
                      toast.success(data.message);
                      router.push('/auth/login');
                    }
                  } catch (error: any) {
                    toast.error(error);
                    resetForm();
                  }
                } else {
                  toast.error('Please validate your account first');
                  router.push('./sendVerificationCode');
              }
          }}
        >
          {({ errors, touched, handleChange, handleSubmit }) => (
            <Form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-white">
                    New password
                  </label>
                </div>
                <div className="mt-2">
                  <Field
                    id="password"
                    name="password"
                    type='password'
                    className="auth-input"
                    // placeholder="Code"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-600">{errors.password}</div>
                  )}
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Confirm password
                  </label>
                </div>
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

export default resetPasswordForm;
