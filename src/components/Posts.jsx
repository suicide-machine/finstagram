import { app } from "@/firebase"
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore"
import React from "react"
import PostCard from "./PostCard"

export default async function Posts() {
  const db = getFirestore(app)

  const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))

  const querySnapshot = await getDocs(q)

  let data = []

  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() })
  })

  // console.log(data)

  return (
    <div>
      {data.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  )
}
