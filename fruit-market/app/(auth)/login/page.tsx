"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[800px] lg:grid-cols-2">
      {/* Left Side: Form */}
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-serif font-bold tracking-tight">Welcome Back</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="rounded-xl border-slate-200 focus-visible:ring-green-600"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline text-muted-foreground hover:text-green-600"
                >
                  Forgot your password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                required 
                className="rounded-xl border-slate-200 focus-visible:ring-green-600"
              />
            </div>
            <Button type="submit" className="w-full rounded-xl bg-slate-900 hover:bg-green-700 py-6 text-base">
              Login
            </Button>
            <Button variant="outline" className="w-full rounded-xl py-6 border-slate-200">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="underline hover:text-green-600">
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Visual Image */}
      <div className="hidden bg-stone-100 lg:block relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
           {/* High-end fruit image to set the mood */}
          <img
            src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b"
            alt="Fresh Oranges"
            className="h-full w-full object-cover rounded-[2rem] shadow-2xl"
          />
        </div>
        {/* Floating Brand Overlay */}
        <div className="absolute bottom-20 left-20 bg-white/80 backdrop-blur-md p-6 rounded-2xl max-w-xs border border-white/20">
            <Apple className="text-green-600 mb-2 h-8 w-8" />
            <p className="text-lg font-serif font-bold italic text-slate-800">
                "Freshness delivered from the farm to your doorstep."
            </p>
        </div>
      </div>
    </div>
  );
}