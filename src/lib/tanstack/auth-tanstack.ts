import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginWithGoogle, handleGoogleCallback } from "../services/auth.service";
import { signIn, signOut, useSession } from 'next-auth/react';
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useGoogleLogin } from "@react-oauth/google";

export const useAuthTanstack = () => {
    const router = useRouter();

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: 'email profile',
        onSuccess: async (response) => {
            try {
                if (response.code) {
                    const authResponse = await handleGoogleCallback(response.code);
                    console.log('Auth Response, ' + JSON.stringify(authResponse));
                    if (authResponse) {
                        toast.success('Successfully logged in with Google');
                        router.push('/dashboard');
                    } else {
                        toast.error('Failed to process Google login');
                        router.push('/');
                    }
                }
            } catch (error) {
                toast.error('Google login callback failed');
                router.push('/');
            }
        },
        onError: (errorResponse) => {
            const errorMessage = errorResponse.error_description || errorResponse.error || 'Login failed';
            toast.error(errorMessage);
            console.log('Login Failed:', errorResponse);
        }
    });

    const loginWithGoogleMutation = useMutation({
        mutationFn: async () => {
            googleLogin();
            return null;
        },
        onError: (error: Error) => {
            toast.error('Login failed due to: ' + error.message);
            console.log(error);
        }
    });

    const handleGoogleCallbackMutation = useMutation({
        mutationFn: async (code: string) => {
            const response = await handleGoogleCallback(code);
            return response;
        },
        onSuccess: (data) => {
            if (data) {
                toast.success('Successfully logged in with Google');
                router.push('/dashboard');
            } else {
                toast.error('Failed to process Google login');
                router.push('/login');
            }
        },
        onError: (error: Error) => {
            toast.error('Google login callback failed: ' + error.message);
            router.push('/login');
        },
    });

    return {
        loginWithGoogleMutation,
        handleGoogleCallbackMutation,
    };
}

