import { getSession } from '@/lib/auth/session';
import { NextResponse } from 'next/server';
export async function GET() {
  const session = await getSession()
// If there is no session (token has expired or is missing)
  if (!session) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Returning data from the session
  return NextResponse.json({ user: session });
}