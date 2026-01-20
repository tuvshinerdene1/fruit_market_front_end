"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Apple } from "lucide-react";
import { MOCK_WORKERS } from "@/mock_data/mock_users"; // Adjust path as needed

export default function LoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 1. Initial Check: Redirect if already logged in
  useEffect(() => {
    const savedWorker = localStorage.getItem("currentWorker");
    // if (savedWorker) {
    //   const worker = JSON.parse(savedWorker);
    //   redirectByRole(worker.role);
    // }
  }, []);

  const redirectByRole = (role: string) => {
    switch (role) {
      case "admin":
        router.push("/admin");
        break;
      case "packer":
        router.push("/worker");
        break;
      case "driver":
        router.push("/driver");
        break;
      default:
        router.push("/");
    }
  };

  // 2. Handle Login Logic
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const worker = MOCK_WORKERS.find(
      (w) => w.phone_number === phone && w.password === password,
    );

    if (worker) {
      // Save worker to localStorage
      localStorage.setItem("currentWorker", JSON.stringify(worker));
      redirectByRole(worker.role);
    } else {
      setError("Утасны дугаар эсвэл нууц үг буруу байна.");
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-4xl font-serif font-bold tracking-tight">
              Ажилтнаар нэвтрэх
            </h1>
            <p className="text-balance text-muted-foreground">
              Утасны дугаар болон нууц үгээ оруулна уу.
            </p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="phone">Утасны дугаар</Label>
              <Input
                id="phone"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="99112233"
                required
                className="rounded-xl border-slate-200 focus-visible:ring-green-600"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Нууц үг</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-xl border-slate-200 focus-visible:ring-green-600"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 font-medium">{error}</p>
            )}

            <Button
              type="submit"
              className="w-full rounded-xl bg-slate-900 hover:bg-green-700 py-6 text-base"
            >
              Нэвтрэх
            </Button>
            <Button
              type="button" // Important: set to "button" so it doesn't trigger the form submit
              variant="outline"
              onClick={() => router.push("/")}
              className="w-full rounded-xl border-slate-200 py-6 text-base"
            >
              Үндсэн веб рүү буцах
            </Button>
          </form>
        </div>
      </div>

      {/* Right Side UI remains the same */}
      <div className="hidden bg-stone-100 lg:block relative">
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <img
            src="https://images.unsplash.com/photo-1619566636858-adf3ef46400b"
            alt="Fresh Oranges"
            className="h-full w-full object-cover rounded-[2rem] shadow-2xl"
          />
        </div>
        <div className="absolute bottom-20 left-20 bg-white/80 backdrop-blur-md p-6 rounded-2xl max-w-xs border border-white/20">
          <Apple className="text-green-600 mb-2 h-8 w-8" />
          <p className="text-lg font-serif font-bold italic text-slate-800">
            "Шинэ жимсийг цаг алдахгүй хүргэнэ."
          </p>
        </div>
      </div>
    </div>
  );
}
