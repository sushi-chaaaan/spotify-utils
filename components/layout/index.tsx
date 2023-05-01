import { Outlet, ScrollRestoration } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  )
}
