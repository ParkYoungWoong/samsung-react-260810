// Data Mode(CSR)
import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from '@/routes/layouts/Default'
import Home from '@/routes/pages/Home'
import About from '@/routes/pages/About'
import SignIn from '@/routes/pages/SignIn'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'

const router = createBrowserRouter([
  {
    element: <Default />,
    children: [
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
      },
      {
        path: '/movies',
        element: <Movies />
      },
      {
        path: '/movies/:movieId',
        element: <MovieDetails />
      }
    ]
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
