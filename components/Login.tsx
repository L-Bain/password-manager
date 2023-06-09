'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import type { Database } from '../types/supabase'
import { pbkdf2Sync } from 'crypto'

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [displayType, setDisplayType] = useState("signIn");

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSignUp = async () => {
    var derived_password = pbkdf2Sync(password, email, 5000, 32, 'sha512').toString();

    const { error } = await supabase.auth.signUp({
      email,
      password: derived_password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })
    if (error) {
      console.log(error);
    }
    router.refresh()
  
  }

  const handleSignIn = async () => {
    var derived_password = pbkdf2Sync(password, email, 5000, 32, 'sha512').toString();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password: derived_password,
    })
    if (error !== null) {
      setLoginError(true);
    }
    
    localStorage.setItem("vaultKey", derived_password);

    router.refresh()
  }

  return (
    <>
      {displayType === "signIn" ? 
      <div className="w-fit flex flex-col justify-center items-center text-center p-10 bg-white text-black rounded">
        <h1 className="text-2xl mb-6 font-bold">Log In</h1>
        <h2>Email</h2>
        <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="text-black w-52 text-center ml-auto mr-auto mb-5 border-black border-2"/>
        <h2>Password</h2>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-black w-52 text-center ml-auto mr-auto mb-5 border-black border-2"
        />
        {loginError ? <h3 className="text-red-600 mb-5 loginErrorMessage">Incorrect email or password</h3> : null }

        <button onClick={handleSignIn} className="bg-black text-white p-3 rounded ml-auto mr-auto mb-5 w-20">Sign In</button>
        <button onClick={() => setDisplayType("signUp")}>Don't have an account? Sign Up</button>
      </div> : displayType === "signUp" ?
      <div className="w-fit flex flex-col justify-center items-center text-center p-10 bg-white text-black rounded">
        <h1 className="text-2xl mb-6 font-bold">Create New Account</h1>
        <h2>Email</h2>
        <input name="email" onChange={(e) => setEmail(e.target.value)} value={email} className="text-black w-52 text-center ml-auto mr-auto mb-5 border-black border-2"/>
        <h2>Password</h2>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          className="text-black w-52 text-center ml-auto mr-auto mb-5 border-black border-2"
        />

        <button onClick={handleSignUp} className="bg-black text-white p-3 rounded ml-auto mr-auto mb-5 w-22">Sign Up</button>
        <button onClick={() => setDisplayType("signIn")}>Already have an account? Sign In</button>
      </div> : null}
    </>
  )
}