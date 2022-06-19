import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import { useState } from 'react'
import { TailSpin } from 'react-loader-spinner'

import { Header } from '../components/Header'
import { useUsername } from '../lib/useUsername'

const Login: NextPage = () => {
  const username = useUsername()

  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  function register() {
    localStorage.setItem("username", loginUsername);
    localStorage.setItem("password", loginPassword);
    setLoginUsername("");
    setLoginPassword("");

    window.location.href = "/"
  }
    
  return (
    <div>
      <Head>
        <title>YouCode</title>
        <meta name="description" content="The number one open source code tutorial platform" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="h-screen min-h-fit w-screen bg-green-400">
        <Header />
        <div>
          {
            // check if username and pass in localStorage (fake login for now)
            username
            ? (
              <div className="text-white bg-green-300 w-96 p-3 mx-auto mt-20 rounded-lg">
                <p className="font-semibold text-lg">You are already logged in</p>
              </div>
            )
            : (
              <div className="bg-green-300 w-96 p-3 mx-auto mt-20 rounded-lg flex flex-col gap-4">
                <p className="text-center text-white font-semibold">
                  You are not logged in, please create an account
                </p>
                <input className="w-full p-2 border-2 border-white rounded" type="text" placeholder="Username" 
                  value={loginUsername} 
                  onChange={e => setLoginUsername(e.target.value)}
                />
                <input className=" w-full p-2 border-2 border-white rounded" type="password" placeholder="Password"
                  value={loginPassword} 
                  onChange={e => setLoginPassword(e.target.value)} 
                />
                <p className="text-center text-white font-semibold">
                  or sign in with an identity provider
                </p>
                <div className="g_id_signin"
                  data-type="standard"
                  data-size="large"
                  data-theme="outline"
                  data-text="sign_in_with"
                  data-shape="rectangular"
                  data-logo_alignment="left">
                </div>
                <button className="bg-green-400 w-36 text-white font-semibold rounded p-3" onClick={
                  register
                }>
                  Register
                </button>
              </div>
            )
          }
        </div>
        <div id="g_id_onload"
          data-client_id="YOUR_GOOGLE_CLIENT_ID"
          data-login_uri="https://your.domain/your_login_endpoint"
          data-auto_prompt="false">
        </div>
        <Script src="https://accounts.google.com/gsi/client" async defer></Script>
      </main>
    </div>
  )
}

export default Login
