import { cookies } from 'next/headers';
import { signToken, verifyToken } from './jwt';

/**
 * Creates a session and sets a cookie (used for login/registration)
 */
export async function createSession(userId: string) {
  const token = await signToken({ userId });
  
  const cookieStore = await cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, //7 days
  });
}

/**
 * Gets and checks the current session
 */
export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch (error) {
       console.error('Login error:', error);
    return null;
  }
}

/**
 * Deletes a session (used when logging out)
 */
export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.set('token', '', { 
    path: '/', 
    expires: new Date(0) 
  });
}