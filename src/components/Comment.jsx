"use client"

import { app } from "@/firebase"
import {
  addDoc,
  collection,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore"
import { useSession } from "next-auth/react"
import React, { useEffect, useState } from "react"
import Moment from "react-moment"

export default function Comment({ id }) {
  const { data: session } = useSession()

  const [comment, setComment] = useState("")
  const [comments, setComments] = useState([])

  //   console.log(comments)

  const db = getFirestore(app)

  async function handleSubmit(e) {
    e.preventDefault()

    const commentToSubmit = comment

    setComment("")

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSubmit,
      username: session?.user?.username,
      userImage: session?.user?.image,
      timestamp: serverTimestamp(),
    })
  }

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs)
        console.log(snapshot.docs.map((doc) => doc.data()))
      }
    )
  }, [db])

  return (
    <div>
      {comments.length > 0 && (
        <div className="mx-10 max-h-24 overflow-y-scroll">
          {comments.map((comment, id) => (
            <div
              key={id}
              className="flex items-center space-x-2 mb-2 justify-between"
            >
              <img
                src={comment.data().userImage}
                alt="user avatar"
                className="h-7 rounded-full object-cover border p-[2px]"
              />

              <p className="text-sm flex-1 truncate">
                <span className="font-bold text-slate-800">
                  {comment.data().username}
                </span>

                <span className="pl-2">{comment.data().comment}</span>
              </p>

              <Moment fromNow className="text-xs text-slate-500 pr-2">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {session && (
        <form onSubmit={handleSubmit} className="flex items-center p-4 gap-2">
          <img
            src={session.user.image}
            alt="User Avatar"
            className="h-12 w-12 rounded-full border p-[4px] object-cover"
          />

          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="border-none flex-1 outline-none"
          />

          <button
            disabled={!comment.trim()}
            type="submit"
            className="text-green-500 disabled:cursor-not-allowed disabled:text-slate-700"
          >
            Comment
          </button>
        </form>
      )}
    </div>
  )
}
