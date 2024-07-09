"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import React from "react"
import { FaInstagramSquare } from "react-icons/fa"

export default function Profile() {
  const { data: session } = useSession()

  return (
    <div className="flex items-center justify-between mt-14 ml-10 w-full">
      {session?.user ? (
        <img
          src={session?.user?.image}
          alt="user avatar"
          className="w-16 h-16 rounded-full border p-[2px]"
        />
      ) : (
        <FaInstagramSquare />
      )}

      <div className="flex-1 ml-4">
        <h2 className="font-bold">{session?.user?.username}</h2>
        <h3 className="text-sm text-slate-500">
          Welcome to Finsta - The Social Media App
        </h3>
      </div>

      {session ? (
        <button
          onClick={signOut}
          className="text-blue-700 text-sm font-semibold mr-5"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={signIn}
          className="text-blue-700 text-sm font-semibold mr-5"
        >
          Sign In
        </button>
      )}
    </div>
  )
}
