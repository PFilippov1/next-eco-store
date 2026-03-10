import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { signToken } from '@/lib/auth/jwt';

export async function POST(req: Request) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create a token for a new user 
    const token = await signToken({ userId: user.id, email: user.email });

    // Creating a response
    const response = NextResponse.json(
      { message: 'User registered successfully', userId: user.id },
      { status: 201 }
    );

    // Set a cookie with a token
    response.cookies.set('token', token, {
      httpOnly: true, // XSS protection
      secure: process.env.NODE_ENV === 'production', //HTTPS only in production
      sameSite: 'lax',
      path: '/', //The cookie will be available throughout the site
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;

  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}