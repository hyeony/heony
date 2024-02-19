import Link from 'next/link'
import React from 'react'

export default function header() {
  return (
    <header>
      <Link href="/"> <h1>{"heony's Blog"}</h1> </Link>

      <nav>
        <Link href="/">home</Link>
        <Link href="/about">about</Link>
        <Link href="/posts">posts</Link>
        <Link href="/contact">contact</Link>
      </nav>
    </header>
  )
}
