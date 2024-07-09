import React from "react"
import Posts from "./Posts"
import Profile from "./Profile"

export default function Lookout() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto">
      <section className="md:col-span-2">
        <Posts />
      </section>

      <section className="hidden md:inline-grid md:col-span-1">
        <Profile />
      </section>
    </main>
  )
}
