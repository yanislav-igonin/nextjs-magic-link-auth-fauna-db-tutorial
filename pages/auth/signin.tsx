import { createPortal } from 'react-dom';
import { FormEvent, useState } from 'react';
import { BoltIcon, EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { signIn } from 'next-auth/react';

const MagicLinkModal = ({ show = false, email = '' }) => {
  if (!show) return null;

  return createPortal(
    <div className="fixed inset-0 z-10 bg-white bg-opacity-90 backdrop-filter backdrop-blur-md backdrop-grayscale">
      <div className="min-h-screen px-6 flex flex-col items-center justify-center animate-zoomIn">
        <div className="flex flex-col items-center justify-center text-center max-w-sm">
          <EnvelopeOpenIcon className="shrink-0 w-12 h-12 text-blue-500" />
          <h3 className="mt-2 text-2xl font-semibold">Confirm your email</h3>
          <p className="mt-4 text-lg">
            We emailed a magic link to <strong>{email}</strong>. Check your
            inbox and click the link in the email to login.
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
};

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    try {
      // Perform sign in
      const res = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: `${window.location.origin}/auth/confirm-request`,
      });
      if (res === undefined) {
        return;
      }
      const { error } = res;
      // Something went wrong
      if (error) {
        throw new Error(error);
      }
      setShowModal(true);
    } catch (error) {
      // handle error here (eg. display message to user)
    }
  };

  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <BoltIcon className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-blue-500" />
        <h1 className="mt-2 text-2xl sm:text-4xl text-center font-bold">
          Sign in to your account
        </h1>
        <form onSubmit={handleSignIn} className="mt-8 rounded-lg shadow-md bg-white px-4 py-6 sm:px-8 sm:py-8 space-y-6 w-full max-w-md">
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-gray-500 text-sm">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="elon@spacex.com"
              className="py-2 px-4 w-full border rounded-md border-gray-300 focus:outline-none focus:ring-4 focus:ring-opacity-20 focus:border-blue-400 focus:ring-blue-400 transition disabled:opacity-50 disabled:cursor-not-allowed "
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-500 transition"
          >
            Sign in
          </button>
        </form>
      </div>
      <MagicLinkModal show={showModal} email={email} />
    </>
  );
};

export default SignIn;
