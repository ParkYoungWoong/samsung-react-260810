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
  if (isVerified) return null
  return redirect('/signin')
}
