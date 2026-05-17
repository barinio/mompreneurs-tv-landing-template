import { cookies } from 'next/headers'

export const SESSION_COOKIE = 'admin_session'

export async function verifySession(): Promise<boolean> {
  const store = await cookies()
  return store.get(SESSION_COOKIE)?.value === '1'
}

export async function setSession(): Promise<void> {
  const store = await cookies()
  store.set(SESSION_COOKIE, '1', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24,
    path: '/',
  })
}

export async function clearSession(): Promise<void> {
  const store = await cookies()
  store.delete(SESSION_COOKIE)
}
