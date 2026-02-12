'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export default function AuthCallback() {
    const router = useRouter();
    const [message, setMessage] = useState('Verifying your account...');
    const [isSuccess, setIsSuccess] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const { error } = await supabase.auth.getSession();

                if (error) {
                    setMessage('Verification failed. Please try again.');
                    setIsSuccess(false);
                    setTimeout(() => router.push('/login'), 3000);
                } else {
                    setMessage('Account Verified Successfully');
                    setIsSuccess(true);
                    setTimeout(() => router.push('/'), 2000);
                }
            } catch (err) {
                setMessage('An error occurred during verification.');
                setIsSuccess(false);
                setTimeout(() => router.push('/login'), 3000);
            }
        };

        handleCallback();
    }, [router, supabase.auth]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full space-y-8 p-8">
                <div className="text-center">
                    {isSuccess ? (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg
                                className="h-6 w-6 text-green-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                    ) : (
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
                            <svg
                                className="animate-spin h-6 w-6 text-blue-600"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                />
                            </svg>
                        </div>
                    )}
                    <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                        {message}
                    </h2>
                    {isSuccess && (
                        <p className="mt-2 text-sm text-gray-600">
                            Redirecting you to the dashboard...
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
