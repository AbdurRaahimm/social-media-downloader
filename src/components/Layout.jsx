import React from 'react'
import Navber from './Navber'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      <Navber />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
