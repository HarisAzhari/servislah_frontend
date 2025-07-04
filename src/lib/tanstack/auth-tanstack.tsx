import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { User } from "@/types/user";
import { handleGoogleCallback } from "@/lib/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";

export const useAuthTanstack = () => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                const savedUser = localStorage.getItem('user');
                if (savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    setUser(parsedUser);
                    setIsAuthenticated(true);

                    // // Verify token is still valid
                    // const profile = await getur(parsedUser.accessToken);
                    // if (profile) {
                    //     // Update user data if needed
                    //     const updatedUser = { ...parsedUser, ...profile };
                    //     setUser(updatedUser);
                    //     localStorage.setItem('user', JSON.stringify(updatedUser));
                    // }
                    localStorage.setItem('user', JSON.stringify(parsedUser));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
                // Clear invalid credentials
                localStorage.removeItem('user');
                setUser(null);
                setIsAuthenticated(false);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const googleLogin = useGoogleLogin({
        flow: 'auth-code',
        scope: 'email profile',
        onSuccess: async (response) => {
            try {
                if (response.code) {
                    const authResponse = await handleGoogleCallback(response.code);
                    console.log('Auth Response, ' + JSON.stringify(authResponse));

                    if (authResponse && authResponse.user_id) {

                        const userData = {
                            id: authResponse.user_id,
                            email: authResponse.email,
                            name: authResponse.email.split('@')[0],
                            backend_tokens: {
                                access_token: authResponse.backend_tokens.access_token,
                                refresh_token: authResponse.backend_tokens.refresh_token,
                            }
                        };

                        setUser(userData as unknown as User);
                        setIsAuthenticated(true);
                        localStorage.setItem('user', JSON.stringify(userData));


                        queryClient.invalidateQueries({ queryKey: ['user'] });

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
                console.error('Login error:', error);
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
        onSuccess: async (data) => {
            if (data && data.user_id) {
                const userData = {
                    id: data.user_id,
                    email: data.email,
                    backend_tokens: {
                        access_token: data.backend_tokens.access_token,
                        refresh_token: data.backend_tokens.refresh_token,
                    }
                };

                setUser(userData as unknown as User);
                setIsAuthenticated(true);
                localStorage.setItem('user', JSON.stringify(userData));

                // await saveUserCredentials(userData);
                queryClient.invalidateQueries({ queryKey: ['user'] });

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

    const logoutMutation = useMutation({
        mutationFn: async () => {

            localStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);


            queryClient.clear();

            return true;
        },
        onSuccess: () => {
            toast.success('Successfully logged out');
            router.push('/');
        },
        onError: (error: Error) => {
            toast.error('Logout failed: ' + error.message);
        }
    });

    return {
        user,
        isAuthenticated,
        isLoading,
        loginWithGoogleMutation,
        handleGoogleCallbackMutation,
        logoutMutation,
        login: () => loginWithGoogleMutation.mutate(),
        logout: () => logoutMutation.mutate(),
    };
}