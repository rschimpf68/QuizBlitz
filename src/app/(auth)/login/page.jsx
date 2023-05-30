'use client';

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function Example() {
  const [data, setData] = useState({
    email: '',
    password: ''
  })

  const loginUser = (e) => {
    e.preventDefault()
    signIn('credentials', { ...data })
      .then(() => alert('[+] User has been logged!'))

  }

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST" onSubmit={loginUser}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={data.email}
                  onChange={e => setData({ ...data, email: e.target.value })}
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
                <div className="text-sm">
                  <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={e => setData({ ...data, password: e.target.value })}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{' '}
            <a href="#" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Start a 14 day free trial
            </a>
          </p>
          <button class="bg-gray-800 text-white hover:bg-gray-700 py-2 px-4 rounded w-full" onClick={() => signIn('github')}>
            <svg class="w-5 h-5 inline-block mr-2" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M8 0C3.584 0 0 3.584 0 8c0 3.536 2.281 6.537 5.447 7.59.398.074.547-.173.547-.384v-1.341c-2.216.481-2.679-1.067-2.679-1.067-.363-.922-.884-1.17-.884-1.17-.72-.492.054-.483.054-.483.797.057 1.217.817 1.217.817.71 1.183 1.869.842 2.324.644.073-.517.278-.867.506-1.067-1.195-.136-2.446-.598-2.446-2.666 0-.589.209-1.07.552-1.446-.055-.136-.24-.683.053-1.425 0 0 .453-.144 1.48.552.428-.118.886-.177 1.34-.177.453 0 .912.059 1.34.177 1.027-.696 1.48-.552 1.48-.552.293.742.109 1.289.054 1.425.344.376.551.857.551 1.446 0 2.975-1.253 2.53-2.448 2.665.192.167.36.498.36 1.005v1.487c0 .212.149.459.549.384C13.719 14.537 16 11.536 16 8c0-4.416-3.584-8-8-8z" />
            </svg>
            Iniciar sesión con GitHub
          </button>
          
          <button class="bg-red-600 text-white hover:bg-red-500 py-2 px-4 rounded w-full flex items-center justify-center" onClick={() => signIn('google')}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16"> <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z" fill="white"></path> </svg>
            &nbsp;&nbsp;Iniciar sesión con Google
          </button>



        </div>

      </div>
    </>
  )
}