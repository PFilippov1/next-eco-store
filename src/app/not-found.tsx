'use client';
import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <div className="relative mb-8">
          <h1 className="text-9xl font-bold text-gray-800 opacity-10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-7xl font-bold text-gray-900 mb-2">404</div>
              <div className="text-2xl font-semibold text-gray-600">Page Not Found</div>
            </div>
          </div>
        </div>

        <p className="text-xl text-gray-600 mb-8">
          Oops! The page you&apos;re looking for seems to have wandered off into the digital
          wilderness.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Pages</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/products" className="text-green-600 hover:text-green-700 hover:underline">
              All Products
            </Link>
            <Link href="/about" className="text-green-600 hover:text-green-700 hover:underline">
              About Us
            </Link>
          </div>
        </div>

        <div className="mt-10 p-4 bg-green-50 rounded-lg">
          <p className="text-gray-600 italic">
            &ldquo;Every wrong turn is an opportunity to discover something new. Maybe try exploring
            our eco-friendly collection instead!&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
