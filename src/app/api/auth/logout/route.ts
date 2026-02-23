import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ message: 'Logged out' });
  
  //Explicitly delete the cookie by setting the lifetime to 0 and the correct path
  response.cookies.set('token', '', { 
    path: '/', 
    expires: new Date(0) 
  });
  
  return response;
}