// Data Mode(CSR)
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Default from '@/routes/layouts/Default'
import Home from '@/routes/pages/Home'
// import About from '@/routes/pages/About'
// import SignIn from '@/routes/pages/SignIn'
import Movies from '@/routes/pages/Movies'
import MovieDetails from '@/routes/pages/MovieDetails'
// import NotFound from '@/routes/pages/NotFound'
import { requiresAuth } from '@/routes/loaders'

// const Home = lazy(() => import('@/routes/pages/Home'))
const About = lazy(() => import('@/routes/pages/About'))
const SignIn = lazy(() => import('@/routes/pages/SignIn'))
// const Movies = lazy(() => import('@/routes/pages/Movies'))
// const MovieDetails = lazy(() => import('@/routes/pages/MovieDetails'))
const NotFound = lazy(() => import('@/routes/pages/NotFound'))

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
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <About />
          </Suspense>
        )
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
