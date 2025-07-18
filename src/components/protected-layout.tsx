'use client'
import { useAuthTanstack } from '@/lib/tanstack/auth-tanstack';
import { Loader2 } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

function ProtectedContent({ children }: ProtectedLayoutProps) {
    const { isAuthenticated, isLoading, user } = useAuthTanstack()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const isDashboardRoute = pathname.startsWith('/dashboard');

    useEffect(() => {
        if (!isLoading) {
            if (isDashboardRoute && !isAuthenticated) {
                router.push('/?redirect=' + encodeURIComponent(pathname));
            } else if (isAuthenticated) {
                const redirectTo = searchParams.get('redirect');
                if (redirectTo && redirectTo !== pathname) {
                    router.push(redirectTo);
                    return;
                }

                if (pathname === '/login' || pathname === '/register') {
                    router.push('/dashboard');
                }
            }
        }
    }, [isAuthenticated, isLoading, isDashboardRoute, pathname, router, searchParams])

    if (isLoading && isDashboardRoute) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    if (isDashboardRoute && !isAuthenticated && !isLoading) {
        return null;
    }

    return <>{children}</>;
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        }>
            <ProtectedContent>{children}</ProtectedContent>
        </Suspense>
    );
}