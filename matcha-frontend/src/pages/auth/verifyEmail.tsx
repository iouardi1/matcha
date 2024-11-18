import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { SparklesCore } from '@/components/ui/sparkles';
import { IconBrandTinder } from '@tabler/icons-react';
import { axiosInstance } from '@/_axios/instance';
import Loading from '@/components/ui/loading';

const VerifyEmail = () => {
  const router = useRouter();
  const { token } = router.query;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (token) {
      verifyEmail(token);
    }
  }, [token]);

  const verifyEmail = async (token: string) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/auth/verifyEmail?token=${token}`);
      setMessage('success');
      toast.success('Email verified successfully!');
      setTimeout(() => {
        router.push('/auth/login'); // Redirect after a delay for user to see the message
      }, 2000); // Adjust delay as needed
    } catch (error) {
      setMessage('error');
      toast.error('Email verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen flex flex-col items-center justify-center px-6 py-12">
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

      <Toaster position="top-center" />


      <div className="text-center flex flex-col items-center justify-center space-y-6 z-10">
        <IconBrandTinder color="#fd5564" fill="#fd5564" className="h-20 w-auto" />
        {loading ? (
          <p>Verifying...</p> // Display loading message while waiting for the response
        ) : (
            <p>
                {message === 'success' ? 'Your email has been verified successfully!' : 'Email verification failed. Please try again.'}
            </p>
          )
        }
      </div>
    </div>
  );
};

export default VerifyEmail;