import { Suspense } from 'react'
import { Outlet, ScrollRestoration } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Suspense fallback={<div style={{ backgroundColor: '#242424' }} />}>
        <Outlet />
      </Suspense>
    </>
  )
}
