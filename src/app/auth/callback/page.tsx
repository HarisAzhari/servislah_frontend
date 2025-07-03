"use client";

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAuthTanstack } from '@/lib/tanstack/auth-tanstack';

export default function CallbackPage() {
    const searchParams = useSearchParams();
    const { handleGoogleCallbackMutation } = useAuthTanstack();

    useEffect(() => {
        const code = searchParams.get('code');
        if (code) {
            handleGoogleCallbackMutation.mutate(code);
        }
    }, [searchParams, handleGoogleCallbackMutation]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">
                <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h1 className="text-xl font-semibold text-gray-800">Processing your login...</h1>
                <p className="text-gray-600 mt-2">Please wait while we complete the authentication.</p>
            </div>
        </div>
    );
} 