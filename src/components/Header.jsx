"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import Link from "next/link"
import React, { useState } from "react"
import { FaInstagramSquare } from "react-icons/fa"
import { IoMdAddCircleOutline } from "react-icons/io"
import { FaCamera } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"

import Modal from "react-modal"

export default function Header() {
  const { data: session } = useSession()
  // console.log(session)

  const [isOpen, setIsOpen] = useState(false)

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
          <div className="flex gap-4 items-center">
            <IoMdAddCircleOutline
              className="text-4xl cursor-pointer transform hover:scale-125 transition duration-300 hover:text-red-500"
              onClick={() => setIsOpen(true)}
            />

            <img
              src={session.user.image}
              alt={session.user.name}
              className="h-10 w-10 rounded-full cursor-pointer"
              onClick={signOut}
            />
          </div>
        ) : (
          <button
            onClick={signIn}
            className="text-md font-semibold text-blue-500 border border-blue-500 p-3 hover:text-white hover:bg-blue-500 transition ease-in-out"
          >
            Log In
          </button>
        )}
      </div>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          className="max-w-lg w-[90%] p-6 absolute top-56 left-[50%] translate-x-[-50%] bg-white border-2 rounded-md shadow-md"
          onRequestClose={() => setIsOpen(false)}
          ariaHideApp={false}
        >
          <div className="flex flex-col justify-center items-center h-[100%]">
            <FaCamera className="text-6xl text-gray-400 cursor-pointer" />
          </div>

          <input
            type="text"
            maxLength="150"
            placeholder="Enter Caption..."
            className="m-4 border-none text-center w-full focus:ring-0 outline-none"
          />
          <button
            disabled
            className="w-full bg-green-600 text-white p-2 shadow-md rounded-lg hover:brightness-105 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:hover:brightness-100 "
          >
            Upload Post
          </button>

          <AiOutlineClose
            className="text-xl cursor-pointer absolute top-2 right-2 text-red-500 transition duration-300 border border-red-500 m-1 hover:bg-red-500 hover:text-white"
            onClick={() => setIsOpen(false)}
          />
        </Modal>
      )}
    </div>
  )
}
