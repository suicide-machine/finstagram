"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React from "react"
import { FaInstagramSquare } from "react-icons/fa"

export default function Header() {
  const { data: session } = useSession()
  // console.log(session)

  return (
    <div className="shadow-sm border-b sticky top-0 bg-white z-30 p-3">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* logo */}
        <Link href="/" className="hidden lg:inline-flex">
          <h1 className="text-red-500 text-2xl font-bold p-2 font-serif ">
            Finstagram
          </h1>
        </Link>

        <Link href="/" className="lg:hidden">
          <FaInstagramSquare className="w-12 h-12 text-red-500" />
        </Link>

        {/* search */}
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-50 border border-gray-200 rounded text-sm w-full py-2 px-4 max-w-[300px] lg:max-w-[400px]"
        />

        {session ? (
          <img
            src={session.user.image}
            alt={session.user.name}
            className="h-10 w-10 rounded-full cursor-pointer"
            onClick={signOut}
          />
        ) : (
          <button
            onClick={signIn}
            className="text-md font-semibold text-blue-500 border border-blue-500 p-3 hover:text-white hover:bg-blue-500 transition ease-in-out"
          >
            Log In
          </button>
        )}
      </div>
    </div>
  )
}
