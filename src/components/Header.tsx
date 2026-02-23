import Link from 'next/link';
import { ShoppingCart, Heart, User } from 'lucide-react';
import { getSession } from '@/lib/auth/session'; 
import prisma from '@/lib/prisma';
import LogoutButton from './LogoutButton'; 

export default async function Header() {
  const session = await getSession() as { userId: string } | null;
  
  let user = null;
  if (session) {
    user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: { email: true }
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            EcoStore
          </Link>

          {/* Navigation (Desktop) */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition">Home</Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition">Products</Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition">About</Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-6 h-6 text-gray-700" />
            </Link>
            
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </Link>

            {/* Блок авторизации */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex flex-col items-end">
                  <span className="text-xs text-gray-400">Hi,</span>
                  <span className="text-sm font-medium text-gray-700 leading-tight">{user.email}</span>
                </div>
                {/* Можно добавить иконку пользователя или кнопку выхода */}
                <LogoutButton /> 
              </div>
            ) : (
              <Link href="/login" className="p-2 hover:bg-gray-100 rounded-full flex items-center gap-2">
                <User className="w-6 h-6 text-gray-700" />
                <span className="text-sm text-gray-600 hidden lg:block">Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}