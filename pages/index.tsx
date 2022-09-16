import Link from 'next/link';
import { BoltIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();

  return (
    <div className="min-h-screen container mx-auto px-6 py-12 flex flex-col items-center justify-center">
      <h1 className="inline-flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
        <BoltIcon className="shrink-0 w-14 h-14 sm:w-16 sm:h-16 text-blue-500" />
        <span className="sm:h-16 text-4xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-blue-400 to-blue-700 text-center">
          Magic NextAuth
        </span>
      </h1>
      <p className="mt-4 text-gray-500 text-xl sm:text-2xl text-center">
        Magic Link Authentication in Next.js with NextAuth and Fauna
      </p>
      <div className="mt-8">
        {session?.user ? (
          <div className="text-lg flex flex-col space-y-1 bg-gray-200 rounded-lg px-6 py-3">
            <p>
              Signed in as <strong>{session.user.email}</strong>
            </p>
          </div>
        ) : (
          <Link href="/api/auth/signin">
            <a className="px-6 py-3 rounded-md text-lg text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition">
              Get started
            </a>
          </Link>
        )}
      </div>
    </div>
  );
}
