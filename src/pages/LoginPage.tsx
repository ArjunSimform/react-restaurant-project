// import React, { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import {
//   loginStart,
//   loginSuccess,
//   loginFailure,
// } from '../store/slices/authSlice';
// import { User, Lock } from 'lucide-react';

// const LoginPage = () => {
//   const dispatch = useDispatch();
//   const [credentials, setCredentials] = useState({
//     username: '',
//     password: '',
//   });
//   const [error, setError] = useState('');

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError('');

//     dispatch(loginStart());

//     // Mock authentication - replace with real API call
//     setTimeout(() => {
//       if (
//         credentials.username === 'admin' &&
//         credentials.password === 'admin123'
//       ) {
//         dispatch(
//           loginSuccess({
//             id: '1',
//             username: credentials.username,
//             role: 'admin',
//           })
//         );
//       } else {
//         dispatch(loginFailure());
//         setError('Invalid username or password');
//       }
//     }, 1000);
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCredentials({
//       ...credentials,
//       [e.target.name]: e.target.value,
//     });
//   };

//   return (
//     <div className="min-h-screen flex items-center  justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md w-full space-y-8">
//         <div>
//           <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
//             Restaurant Admin Panel
//           </h2>
//           <p className="mt-2 text-center text-sm text-gray-600">
//             Sign in to manage your restaurant menu
//           </p>
//         </div>

//         <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
//           <div className="rounded-md shadow-sm -space-y-px">
//             <div className="relative">
//               <label htmlFor="username" className="sr-only">
//                 Username
//               </label>
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="username"
//                 name="username"
//                 type="text"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Username"
//                 value={credentials.username}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="relative">
//               <label htmlFor="password" className="sr-only">
//                 Password
//               </label>
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="appearance-none rounded-none relative block w-full px-12 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
//                 placeholder="Password"
//                 value={credentials.password}
//                 onChange={handleChange}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="text-red-600 text-sm text-center">{error}</div>
//           )}

//           <div>
//             <button
//               type="submit"
//               className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
//             >
//               Sign in
//             </button>
//           </div>

//           <div className="text-center">
//             <p className="text-sm text-gray-600">
//               Demo credentials: <strong>admin</strong> /{' '}
//               <strong>admin123</strong>
//             </p>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

'use client';

import type React from 'react';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from '../store/slices/authSlice';
import { User, Lock } from 'lucide-react';

const LoginPage = () => {
  const dispatch = useDispatch();
  const formRef = useRef<HTMLFormElement>(null);

  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleFocus = () => {
    if (formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');
    setIsLoading(true);
    dispatch(loginStart());

    // Mock authentication - replace with real API call
    setTimeout(() => {
      if (
        credentials.username === 'admin' &&
        credentials.password === 'admin123'
      ) {
        dispatch(
          loginSuccess({
            id: '1',
            username: credentials.username,
            role: 'admin',
          })
        );
      } else {
        dispatch(loginFailure());
        setError('Invalid username or password');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form (Desktop) / Full Screen (Mobile) */}
      <div className="flex-1 lg:flex-none lg:w-1/2 flex items-center justify-center p-8 bg-white relative">
        {/* Mobile Background Image */}
        <div className="md:hidden absolute inset-0 z-0">
          <img
            src="/res.avif?height=800&width=400"
            alt="Restaurant"
            className="w-full h-full object-cover "
          />
        </div>

        <div className="w-full max-w-md relative z-10">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-light md:text-gray-900 text-white mb-2">
              Welcome Back
            </h1>
            <p className="md:text-gray-600 text-white">
              Restaurant Admin Panel
            </p>
          </div>

          {/* Login Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium md:text-gray-700 text-white mb-2"
              >
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 md:text-gray-400 text-white" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  onFocus={handleFocus}
                  required
                  className="w-full pl-10 text-white placeholder:text-white md:placeholder:text-gray-400 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="Enter username"
                  value={credentials.username}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium md:text-gray-700 text-white mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 md:text-gray-400 text-white" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="w-full pl-10 text-white placeholder:text-white md:placeholder:text-gray-400 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-colors"
                  placeholder="Enter password"
                  value={credentials.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-600 text-sm text-center py-2">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Demo Credentials */}
          <div className="mt-8 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 text-center mb-2">
              Demo Credentials
            </p>
            <div className="text-sm text-center space-x-4">
              <span className="text-gray-700">
                <strong>Username:</strong> admin
              </span>
              <span className="text-gray-700">
                <strong>Password:</strong> admin123
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image (Desktop Only) */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <img
          src="/restaurant.jpg?height=1080&width=960"
          alt="Restaurant Kitchen"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/20"></div> */}

        {/* Overlay Text */}
        <div className="absolute bottom-8 left-8 text-white">
          <h2 className="text-2xl font-light mb-2">Manage Your Restaurant</h2>
          <p className="text-white/80">
            Streamline operations with our admin panel
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
