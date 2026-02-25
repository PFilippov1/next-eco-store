'use client';

import { LogOut } from 'lucide-react';

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };

  return (
    <button
      onClick={handleLogout}
      className=" bg-red-500 text-white rounded-full cursor-pointer  flex items-center justify-center  p-2 hover:bg-red-600 transition "
    >
      <LogOut />
    </button>
  );
}
