import { getSession } from '@/lib/auth/session';
import prisma from '@/lib/prisma';
import LoginForm from '@/components/LoginForm';
import LogoutButton from '@/components/LogoutButton';
import Link from 'next/link';

export default async function LoginPage() {
  // getSession  contains inside the logic for working with cookies и verifyToken
  const session = (await getSession()) as { userId: string } | null;

  let user = null;

  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true },
    });
  }

  if (user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-4">
        <h1 className="text-xl">
          You are already logged in as <strong>{user.email}</strong>
        </h1>
        <div className="flex gap-4">
          <Link href="/" className="bg-blue-500 text-white px-4 py-2 rounded">
            Home
          </Link>
          <LogoutButton />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh]">
      <div className="max-w-md mx-auto mt-10">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <LoginForm />
        <p className="mt-4 text-center text-sm text-gray-600">
          First time here?{' '}
          <Link href="/register" className="text-green-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}
