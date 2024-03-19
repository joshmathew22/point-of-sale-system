"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

const Checkout: NextPage = () => {
    
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="data:image/png;base64,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"
            alt="Your Company"
          />
          <div className="flex justify-center ">
            <a href="../">return to home</a>
          </div>
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-black-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            New User?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Create Account
            </a>
          </p>
        </div>
      </div>
    );
}
export default Checkout;