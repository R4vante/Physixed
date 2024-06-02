import React from 'react'
import NavBar from './NavBar'

const MainLayout = ({children}: MainLayoutProps) => {
  return (
    <>
        <NavBar />
        <main>
            {children}
        </main>
    </>

  )
}

export default MainLayout

type MainLayoutProps = {
    children: React.ReactNode
}
