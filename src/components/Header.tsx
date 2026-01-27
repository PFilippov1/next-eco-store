import Link from 'next/link';
import { ShoppingCart, Heart, User } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-green-600">
            EcoStore
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition">
              About
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Link href="/favorites" className="p-2 hover:bg-gray-100 rounded-full">
              <Heart className="w-6 h-6 text-gray-700" />
            </Link>
            <Link href="/cart" className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Link>
            <Link href="/account" className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6 text-gray-700" />
            </Link>
          </div>
        </div>

        {/* Mobile Navigation (optional) */}
        <div className="mt-4 md:hidden flex justify-center space-x-6">
          <Link href="/" className="text-sm text-gray-700">
            Home
          </Link>
          <Link href="/products" className="text-sm text-gray-700">
            Products
          </Link>
          <Link href="/about" className="text-sm text-gray-700">
            About
          </Link>
        </div>
      </div>
    </header>
  );
}
