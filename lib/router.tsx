import { createBrowserRouter } from 'react-router-dom'

import { Layout } from '@/components/layout'
import App from '@/src/App'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [{ index: true, element: <App /> }],
  },
])

export default router
