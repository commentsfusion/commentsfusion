// app/oauth-success/page.jsx
'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function OAuthSuccessPage() {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get('token');

  useEffect(() => {
    if (token) {
      localStorage.setItem('authToken', token);
      router.replace('/main_dashboard');
    }
  }, [token, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

        {/* Headline */}
        <h1 className="text-2xl font-semibold text-gray-800">
          Signing you in…
        </h1>

        {/* Subtext */}
        <p className="text-gray-500">
          Just a moment while we set things up for you.
        </p>
      </div>
    </div>
  );
}
