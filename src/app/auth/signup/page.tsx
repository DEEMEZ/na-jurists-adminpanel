'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function SignUp() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        {/* Header with Logo and Title */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/text-logo.png"
            alt="N&A Jurists Logo"
            width={100}
            height={100}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold text-gray-800">Trusted Legal Expertise</h1>
        </div>

        {/* Sign-Up Form */}
        <h2 className="text-xl font-semibold text-blue-500 text-center mb-6">Sign Up</h2>
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
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm Password"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-900 text-white font-semibold rounded-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign Up
          </button>
        </form>

        {/* Link to Login Page */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <Link href="/auth">
              <span className="text-blue-500 hover:underline">Sign In</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}