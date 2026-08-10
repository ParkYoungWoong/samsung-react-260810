// Data Mode(CSR)
import { createBrowserRouter, RouterProvider } from 'react-router'
import Home from '@/routes/pages/Home'
import About from '@/routes/pages/About'
import SignIn from '@/routes/pages/SignIn'

const router = createBrowserRouter([
  {
    path: '/', // http://localhost:5173/
    element: <Home />
  },
  {
    path: '/about',
    element: <About />
  },
  {
    path: '/signin',
    element: <SignIn />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
