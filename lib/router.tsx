import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/components/layout'

// eslint-disable-next-line react-refresh/only-export-components
const IndexPage = lazy(() => import('@/src/pages/index'))

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <IndexPage /> }],
  },
])

export default router
