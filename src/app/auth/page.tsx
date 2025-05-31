'use client';

import Link from 'next/link';
import Image from 'next/image';
import textLogo from '../../assets/images/text-logo.png';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header with Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src={textLogo}
            alt="N&A Jurists Logo"
            width={100}
            height={100}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Trusted Legal Expertise</h1>
        </div>

        {/* Login Form */}
        <h2 className="text-xl font-semibold text-blue-500 text-center mb-6">Sign In</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              defaultValue="ab88712@gmail.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </button>
        </form>

        {/* Link to Sign Up Page */}
        <div className="mt-4 text-center">
          <Link href="/auth/signup">
            <button
              className="py-2 px-4 text-blue-500 font-semibold rounded-md hover:underline"
            >
              Sign Up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}