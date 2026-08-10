import api from '@/lib/api'
import { redirect } from 'react-router'

async function verifyToken() {
  try {
    await api.post('/auth/me')
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

export async function requiresAuth({ request }: { request: Request }) {
  const isVerified = await verifyToken()
  // 통과
  if (isVerified) return null
  // 실패
  // http://localhost:3000/movies?a=1&b=2
  const url = new URL(request.url)
  // url.pathname // '/movies'
  // url.search // '?a=1&b=2'
  return redirect(
    `/signin?redirectTo=${encodeURIComponent(url.pathname + url.search)}`
  )
}
