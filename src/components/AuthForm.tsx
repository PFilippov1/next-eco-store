'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Link from 'next/link';

// 1. Validation scheme
const authSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .refine(
      (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      {
        message: 'Invalid email format',
      }
    ),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/^\S*$/, 'Spaces are not allowed'),
  name: z
    .string()
    .min(3, 'Name must be at least 3 characters')
    .max(30, 'Name must be at most 30 characters')
    .trim()
    .regex(/^[A-Za-z0-9 _!\-]+$/, 'Name contains invalid characters')
    .refine((value) => !/\s{2,}/.test(value), {
      message: 'Name cannot contain multiple spaces in a row',
    })
    .refine((value) => value.replace(/\s+/g, '').length >= 3, {
      message: 'Name must contain at least 3 non-space characters',
    }),
});

type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
}

export default function AuthForm({ mode }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const isLogin = mode === 'login';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormValues) => {
    setIsLoading(true);
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        router.refresh();
        window.location.href = '/';
      } else {
        const errorData = await res.json();
        alert(errorData.message || 'Error occurred');
      }
    } catch (err) {
      console.error('Auth Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-sm mx-auto mt-10 p-6 border rounded-xl shadow-lg bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
        <p className="text-sm text-gray-500 mt-1">
          {isLogin ? 'Enter your details to login' : 'Fill in the fields to register'}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {/* Name Field — shown only in registration mode */}
        {!isLogin && (
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Login Name</label>
            <input
              {...register('name')}
              type="text"
              placeholder="Your username"
              className={`border p-2 rounded-lg outline-none focus:ring-2 transition-all
                ${errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-100'}`}
            />
            {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Email</label>
          <input
            {...register('email')}
            type="email"
            placeholder="mail@example.com"
            className={`border p-2 rounded-lg outline-none focus:ring-2 transition-all
              ${errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-100'}`}
          />
          {errors.email && <span className="text-xs text-red-500">{errors.email.message}</span>}
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700">Password</label>
          <input
            {...register('password')}
            type="password"
            placeholder="••••••"
            className={`border p-2 rounded-lg outline-none focus:ring-2 transition-all
              ${errors.password ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-green-100'}`}
          />
          {errors.password && (
            <span className="text-xs text-red-500">{errors.password.message}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-green-600 text-white p-2.5 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-all active:scale-[0.98] mt-2"
        >
          {isLoading ? 'Wait...' : isLogin ? 'Sign In' : 'Join Now'}
        </button>
      </form>

      {/* Switch between Login and Registration */}
      <p className="text-center text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <Link
          href={isLogin ? '/register' : '/login'}
          className="text-green-600 font-semibold hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </Link>
      </p>
    </div>
  );
}
