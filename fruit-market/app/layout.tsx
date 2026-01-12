// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fruit Market",
  description: "Fresh fruits delivered to your door",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* No NavBar here! That way Admin/Workers don't see the store navbar */}
        <Toaster position="top-center" richColors closeButton />
        {children} 
      </body>
    </html>
  );
}