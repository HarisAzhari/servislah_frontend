import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@/contexts/UserContext";
import { Toaster } from "sonner";
import AuthProvider from "@/lib/provider/auth-provider";
import TanstackQueryClientProvider from "@/lib/provider/tanstack-query-client-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/lib/constant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServisLah - Vehicle Service Management",
  description: "Manage your vehicle services with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <TanstackQueryClientProvider>
            <UserProvider>
              <GoogleOAuthProvider
                
                clientId={GOOGLE_CLIENT_ID}>
                {children}
              </GoogleOAuthProvider>
            </UserProvider>
          </TanstackQueryClientProvider>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
