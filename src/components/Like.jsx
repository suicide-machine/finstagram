"use client"

import { app } from "@/firebase"
import {
  collection,
  deleteDoc,
  doc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import { HiHeart, HiOutlineHeart } from "react-icons/hi"

export default function Like({ id }) {
  const { data: session } = useSession()
  const [hasLiked, setHasLiked] = useState(false)
  const [likes, setLikes] = useState([])

  const db = getFirestore(app)

  useEffect(() => {
    onSnapshot(collection(db, "posts", id, "likes"), (snapshot) => {
      setLikes(snapshot.docs)
    })
  }, [db])

  useEffect(() => {
    if (likes.findIndex((like) => like.id === session?.user?.uid) !== -1) {
      setHasLiked(true)
    } else {
      setHasLiked(false)
    }
  }, [likes])

  async function likePost() {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session?.user?.uid))
    } else {
      await setDoc(doc(db, "posts", id, "likes", session?.user?.uid), {
        username: session?.user?.username,
      })
    }
  }

  return (
    <div>
      {session && (
        <div className="flex border-t border-slate-100 px-4 pt-4">
          <div className="flex items-center gap-2">
            {hasLiked ? (
              <HiHeart
                onClick={likePost}
                className="text-red-500 cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
              />
            ) : (
              <HiOutlineHeart
                onClick={likePost}
                className="cursor-pointer text-3xl hover:scale-125 transition-transform duration-200 ease-out"
              />
            )}

            {likes.length > 0 && (
              <p className="text-slate-700">
                {likes.length} {likes.length === 1 ? "like" : "likes"}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
