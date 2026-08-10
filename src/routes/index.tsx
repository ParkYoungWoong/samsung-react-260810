// Data Mode(CSR)
import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from '@/routes/layouts/Default'
import Home from '@/routes/pages/Home'
import About from '@/routes/pages/About'
import SignIn from '@/routes/pages/SignIn'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'
import NotFound from '@/routes/pages/NotFound'
import { requiresAuth } from '@/routes/loaders'

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
        loader: requiresAuth,
        element: <Movies />,
        children: [
          {
            path: '/movies/:movieId',
            element: <MovieDetails />
          }
        ]
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])

export default function Router() {
  return <RouterProvider router={router} />
}
